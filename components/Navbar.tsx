"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "ABOUT", href: "#about" },
  { label: "PROJECTS", href: "#projects" },
  { label: "SKILLS", href: "#skills" },
];

const sectionIds = ["about", "projects", "skills", "contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [hovered, setHovered] = useState<string | null>(null);

  // Magnetic logo
  const logoX = useMotionValue(0);
  const logoY = useMotionValue(0);
  const logoSx = useSpring(logoX, { stiffness: 200, damping: 20 });
  const logoSy = useSpring(logoY, { stiffness: 200, damping: 20 });
  const logoRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const onLogoMove = (e: React.MouseEvent) => {
    const el = logoRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    logoX.set(((e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)) * 8);
    logoY.set(((e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)) * 4);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: 2, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-500 px-6 py-4 flex items-center justify-between",
        scrolled
          ? "bg-black/70 backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-transparent"
      )}
    >
      {/* Magnetic logo */}
      <motion.a
        ref={logoRef}
        href="/"
        style={{ x: logoSx, y: logoSy }}
        onMouseMove={onLogoMove}
        onMouseLeave={() => { logoX.set(0); logoY.set(0); }}
        className="font-bebas text-2xl tracking-widest text-white hover:text-neon-red transition-colors duration-300 block"
      >
        BUILDVERSE
      </motion.a>

      {/* Nav links with animated underline */}
      <div className="hidden md:flex items-center gap-8 font-inter text-sm font-medium tracking-wide">
        {navLinks.map(({ label, href }) => {
          const id = href.replace("#", "");
          const isActive = activeSection === id;
          const isHovered = hovered === label;

          return (
            <Link
              key={label}
              href={href}
              className="relative py-1 text-gray-300 hover:text-white transition-colors duration-300"
              onMouseEnter={() => setHovered(label)}
              onMouseLeave={() => setHovered(null)}
            >
              {label}
              {/* Animated underline */}
              <motion.span
                className="absolute -bottom-0.5 left-0 h-[1px] bg-neon-red"
                animate={{ width: isActive || isHovered ? "100%" : "0%" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{ boxShadow: "0 0 6px #ff003c" }}
              />
              {/* Active dot */}
              {isActive && (
                <motion.span
                  layoutId="active-dot"
                  className="absolute -top-1 -right-1.5 w-1 h-1 rounded-full bg-neon-red"
                  style={{ boxShadow: "0 0 6px #ff003c" }}
                />
              )}
            </Link>
          );
        })}

        {/* CTA with magnetic */}
        <MagneticNavButton href="#contact">
          LET&rsquo;S BUILD
        </MagneticNavButton>
      </div>
    </motion.nav>
  );
}

function MagneticNavButton({ href, children }: { href: string; children: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set(((e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)) * 6);
    y.set(((e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)) * 4);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: sx, y: sy, boxShadow: "0 0 0 rgba(255,0,60,0)" }}
      onMouseMove={onMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className="text-neon-red border border-neon-red px-4 py-2 rounded font-inter text-sm font-medium tracking-wide hover:bg-neon-red/10 transition-all duration-300"
      whileHover={{ boxShadow: "0 0 20px rgba(255,0,60,0.35)" }}
    >
      {children}
    </motion.a>
  );
}
