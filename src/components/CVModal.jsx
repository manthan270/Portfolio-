import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, ExternalLink, File } from 'lucide-react';
import { Button } from './ui/Button';
import { Typography } from './ui/Typography';
import FocusTrap from 'focus-trap-react';

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
            className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
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
              className="w-full max-w-5xl h-[80vh] sm:h-[85vh] flex flex-col bg-background rounded-2xl border border-border/50 shadow-2xl relative overflow-hidden"
            >

              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 sm:px-6 border-b border-border/50 bg-secondary/5 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <File size={20} className="text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <Typography variant="h3" as="h2" id="cv-modal-title" className="text-sm font-semibold">Resume</Typography>
                    <Typography variant="small" className="text-xs text-muted-foreground">Manthan Gadegone</Typography>
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
                    className="hidden sm:flex"
                  >
                    Open PDF
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    icon={Download}
                    href={cvUrl}
                    download="Manthan_Gadegone_CV.pdf"
                    className="hidden sm:flex"
                  >
                    Download
                  </Button>
                  <Button
                    ref={closeButtonRef}
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    aria-label="Close resume viewer"
                    className="w-8 h-8 rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors"
                  >
                    <X size={18} />
                  </Button>
                </div>
              </div>

              {/* Image previews work even in browsers that do not support PDFs inside iframes. */}
              <div className="flex-1 w-full overflow-auto bg-muted/20 p-3 sm:p-5">
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
                    decoding="async"
                  />
                </a>
              </div>

              {/* Mobile actions keep the full PDF one tap away. */}
              <div className="sm:hidden p-4 border-t border-border/50 bg-background flex gap-3 shrink-0">
                <Button
                  variant="secondary"
                  className="flex-1"
                  icon={ExternalLink}
                  href={cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open PDF
                </Button>
                <Button
                  variant="primary"
                  className="flex-1"
                  icon={Download}
                  href={cvUrl}
                  download="Manthan_Gadegone_CV.pdf"
                >
                  Download Resume
                </Button>
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
