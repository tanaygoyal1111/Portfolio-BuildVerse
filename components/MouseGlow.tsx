"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function MouseGlow() {
  const [mounted, setMounted] = useState(false);
  const rawX = useMotionValue(-1000);
  const rawY = useMotionValue(-1000);

  // Slow-spring for the large ambient glow
  const ambientX = useSpring(rawX, { stiffness: 40, damping: 22 });
  const ambientY = useSpring(rawY, { stiffness: 40, damping: 22 });

  // Faster spring for the tight cursor highlight
  const cursorX = useSpring(rawX, { stiffness: 120, damping: 18 });
  const cursorY = useSpring(rawY, { stiffness: 120, damping: 18 });

  useEffect(() => {
    setMounted(true);
    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [rawX, rawY]);

  if (!mounted) return null;

  return (
    <>
      {/* Large slow ambient glow — blue */}
      <motion.div
        className="pointer-events-none fixed z-[55] rounded-full mix-blend-screen"
        style={{
          width: 700,
          height: 700,
          x: ambientX,
          y: ambientY,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle, rgba(0,180,255,0.07) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Tight fast cursor glow — red tint */}
      <motion.div
        className="pointer-events-none fixed z-[56] rounded-full mix-blend-screen"
        style={{
          width: 220,
          height: 220,
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle, rgba(255,0,60,0.12) 0%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />
    </>
  );
}
