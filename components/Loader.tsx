"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Loader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fast progress ramp
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 18 + 5;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setTimeout(() => setVisible(false), 600);
      }
      setProgress(Math.min(p, 100));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black"
        >
          {/* Red radial glow */}
          <motion.div
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1.3, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute w-[600px] h-[600px] rounded-full bg-neon-red/20 blur-[120px] pointer-events-none"
          />

          {/* Title */}
          <motion.div className="relative z-10 text-center">
            <motion.h1
              initial={{ opacity: 0, letterSpacing: "0.5em", y: 20 }}
              animate={{ opacity: 1, letterSpacing: "0.2em", y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="font-bebas text-6xl md:text-9xl text-white"
            >
              BUILD<span className="text-neon-red" style={{ textShadow: "0 0 40px #ff003c" }}>VERSE</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="font-inter text-xs tracking-[0.5em] text-gray-500 mt-4 uppercase"
            >
              Tanay Goyal — Portfolio
            </motion.p>
          </motion.div>

          {/* Progress bar */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 z-10">
            <div className="h-[1px] w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-neon-red rounded-full"
                style={{ boxShadow: "0 0 8px #ff003c" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.1 }}
              />
            </div>
            <p className="font-inter text-[10px] text-white/30 tracking-widest mt-2 text-center">
              {Math.round(progress)}%
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
