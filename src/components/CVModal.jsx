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

function ResumeDownloadAction({ pdfUrl, compact = false }) {
  if (compact) {
    return (
      <a
        href={pdfUrl}
        download={RESUME_FILENAME}
        onClick={handleResumeDownload}
        className="inline-flex h-11 w-28 items-center justify-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <span className="inline-flex h-8 w-28 items-center justify-center gap-1.5 rounded-md border border-primary/20 bg-gradient-to-b from-primary/90 to-primary px-3 text-xs font-medium text-primary-foreground shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.15),0px_2px_4px_rgba(0,0,0,0.1)] transition-[filter] hover:brightness-110">
          <Download aria-hidden="true" className="h-[1.2em] w-[1.2em] opacity-80" />
          <span>Download</span>
        </span>
      </a>
    );
  }

  return (
    <Button
      variant="primary"
      size="sm"
      icon={Download}
      href={pdfUrl}
      download={RESUME_FILENAME}
      onClick={handleResumeDownload}
    >
      Download
    </Button>
  );
}

function ModalCloseAction({ onClose, mobileRef, desktopRef }) {
  return (
    <>
      <div className="min-[769px]:hidden">
        <button
          ref={mobileRef}
          type="button"
          onClick={onClose}
          aria-label="Close resume viewer"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive">
            <X size={18} aria-hidden="true" />
          </span>
        </button>
      </div>
      <div className="hidden min-[769px]:block">
        <Button
          ref={desktopRef}
          variant="ghost"
          size="icon"
          onClick={onClose}
          aria-label="Close resume viewer"
          className="w-8 h-8 rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors shrink-0"
        >
          <X size={18} />
        </Button>
      </div>
    </>
  );
}

export default function CVModal({ isOpen, onClose, pdfUrl = RESUME_URL }) {
  const mobileCloseButtonRef = useRef(null);
  const desktopCloseButtonRef = useRef(null);
  const previewUrl = pdfUrl.replace(/\.pdf$/i, '-preview.png');

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
            className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          >
          <FocusTrap focusTrapOptions={{
            initialFocus: () => (
              window.matchMedia('(min-width: 769px)').matches
                ? desktopCloseButtonRef.current
                : mobileCloseButtonRef.current
            ),
            returnFocusOnDeactivate: true,
          }}>
            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="cv-modal-title"
              className="w-full max-w-5xl h-[85dvh] max-h-[calc(100dvh-1.5rem)] flex flex-col bg-background rounded-2xl border border-border/50 shadow-2xl relative overflow-hidden"
            >

              {/* Header */}
              <div className="flex items-center justify-between px-3 py-2.5 sm:px-6 sm:py-3 border-b border-border/50 bg-secondary/5 shrink-0">
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <div className="p-1.5 sm:p-2 bg-primary/10 rounded-lg shrink-0">
                    <File size={18} className="text-primary sm:w-5 sm:h-5" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <Typography variant="h3" as="h2" id="cv-modal-title" className="text-sm font-semibold truncate leading-tight">Resume</Typography>
                    <Typography variant="small" className="text-xs text-muted-foreground truncate leading-tight">Manthan Gadegone</Typography>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <div className="hidden min-[769px]:block">
                    <Button
                      variant="secondary"
                      size="sm"
                      icon={ExternalLink}
                      href={pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open PDF
                    </Button>
                  </div>
                  <div className="hidden min-[769px]:block">
                    <ResumeDownloadAction pdfUrl={pdfUrl} />
                  </div>
                  <div className="min-[769px]:hidden">
                    <ResumeDownloadAction pdfUrl={pdfUrl} compact />
                  </div>
                  <ModalCloseAction
                    onClose={onClose}
                    mobileRef={mobileCloseButtonRef}
                    desktopRef={desktopCloseButtonRef}
                  />
                </div>
              </div>

              {/* Resume preview area */}
              <div className="flex-1 min-h-0 w-full overflow-auto overscroll-contain bg-muted/20 p-2 sm:p-5">
                <a
                  href={pdfUrl}
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
