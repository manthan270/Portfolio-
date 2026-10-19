import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';

const DRAW_DURATION = 1.5;   // seconds to write the signature (smaller = faster)
const HOLD_DURATION = 250;   // ms the finished signature stays on screen
const EXIT_DURATION = 0.3;   // seconds to fade out
const START_TIMEOUT = 8000;  // ms: if the signature cannot start, show the site anyway
const STARTUP_STABLE_MS = 250; // wait for startup frame drops to settle before drawing
const MAX_STARTUP_WAIT_MS = 1500; // keep the added wait bounded on busy or background pages

const VB_W = 1912, VB_H = 577;
const LEVELS = 256;                 // the reveal map is 8-bit
const SOFT = 1;                     // pen-edge softness, in map levels (same look as before)
const SPAN = LEVELS - 1 + SOFT + 2; // = 258, same as the old p * 258
const MAX_DPR = 2;                  // 3x was ~2.25x more pixels for no visible gain at 420px wide

// cubic-bezier easing, same curve you had: [0.35, 0, 0.25, 1]
function makeEase(x1, y1, x2, y2) {
  const bez = (t, a, b) => 3 * (1 - t) * (1 - t) * t * a + 3 * (1 - t) * t * t * b + t * t * t;
  const dbez = (t, a, b) => 3 * (1 - t) * (1 - t) * a + 6 * (1 - t) * t * (b - a) + 3 * t * t * (1 - b);
  return (x) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let t = x;
    for (let i = 0; i < 8; i++) {
      const err = bez(t, x1, x2) - x;
      const d = dbez(t, x1, x2);
      if (Math.abs(err) < 1e-5 || Math.abs(d) < 1e-6) break;
      t -= err / d;
    }
    t = Math.min(1, Math.max(0, t));
    return bez(t, y1, y2);
  };
}

const ease = makeEase(0.35, 0, 0.25, 1);

function waitForStableFrames(callback) {
  let finished = false;
  let frame = 0;
  let maxTimer = 0;
  let lastFrame = null;
  let expectedFrameInterval = 0;
  let stableDuration = 0;

  const start = () => {
    if (finished) return;
    finished = true;
    window.cancelAnimationFrame(frame);
    window.clearTimeout(maxTimer);
    callback();
  };

  const sampleFrame = (now) => {
    if (finished) return;
    if (lastFrame !== null) {
      const interval = now - lastFrame;
      if (!expectedFrameInterval) expectedFrameInterval = Math.min(interval, 32);
      if (interval <= Math.min(expectedFrameInterval * 1.75, 50)) {
        stableDuration += interval;
      } else {
        stableDuration = 0;
      }
      if (stableDuration >= STARTUP_STABLE_MS) {
        start();
        return;
      }
    }
    lastFrame = now;
    frame = window.requestAnimationFrame(sampleFrame);
  };

  maxTimer = window.setTimeout(start, MAX_STARTUP_WAIT_MS);
  frame = window.requestAnimationFrame(sampleFrame);

  return () => {
    if (finished) return;
    finished = true;
    window.cancelAnimationFrame(frame);
    window.clearTimeout(maxTimer);
  };
}

// Let the browser convert ANY css colour (rgb, hex, oklch, color(srgb ...)) to plain rgb.
// The old code pulled numbers out of the string, which breaks on oklch / color() values.
function cssColorToRgb(color) {
  const c = document.createElement('canvas');
  c.width = c.height = 1;
  const x = c.getContext('2d', { willReadFrequently: true });
  x.fillStyle = '#ffffff'; // fallback if the value cannot be parsed
  x.fillStyle = color;
  x.fillRect(0, 0, 1, 1);
  const d = x.getImageData(0, 0, 1, 1).data;
  return [d[0], d[1], d[2]];
}

