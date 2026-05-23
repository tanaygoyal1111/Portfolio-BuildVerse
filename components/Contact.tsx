"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import { FiGithub, FiLinkedin, FiMail, FiFileText } from "react-icons/fi";

const links = [
  {
    label: "GITHUB",
    icon: FiGithub,
    href: "https://github.com/tanaygoyal1111",
    classes:
      "border-white/20 text-white hover:border-white hover:bg-white hover:text-black",
  },
  {
    label: "LINKEDIN",
    icon: FiLinkedin,
    href: "https://linkedin.com/in/tanay-goyal-325a37298",
    classes:
      "border-blue-500/30 text-blue-400 hover:border-blue-400 hover:bg-blue-400 hover:text-black",
  },
  {
    label: "MAIL",
    icon: FiMail,
    href: "mailto:goyaltanay.1111@gmail.com",
    classes:
      "border-green-500/30 text-green-400 hover:border-green-400 hover:bg-green-400 hover:text-black",
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-15%" });

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen bg-black flex flex-col justify-center px-6 md:px-24 py-24 overflow-hidden z-20"
    >
      {/* Background radials */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(0,240,255,0.07),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,0,60,0.08),transparent_60%)] pointer-events-none" />

      {/* Glow sweep — animates in when section visible */}
      <motion.div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] pointer-events-none"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: [0, 0.6, 0] } : {}}
        transition={{ duration: 1.4, ease: "easeOut" }}
        style={{
          background:
            "linear-gradient(90deg, transparent, #ff003c 40%, #00f0ff 60%, transparent)",
          transformOrigin: "left",
          filter: "blur(2px)",
        }}
      />

      <div className="max-w-5xl mx-auto w-full relative z-10">
        {/* LET'S */}
        <div className="overflow-hidden mb-2">
          <motion.h2
            className="font-anton text-[12vw] md:text-[9rem] text-white leading-none uppercase"
            initial={{ y: "110%" }}
            animate={inView ? { y: "0%" } : {}}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            LET&rsquo;S
          </motion.h2>
        </div>

        {/* BUILD. — hollow neon */}
        <div className="overflow-hidden mb-14">
          <motion.h2
            className="font-anton text-[12vw] md:text-[9rem] leading-none uppercase"
            style={{
              WebkitTextStroke: "2px #ff003c",
              color: "transparent",
              textShadow: "0 0 40px rgba(255,0,60,0.5)",
            }}
            initial={{ y: "110%" }}
            animate={inView ? { y: "0%" } : {}}
            transition={{ duration: 1, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            BUILD.
          </motion.h2>
        </div>

        {/* CTA buttons — stagger up */}
        <motion.div
          className="flex flex-wrap gap-5"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
        >
          {links.map(({ label, icon: Icon, href, classes }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
            >
              <MagneticContactBtn className={`h-14 px-8 text-base font-bebas tracking-widest border ${classes}`}>
                <Icon className="mr-2.5" size={18} />
                {label}
              </MagneticContactBtn>
            </a>
          ))}

          <a href="/resume.pdf" target="_blank" rel="noreferrer">
            <MagneticContactBtn className="h-14 px-8 text-base font-bebas tracking-widest border border-neon-red text-neon-red hover:bg-neon-red hover:text-black"
              glowColor="rgba(255,0,60,0.35)"
            >
              <FiFileText className="mr-2.5" size={18} />
              RESUME
            </MagneticContactBtn>
          </a>
        </motion.div>

        {/* Footer line */}
        <motion.div
          className="mt-24 flex items-center gap-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <div className="flex-1 h-[1px] bg-white/10" />
          <p className="font-inter text-gray-600 text-sm tracking-[0.3em] uppercase">
            &copy; {new Date().getFullYear()} Tanay Goyal
          </p>
          <div className="flex-1 h-[1px] bg-white/10" />
        </motion.div>
      </div>
    </section>
  );
}

function MagneticContactBtn({
  children,
  className,
  glowColor = "rgba(255,255,255,0.15)",
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set(((e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)) * 8);
    y.set(((e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)) * 5);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      whileHover={{ boxShadow: `0 0 22px ${glowColor}` }}
      className={`inline-flex items-center justify-center rounded-md transition-all duration-300 cursor-pointer ${className}`}
    >
      {children}
    </motion.button>
  );
}
