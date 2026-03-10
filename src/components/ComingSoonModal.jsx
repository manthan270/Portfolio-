import React, { useEffect, useState, useRef, useMemo } from 'react';
import './ComingSoonModal.css';

const ComingSoonModal = ({ onClose }) => {
    const progress = 65;
    const pctRef = useRef(null);
    const [barWidth, setBarWidth] = useState("0%");

    // Generate particles only once
    const particles = useMemo(() => {
        return Array.from({ length: 14 }).map((_, i) => {
            const s = 1 + Math.random() * 1.5;
            return (
                <div
                    key={i}
                    className="particle"
                    style={{
                        left: `${Math.random() * 100}%`,
                        bottom: `${Math.random() * 20}%`,
                        width: `${s}px`,
                        height: `${s}px`,
                        '--dur': `${4 + Math.random() * 5}s`,
                        '--delay': `${Math.random() * 7}s`,
                    }}
                />
            );
        });
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setBarWidth(`${progress}%`);

            let s = null;
            const tick = ts => {
                if (!s) s = ts;
                const t = Math.min((ts - s) / 1200, 1);
                const e = 1 - Math.pow(1 - t, 3);
                if (pctRef.current) {
                    pctRef.current.textContent = Math.round(e * progress) + "%";
                }
                if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        }, 160);

        return () => clearTimeout(timeout);
    }, [progress]);

    const handleOverlayClick = (e) => {
        if (e.target.id === 'cs-overlay') {
            onClose();
        }
    };

    const isTestDone = progress >= 75;

    return (
        <div className="coming-soon-modal overlay" id="cs-overlay" onClick={handleOverlayClick}>
            <div className="modal">
                <div className="particles">
                    {particles}
                </div>
                <div className="modal-grid"></div>
                <div className="modal-stripe"></div>

                {/* TOP BAR */}
                <div className="top-bar">
                    <div className="status-pill">
                        <div className="status-dot"></div>
                        <span className="status-text">In Development</span>
                    </div>
                    <div className="top-bar-line"></div>
                    <button className="modal-close" onClick={onClose}>×</button>
                </div>

                {/* HERO */}
                <div className="hero">
                    <div className="hero-glow"></div>

                    <div className="hero-row">
                        <div className="icon-wrap">
                            <div className="ring-outer"></div>
                            <div className="ring-inner"></div>
                            <div className="icon-box">
                                <svg className="barrier-svg" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <ellipse className="s-halo" cx="27" cy="7" rx="5.5" ry="5.5" />
                                    <circle className="s-lamp" cx="27" cy="7" r="3.2" />
                                    <rect className="s-board" x="6" y="14" width="42" height="14" rx="3" />
                                    <clipPath id="sc"><rect x="6" y="14" width="42" height="14" rx="3" /></clipPath>
                                    <g clipPath="url(#sc)">
                                        <rect className="s-a" x="2" y="14" width="8" height="14" transform="skewX(-18)" />
                                        <rect className="s-b" x="12" y="14" width="8" height="14" transform="skewX(-18)" />
                                        <rect className="s-a" x="22" y="14" width="8" height="14" transform="skewX(-18)" />
                                        <rect className="s-b" x="32" y="14" width="8" height="14" transform="skewX(-18)" />
                                        <rect className="s-a" x="42" y="14" width="8" height="14" transform="skewX(-18)" />
                                    </g>
                                    <rect x="6" y="14" width="42" height="14" rx="3" fill="none" stroke="rgba(251,191,36,0.28)" strokeWidth="0.6" />
                                    <rect className="s-post" x="13" y="28" width="5" height="18" rx="2" />
                                    <rect className="s-post" x="36" y="28" width="5" height="18" rx="2" />
                                    <rect className="s-post" x="9" y="43" width="13" height="4" rx="2" />
                                    <rect className="s-post" x="32" y="43" width="13" height="4" rx="2" />
                                </svg>
                            </div>
                        </div>

                        <div className="hero-text">
                            <div className="modal-heading">CURRENTLY<br /><span className="hi">IN DEV.</span></div>
                        </div>
                    </div>

                    <div className="modal-desc">{"// This project isn't deployed yet. It's actively being built — something great is on the way."}</div>
                </div>

                {/* BODY */}
                <div className="body">
                    <div className="project-card">
                        <div className="proj-icon">🗺️</div>
                        <div className="proj-meta">
                            <div className="proj-label">Current Project</div>
                            <div className="proj-name">Interactive Campus Navigation App</div>
                        </div>
                        <div className="proj-wip">
                            <div className="wip-dot"></div>
                            <span className="wip-text">WIP</span>
                        </div>
                    </div>

                    <div className="progress-card">
                        <div className="prog-header">
                            <span className="prog-label">Build Progress</span>
                            <span className="prog-pct" ref={pctRef}>0%</span>
                        </div>
                        <div className="track"><div className="bar" style={{ width: barWidth }}></div></div>
                        <div className="chips">
                            <div className="chip done"><span className="chip-lbl">Design</span><span className="chip-ico">✓</span></div>
                            <div className="chip done"><span className="chip-lbl">Dev</span><span className="chip-ico">✓</span></div>
                            <div className={`chip ${isTestDone ? 'done' : ''}`}><span className="chip-lbl">Testing</span><span className="chip-ico">{isTestDone ? '✓' : '○'}</span></div>
                            <div className="chip"><span className="chip-lbl">Deploy</span><span className="chip-ico">○</span></div>
                        </div>
                    </div>

                    <button className="cta" onClick={onClose}>
                        Got it — I&apos;ll check back when it&apos;s live
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ComingSoonModal;