// START painter
// Pixels are sorted by the moment the pen reaches them (their "level", 0-255).
// Each frame only the pixels whose level lies in the band the pen just crossed are
// touched, so the whole animation costs one pass over the signature instead of one
// pass per frame.
function createPainter(pix, alpha, levelStart, d) {
  let shown = -1;
  return {
    paint(edge) {
      let from;
      if (shown < 0) {
        from = 0;
      } else if (edge < shown) {
        for (let k = 0; k < pix.length; k++) d[pix[k] + 3] = 0; // going backwards: redo
        from = 0;
      } else if (edge === shown) {
        return false;
      } else {
        from = Math.max(0, Math.floor(shown - SOFT) - 1);
      }
      const to = Math.min(LEVELS - 1, Math.floor(edge));
      for (let L = from; L <= to; L++) {
        let v = (edge - L) / SOFT;
        if (v > 1) v = 1;
        if (v < 0) v = 0;
        for (let k = levelStart[L], end = levelStart[L + 1]; k < end; k++) {
          d[pix[k] + 3] = alpha[k] * v;
        }
      }
      shown = edge;
      return true;
    },
  };
}
// END painter

function startSignature(canvas, outline, mapUrl, { onReady, onFail }) {
  const ctx = canvas.getContext('2d');
  const path = new Path2D(outline);
  const img = new Image();
  let cancelled = false;
  let raf = 0;
  let resizeRaf = 0;
  let ro = null;
  let W = 0, H = 0;
  let out = null;
  let painter = null;
  let progress = 0;

  // Heavy one-time work: rasterise the outline, read the reveal map, sort pixels by level.
  // Returns true when it (re)built something that needs repainting.
  function build() {
    const cw = canvas.clientWidth;
    if (!cw) return false;
    const nW = Math.max(2, Math.round(cw * Math.min(window.devicePixelRatio || 1, MAX_DPR)));
    if (nW === W && painter) return false; // same size: nothing to do
    W = nW;
    H = Math.round((W * VB_H) / VB_W);
    canvas.width = W;
    canvas.height = H;

    const off = document.createElement('canvas');
    off.width = W;
    off.height = H;
    const o = off.getContext('2d', { willReadFrequently: true });
    o.scale(W / VB_W, H / VB_H);
    o.fill(path, 'evenodd');
    const a = o.getImageData(0, 0, W, H).data;
    o.setTransform(1, 0, 0, 1, 0, 0);
    o.clearRect(0, 0, W, H);
    o.imageSmoothingEnabled = true;
    o.imageSmoothingQuality = 'high';
    o.drawImage(img, 0, 0, W, H);
    const t = o.getImageData(0, 0, W, H).data;

    const total = W * H;
    const levelStart = new Uint32Array(LEVELS + 1);
    let n = 0;
    for (let i = 0; i < total; i++) {
      if (a[i * 4 + 3]) {
        n++;
        levelStart[t[i * 4] + 1]++;
      }
    }
    for (let l = 0; l < LEVELS; l++) levelStart[l + 1] += levelStart[l];

    const cursor = levelStart.slice(0, LEVELS);
    const pix = new Uint32Array(n);
    const alpha = new Uint8Array(n);
    for (let i = 0; i < total; i++) {
      const al = a[i * 4 + 3];
      if (al) {
        const k = cursor[t[i * 4]]++;
        pix[k] = i * 4;
        alpha[k] = al;
      }
    }

    out = ctx.createImageData(W, H);
    const d = out.data;
    const [r, g, b] = cssColorToRgb(getComputedStyle(canvas).color);
    for (let k = 0; k < n; k++) {
      const j = pix[k];
      d[j] = r;
      d[j + 1] = g;
      d[j + 2] = b;
    }
    painter = createPainter(pix, alpha, levelStart, d);
    return true;
  }

  function show(p) {
    progress = p;
    if (!painter) return;
    if (painter.paint(p * SPAN)) ctx.putImageData(out, 0, 0);
  }

  const api = {
    seek(p) {
      cancelAnimationFrame(raf);
      show(p);
    },
    play(durationMs, easeFn, done) {
      cancelAnimationFrame(raf);
      show(0);
      let startedAt;
      const tick = (now) => {
        // Start on the first real frame, but keep wall-clock timing after dropped frames.
        // paint() fills every crossed level, so catch-up does not leave gaps in the stroke.
        if (startedAt === undefined) startedAt = now;
        const x = Math.min(1, (now - startedAt) / durationMs);
        show(easeFn(x));
        if (x < 1) raf = requestAnimationFrame(tick);
        else if (done) done();
      };
      raf = requestAnimationFrame(tick);
    },
  };

  img.decoding = 'async';
  img.src = mapUrl;
  const decoded = img.decode
    ? img.decode()
    : new Promise((res, rej) => {
        img.onload = res;
        img.onerror = rej;
      });

  decoded
    .then(() => {
      if (cancelled) return;
      // Let the page paint its first frame before the heavy pixel work starts.
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          if (cancelled) return;
          if (!build()) {
            onFail();
            return;
          }
          ro = new ResizeObserver(() => {
            cancelAnimationFrame(resizeRaf);
            resizeRaf = requestAnimationFrame(() => {
              if (!cancelled && build()) show(progress);
            });
          });
          ro.observe(canvas);
          onReady(api);
        })
      );
    })
    .catch(() => {
      if (!cancelled) onFail();
    });

  return () => {
    cancelled = true;
    cancelAnimationFrame(raf);
    cancelAnimationFrame(resizeRaf);
    if (ro) ro.disconnect();
  };
}

