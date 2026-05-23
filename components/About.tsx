"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Parallax scroll tie for glow blob
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const blobY = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const blobX = useTransform(scrollYProgress, [0, 1], [0, 40]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!titleRef.current) return;

      const text = titleRef.current.innerText;
      titleRef.current.innerHTML = text
        .split("")
        .map((char) =>
          char === " "
            ? `<span style="display:inline-block;width:0.4em;">&nbsp;</span>`
            : `<span class="char" style="display:inline-block;opacity:0;transform:translateY(70px) rotateX(-90deg);transform-origin:bottom">${char}</span>`
        )
        .join("");

      gsap.to(titleRef.current.querySelectorAll(".char"), {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 72%",
        },
        opacity: 1,
        y: 0,
        rotateX: 0,
        stagger: 0.045,
        duration: 0.9,
        ease: "power4.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-screen bg-black flex flex-col justify-center px-6 md:px-24 py-24 overflow-hidden z-20"
    >
      {/* Parallax glow blobs — scroll-tied */}
      <motion.div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          y: blobY,
          x: blobX,
          background: "radial-gradient(circle, rgba(255,0,60,0.12), transparent 70%)",
          filter: "blur(120px)",
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          y: useTransform(scrollYProgress, [0, 1], [60, -60]),
          background: "radial-gradient(circle, rgba(0,100,255,0.1), transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      <div className="max-w-5xl mx-auto w-full relative z-10">
        {/* Char-split GSAP title */}
        <h2
          ref={titleRef}
          className="font-anton text-7xl md:text-[8rem] text-white mb-16 tracking-tight uppercase leading-none perspective-[800px]"
          style={{ perspective: "800px" }}
        >
          WHO IS HE?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-gray-300 font-inter text-lg leading-relaxed">
          <ScrollReveal direction="left" delay={0.1}>
            <div>
              <p className="border-l-4 border-neon-red pl-6 py-3 bg-gradient-to-r from-neon-red/10 to-transparent rounded-r-lg">
                <span className="text-white font-bold text-xl block">
                  AI Builder. Product Thinker. Full-Stack Developer.
                </span>
              </p>

              <p className="mt-6 pl-6 text-gray-400 leading-relaxed">
                B.Tech AI/ML student building AI systems, mobile applications, and real-world products. Focused on creating practical technology — from mobility solutions and offline-first systems to AI-powered developer tools. Exploring the intersection of AI, product engineering, and scalable architectures.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.2}>
            <div className="flex flex-col justify-center">
              <h3 className="font-bebas text-3xl text-white tracking-wider mb-6">
                Interested in
              </h3>
              <ul className="space-y-5">
                {[
                  { label: "AI Systems", desc: "LLMs, agents, computer vision" },
                  { label: "Mobility Intelligence", desc: "Transit systems, navigation, smart mobility" },
                  { label: "Product Engineering", desc: "Full-stack, mobile, end-to-end systems" },
                  { label: "Offline-First Architecture", desc: "Reliable systems that work anywhere" },
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-4 group"
                    whileHover={{ x: 6 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    <div className="mt-1.5 min-w-[8px] h-2 w-2 bg-neon-red rotate-45 shadow-[0_0_10px_#ff003c] group-hover:scale-150 transition-transform duration-300" />
                    <div>
                      <span className="font-semibold text-white">{item.label}</span>
                      <span className="text-gray-500 ml-2 text-sm">— {item.desc}</span>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
