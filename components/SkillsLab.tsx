"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "@/lib/gsap";
import ScrollReveal from "./ScrollReveal";

const skills = [
  { name: "React", color: "from-cyan-500/20", floatDelay: 0 },
  { name: "React Native", color: "from-blue-500/20", floatDelay: 0.4 },
  { name: "Next.js", color: "from-white/10", floatDelay: 0.8 },
  { name: "Expo", color: "from-purple-500/20", floatDelay: 1.2 },
  { name: "FastAPI", color: "from-green-500/20", floatDelay: 0.2 },
  { name: "Redis", color: "from-red-500/20", floatDelay: 0.6 },
  { name: "AWS", color: "from-orange-500/20", floatDelay: 1.0 },
  { name: "Docker", color: "from-blue-600/20", floatDelay: 0.3 },
  { name: "Supabase", color: "from-emerald-500/20", floatDelay: 0.7 },
  { name: "CI/CD", color: "from-yellow-500/20", floatDelay: 1.1 },
  { name: "Gemini", color: "from-blue-400/20", floatDelay: 0.5 },
  { name: "OpenCV", color: "from-teal-500/20", floatDelay: 0.9 },
  { name: "ML", color: "from-pink-500/20", floatDelay: 1.4 },
];

export default function SkillsLab() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".skill-card",
        { opacity: 0, y: 60, scale: 0.85 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: {
            each: 0.06,
            from: "random",
          },
          duration: 0.7,
          ease: "back.out(1.7)",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative min-h-screen bg-black flex flex-col justify-center px-6 md:px-24 py-24 z-20 overflow-hidden"
    >
      {/* Ambient glows */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-neon-red/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-[300px] h-[300px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full relative z-10">
        <ScrollReveal direction="up">
          <h2 className="font-anton text-7xl md:text-[8rem] text-white mb-4 uppercase leading-none">
            SKILLS LAB
          </h2>
          <p className="font-inter text-gray-500 text-lg mb-16 tracking-wide">
            Tools I reach for. Things I&apos;ve shipped with.
          </p>
        </ScrollReveal>

        <div className="flex flex-wrap justify-start gap-4 md:gap-5">
          {skills.map((skill, index) => (
            // Outer div for GSAP reveal (needs opacity: 0 start)
            <div key={index} className="skill-card">
              {/* Inner motion div for independent floating + hover */}
              <motion.div
                animate={{
                  y: [0, -8, 0, -4, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4 + (skill.floatDelay % 1.5),
                  delay: skill.floatDelay,
                  ease: "easeInOut",
                }}
                whileHover={{
                  y: -16,
                  scale: 1.1,
                  boxShadow: "0 0 28px rgba(255,0,60,0.3), inset 0 0 15px rgba(255,0,60,0.06), 0 0 0 1px rgba(255,0,60,0.3)",
                  transition: { type: "spring", stiffness: 280, damping: 18 },
                }}
                className={`px-6 py-4 rounded-2xl border border-gray-800 bg-gradient-to-br ${skill.color} to-transparent backdrop-blur-sm cursor-default select-none`}

              >
                <motion.span
                  className="font-bebas text-2xl md:text-3xl tracking-wider text-white block"
                  whileHover={{ color: "#ff003c" }}
                  transition={{ duration: 0.2 }}
                >
                  {skill.name}
                </motion.span>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
