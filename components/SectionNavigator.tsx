"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const sections = [
  { id: "hero", label: "HERO" },
  { id: "about", label: "ABOUT" },
  { id: "projects", label: "PROJECTS" },
  { id: "skills", label: "SKILLS" },
  { id: "contact", label: "CONTACT" },
];

export default function SectionNavigator() {
  const [active, setActive] = useState("hero");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const el = document.getElementById(id) ?? document.querySelector("section");
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-4"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 3.5, duration: 0.8 }}
    >
      {sections.map(({ id, label }) => {
        const isActive = active === id;

        return (
          <button
            key={id}
            onClick={() => {
              const el = id === "hero"
                ? document.querySelector("section")
                : document.getElementById(id);
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex items-center gap-2.5 group"
          >
            {/* Label — slides in on active */}
            <AnimatePresence>
              {isActive && (
                <motion.span
                  key="label"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.25 }}
                  className="font-inter text-[9px] tracking-[0.3em] text-neon-red uppercase"
                >
                  {label}
                </motion.span>
              )}
            </AnimatePresence>

            {/* Dot */}
            <motion.div
              animate={{
                scale: isActive ? 1.4 : 1,
                backgroundColor: isActive ? "#ff003c" : "rgba(255,255,255,0.3)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="w-1.5 h-1.5 rounded-full"
              style={{
                boxShadow: isActive ? "0 0 8px #ff003c" : "none",
              }}
            />
          </button>
        );
      })}
    </motion.div>
  );
}
