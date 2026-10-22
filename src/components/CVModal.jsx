import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, ExternalLink, File } from 'lucide-react';
import { Button } from './ui/Button';
import { Typography } from './ui/Typography';
import FocusTrap from 'focus-trap-react';

const RESUME_URL = '/resume.pdf';
const RESUME_FILENAME = 'Manthan_Gadegone_Resume.pdf';

function handleResumeDownload(event) {
  const { userAgent, platform, maxTouchPoints } = window.navigator;
  const isIOS = /iPad|iPhone|iPod/i.test(userAgent)
    || (platform === 'MacIntel' && maxTouchPoints > 1);

  // iOS Safari ignores an anchor's download attribute. Opening the document is
  // the reliable fallback and still lets the visitor save or share the PDF.
  if (isIOS) {
    event.preventDefault();
    window.open(event.currentTarget.href, '_blank', 'noopener,noreferrer');
  }
}

export default function CVModal({ isOpen, onClose, cvUrl }) {
  const closeButtonRef = useRef(null);
  const previewUrl = cvUrl.replace(/\.pdf$/i, '-preview.png');

  // Close on Escape key + lock body scroll
  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    const previousOverflow = document.body.style.overflow;
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  // Use Portal to render outside parent stacking contexts
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 min-[769px]:p-6"
          >
          <FocusTrap focusTrapOptions={{
            initialFocus: () => closeButtonRef.current,
            returnFocusOnDeactivate: true,
          }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
              role="dialog"
              aria-modal="true"
              aria-labelledby="cv-modal-title"
              className="w-full max-w-5xl h-[calc(100dvh-1rem)] min-[769px]:h-[85vh] flex flex-col bg-background rounded-2xl border border-border/50 shadow-2xl relative overflow-hidden"
            >

              {/* Header */}
              <div className="flex items-center justify-between px-3 py-2.5 min-[769px]:px-6 min-[769px]:py-3 border-b border-border/50 bg-secondary/5 shrink-0">
                <div className="flex min-w-0 items-center gap-2.5 min-[769px]:gap-3">
                  <div className="p-1.5 min-[769px]:p-2 bg-primary/10 rounded-lg">
                    <File size={18} className="text-primary min-[769px]:w-5 min-[769px]:h-5" />
                  </div>
                  <div className="flex min-w-0 flex-col">
                    <Typography variant="h3" as="h2" id="cv-modal-title" className="text-sm font-semibold">Resume</Typography>
                    <Typography variant="small" className="truncate text-[11px] min-[769px]:text-xs text-muted-foreground">Manthan Gadegone</Typography>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={ExternalLink}
                    href={cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="!hidden min-[769px]:!flex"
                  >
                    Open PDF
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    icon={Download}
                    href={RESUME_URL}
                    download={RESUME_FILENAME}
                    onClick={handleResumeDownload}
                    className="!hidden min-[769px]:!flex"
                  >
                    Download
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    icon={Download}
                    href={RESUME_URL}
                    download={RESUME_FILENAME}
                    onClick={handleResumeDownload}
                    className="h-8 min-w-[7rem] px-3 text-xs min-[769px]:!hidden"
                  >
                    Download
                  </Button>
                  <Button
                    ref={closeButtonRef}
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    aria-label="Close resume viewer"
                    className="w-11 h-11 min-[769px]:w-8 min-[769px]:h-8 rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors"
                  >
                    <X size={18} />
                  </Button>
                </div>
              </div>

              {/* Image previews work even in browsers that do not support PDFs inside iframes. */}
              <div className="flex-1 min-h-0 w-full overflow-auto overscroll-contain bg-muted/20 p-2 min-[769px]:p-5">
                <a
                  href={cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-fit max-w-full mx-auto rounded-sm shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  aria-label="Open Manthan Gadegone's resume PDF in a new tab"
                >
                  <img
                    src={previewUrl}
                    alt="Preview of Manthan Gadegone's resume"
                    className="block max-w-full h-auto rounded-sm bg-white"
                    width="1490"
                    height="2105"
                    decoding="async"
                  />
                </a>
              </div>

            </motion.div>
          </FocusTrap>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
