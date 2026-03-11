import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const FONT_DISPLAY = "'Outfit', sans-serif";

interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function SlidePanel({ open, onClose, children }: Props) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100]"
            style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 35 }}
            className="fixed top-0 right-0 bottom-0 z-[101] w-full max-w-xl overflow-y-auto"
            style={{
              background: "rgba(10,12,18,0.98)",
              backdropFilter: "blur(20px)",
              borderLeft: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "-20px 0 80px rgba(0,0,0,0.7)",
            }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="sticky top-4 right-4 z-10 float-right m-4 flex h-10 w-10 items-center justify-center rounded-full transition-colors"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <X className="h-5 w-5 text-white/60" />
            </button>

            <div className="clear-both px-6 pb-10 pt-2 md:px-8">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
