"use client";

import Spline from "@splinetool/react-spline";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
} from "framer-motion";
import { Button } from "./ui/button";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";

export default function HeroSpline() {
  const [mounted, setMounted] = useState(false);

  // ── Mouse tracking (raw) ──
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // ── Spring physics — per spec: stiffness:45, damping:18 ──
  const springX = useSpring(rawX, { stiffness: 45, damping: 18, mass: 1 });
  const springY = useSpring(rawY, { stiffness: 45, damping: 18, mass: 1 });

  // ── Background text moves opposite (parallax depth) ──
  const bgX = useTransform(springX, (v) => -v * 0.35);
  const bgY = useTransform(springY, (v) => -v * 0.25);

  // ── Combined Y: spring mouse Y + idle float ──
  const combinedY = useMotionValue(0);

  // ── Idle float values ──
  const idleY = useMotionValue(0);
  const idleRot = useMotionValue(0);

  // ── Breathing glow scale ──
  const glowScale = useMotionValue(1);
  const glowOpacity = useMotionValue(0.18);

  useEffect(() => {
    setMounted(true);

    // Keep combinedY in sync
    const unsubSpringY = springY.on("change", (v) => {
      combinedY.set(v + idleY.get());
    });
    const unsubIdleY = idleY.on("change", (v) => {
      combinedY.set(springY.get() + v);
    });

    // Mouse parallax
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      // ±18px X, ±12px Y per spec
      rawX.set(((e.clientX - cx) / cx) * 18);
      rawY.set(((e.clientY - cy) / cy) * 12);
    };
    window.addEventListener("mousemove", onMove);

    // ── Idle loop: 7s, infinite ──
    // y: 0 → -28 → 0
    // rotation: 0 → 1.2 → 0 → -1.2 → 0
    const floatAnim = animate(idleY, [0, -28, 0], {
      duration: 7,
      repeat: Infinity,
      ease: "easeInOut",
    });

    const rotAnim = animate(idleRot, [0, 1.2, 0, -1.2, 0], {
      duration: 7,
      repeat: Infinity,
      ease: "easeInOut",
    });

    // ── Breathing glow ──
    const glowAnim = animate(glowScale, [1, 1.25, 1], {
      duration: 3.5,
      repeat: Infinity,
      ease: "easeInOut",
    });

    const glowOpacAnim = animate(glowOpacity, [0.18, 0.32, 0.18], {
      duration: 3.5,
      repeat: Infinity,
      ease: "easeInOut",
    });

    return () => {
      unsubSpringY();
      unsubIdleY();
      window.removeEventListener("mousemove", onMove);
      floatAnim.stop();
      rotAnim.stop();
      glowAnim.stop();
      glowOpacAnim.stop();
    };
  }, [rawX, rawY, idleY, idleRot, glowScale, glowOpacity]);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center">

      {/* ── Background typography (parallax opposite to character) ── */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
        style={{ x: bgX, y: bgY, opacity: 0.07 }}
      >
        <span className="font-anton text-[22vw] text-white leading-none hidden md:block tracking-tighter">
          TANAY
        </span>
        <div className="flex flex-col items-center md:hidden leading-none">
          <span className="font-anton text-[28vw] text-white">TANAY</span>
          <span className="font-anton text-[28vw] text-white">BUILDS</span>
          <span className="font-anton text-[28vw] text-white">SYSTEMS</span>
        </div>
      </motion.div>

      {/* ── Breathing red radial glow ── */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none z-0"
        style={{
          scale: glowScale,
          opacity: glowOpacity,
          background: "radial-gradient(circle, #ff003c, transparent 70%)",
          filter: "blur(120px)",
        }}
      />

      {/* ── Blue underglow — drifts slowly ── */}
      <motion.div
        className="absolute -bottom-32 -left-32 w-[600px] h-[600px] rounded-full pointer-events-none z-0"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
        style={{
          background: "radial-gradient(circle, rgba(0,120,255,0.3), transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      {/* ── Fog layer 1 — slow drift ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-[1]"
        animate={{ x: ["-5%", "5%", "-5%"], opacity: [0.04, 0.08, 0.04] }}
        transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
        style={{
          background:
            "radial-gradient(ellipse 80% 40% at 50% 80%, rgba(255,0,60,0.15), transparent)",
        }}
      />

      {/* ── Fog layer 2 — drift opposite ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-[1]"
        animate={{ x: ["5%", "-5%", "5%"], opacity: [0.03, 0.07, 0.03] }}
        transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
        style={{
          background:
            "radial-gradient(ellipse 60% 30% at 30% 60%, rgba(0,100,255,0.18), transparent)",
        }}
      />

      {/* ── Spline character — idle float + mouse parallax ── */}
      <motion.div
        className="absolute inset-0 z-10 w-full h-full"
        style={{
          x: springX,
          y: combinedY,
          rotate: idleRot,
        }}
      >
        <Spline scene="https://prod.spline.design/lyuybD4hrW5LYOzH/scene.splinecode" />
      </motion.div>

      {/* ── Bottom content bar ── */}
      <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-end p-6 md:p-12">
        {mounted && (
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 2.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col md:flex-row justify-between items-end w-full gap-8"
          >
            {/* Name + roles + socials */}
            <div className="pointer-events-auto">
              <motion.h2
                className="font-bebas text-5xl md:text-7xl text-white tracking-wide leading-none drop-shadow-[0_2px_30px_rgba(0,0,0,0.9)]"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 2.4, ease: "easeOut" }}
              >
                Tanay Goyal
              </motion.h2>

              <div className="flex flex-wrap gap-2 mt-3">
                {["AI Engineer", "Builder", "Product Developer"].map((role, i) => (
                  <motion.span
                    key={role}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 2.6 + i * 0.12, ease: "easeOut" }}
                    className={`px-3 py-1 text-sm font-inter font-medium rounded border ${
                      i === 0
                        ? "text-neon-red bg-neon-red/10 border-neon-red/30"
                        : "text-gray-300 bg-white/5 border-white/10"
                    }`}
                  >
                    {role}
                  </motion.span>
                ))}
              </div>

              <motion.div
                className="mt-6 flex gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.1, duration: 0.8 }}
              >
                {[
                  { href: "https://github.com/tanaygoyal1111", Icon: FiGithub, hover: "hover:text-neon-red hover:border-neon-red/50" },
                  { href: "https://linkedin.com/in/tanay-goyal-325a37298", Icon: FiLinkedin, hover: "hover:text-blue-400 hover:border-blue-400/50" },
                  { href: "mailto:goyaltanay.1111@gmail.com", Icon: FiMail, hover: "hover:text-green-400 hover:border-green-400/50" },
                ].map(({ href, Icon, hover }) => (
                  <MagneticButton key={href}>
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className={`p-3 bg-black/40 backdrop-blur-sm border border-white/10 rounded-full text-white ${hover} transition-all duration-300`}
                    >
                      <Icon size={18} />
                    </a>
                  </MagneticButton>
                ))}
              </motion.div>
            </div>

            {/* CTA — magnetic */}
            <motion.div
              className="pointer-events-auto"
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.9, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <MagneticButton strength={20}>
                <Button
                  variant="neon"
                  size="lg"
                  className="font-bebas text-xl md:text-2xl tracking-widest px-8 py-6 uppercase transition-all duration-300"
                  onClick={() =>
                    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Enter Buildverse
                </Button>
              </MagneticButton>
            </motion.div>
          </motion.div>
        )}

        {/* ── Animated scroll indicator ── */}
        {mounted && (
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.8, duration: 1 }}
          >
            <span className="font-inter text-[9px] tracking-[0.5em] text-white/30 uppercase">scroll</span>
            {/* Mouse icon */}
            <div className="relative w-5 h-8 border border-white/20 rounded-full flex justify-center pt-1.5">
              <motion.div
                className="w-0.5 h-1.5 bg-white/60 rounded-full"
                animate={{ y: [0, 10, 0], opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        )}
      </div>

      {/* ── Vignette ── */}
      <div className="absolute inset-0 z-30 pointer-events-none shadow-[inset_0_0_220px_rgba(0,0,0,0.95)]" />
    </section>
  );
}

// ── Magnetic button wrapper ──
function MagneticButton({
  children,
  strength = 12,
}: {
  children: React.ReactNode;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set(((e.clientX - cx) / (rect.width / 2)) * strength);
    y.set(((e.clientY - cy) / (rect.height / 2)) * strength);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  );
}
