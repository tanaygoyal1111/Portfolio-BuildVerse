"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Dot — very fast, stays on cursor
  const dotX = useSpring(rawX, { stiffness: 600, damping: 35 });
  const dotY = useSpring(rawY, { stiffness: 600, damping: 35 });

  // Ring — slow lag, cinematic trail
  const ringX = useSpring(rawX, { stiffness: 80, damping: 22 });
  const ringY = useSpring(rawY, { stiffness: 80, damping: 22 });

  useEffect(() => {
    setMounted(true);

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };

    const onMouseDown = () => setClicking(true);
    const onMouseUp = () => setClicking(false);

    const attachHover = () => {
      const interactives = document.querySelectorAll<HTMLElement>(
        "a, button, [role='button'], .cursor-hover"
      );
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", () => setHovering(true));
        el.addEventListener("mouseleave", () => setHovering(false));
      });
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    // Slight delay to let DOM mount
    const t = setTimeout(attachHover, 800);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      clearTimeout(t);
    };
  }, [rawX, rawY]);

  if (!mounted) return null;

  return (
    <>
      {/* Outer ring — trails behind */}
      <motion.div
        className="pointer-events-none fixed z-[9998] rounded-full border border-white/30 mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: hovering ? 52 : clicking ? 18 : 36,
          height: hovering ? 52 : clicking ? 18 : 36,
          borderColor: hovering
            ? "rgba(255,0,60,0.9)"
            : "rgba(255,255,255,0.3)",
          boxShadow: hovering
            ? "0 0 16px rgba(255,0,60,0.5)"
            : "none",
        }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
      />

      {/* Inner dot — precise, on cursor */}
      <motion.div
        className="pointer-events-none fixed z-[9999] rounded-full bg-neon-red"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          boxShadow: "0 0 10px #ff003c, 0 0 20px rgba(255,0,60,0.4)",
        }}
        animate={{
          width: clicking ? 4 : hovering ? 8 : 6,
          height: clicking ? 4 : hovering ? 8 : 6,
          opacity: hovering ? 0.6 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </>
  );
}