const SignatureLoader = ({ onComplete }) => {
  const shouldReduceMotion = useReducedMotion();
  const onCompleteRef = useRef(onComplete);
  const canvasRef = useRef(null);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    let disposed = false;
    let finished = false;
    let holdTimer = 0;
    let startTimer = 0;
    let cancelPendingStart = null;
    let stop = () => {};

    // The exit timer now starts when the signature has really been drawn (not at mount),
    // so slow loading can no longer cut the tail of the signature off.
    const finish = (delay) => {
      if (finished) return;
      finished = true;
      window.clearTimeout(startTimer);
      cancelPendingStart?.();
      holdTimer = window.setTimeout(() => onCompleteRef.current?.(), delay);
    };

    // Safety net: if the signature can't start, don't trap the visitor behind the loader.
    startTimer = window.setTimeout(() => finish(0), START_TIMEOUT);

    const loadSignature = async () => {
      try {
        const { SIGNATURE_OUTLINE, REVEAL_MAP } = await import('./signatureData');
        if (disposed || finished || !canvasRef.current) return;

        stop = startSignature(canvasRef.current, SIGNATURE_OUTLINE, REVEAL_MAP, {
          onReady(sig) {
            if (shouldReduceMotion) {
              window.clearTimeout(startTimer);
              sig.seek(1);
              finish(500);
            } else {
              cancelPendingStart = waitForStableFrames(() => {
                if (finished) return;
                window.clearTimeout(startTimer);
                sig.play(DRAW_DURATION * 1000, ease, () => finish(HOLD_DURATION));
              });
            }
          },
          onFail() {
            finish(0);
          },
        });
      } catch {
        if (!disposed) finish(0);
      }
    };

    void loadSignature();

    return () => {
      disposed = true;
      window.clearTimeout(startTimer);
      window.clearTimeout(holdTimer);
      cancelPendingStart?.();
      stop();
    };
  }, [shouldReduceMotion]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: EXIT_DURATION, ease: [0.22, 1, 0.36, 1] },
      }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-background text-foreground"
      style={{ backgroundColor: 'var(--color-background, #09090b)' }}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      <div className="w-[68vw] max-w-[360px]">
        <canvas
          ref={canvasRef}
          width={VB_W}
          height={VB_H}
          role="img"
          aria-label="Manthan signature"
          style={{ display: 'block', width: '100%', height: 'auto' }}
        />
      </div>
    </motion.div>
  );
};

export default SignatureLoader;
