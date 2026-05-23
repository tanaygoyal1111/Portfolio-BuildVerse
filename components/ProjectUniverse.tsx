"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { projects } from "@/data/projects";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

// Extra link data per project
const projectLinks: Record<string, string> = {
  BHARATPATH: "https://github.com/tanaygoyal1111",
  POLITICO: "https://github.com/tanaygoyal1111",
  DEVCOPILOT: "https://github.com/tanaygoyal1111",
};

export default function ProjectUniverse() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
  const progressVal = useMotionValue(0); // 0 → 1

  // Parallax: phone moves slightly opposite to title
  const phoneParallax = useSpring(
    useTransform(progressVal, [0, 1], [0, -30]),
    { stiffness: 60, damping: 20 }
  );

  const setProjectCallback = useCallback(
    (projectIndex: number, imgIndex: number, rawProgress: number) => {
      setActiveProject(projectIndex);
      setActiveImage(imgIndex);
      progressVal.set(rawProgress);
    },
    [progressVal]
  );

  useEffect(() => {
    if (!sectionRef.current || !wrapperRef.current) return;

    const totalProjects = projects.length;
    const scrollLength = totalProjects * window.innerHeight;

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: `+=${scrollLength}`,
      pin: wrapperRef.current,
      scrub: 1,
      anticipatePin: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const projectIndex = Math.min(
          Math.floor(progress * totalProjects),
          totalProjects - 1
        );
        const subProgress = (progress * totalProjects) % 1;
        const currentProject = projects[projectIndex];
        const imgCount = currentProject.images.length;
        const imgIndex = Math.min(
          Math.floor(subProgress * imgCount),
          imgCount - 1
        );
        setProjectCallback(projectIndex, imgIndex, progress);
      },
    });

    return () => { st.kill(); };
  }, [setProjectCallback]);

  const project = projects[activeProject];

  return (
    <div
      id="projects"
      ref={sectionRef}
      style={{ height: `${(projects.length + 1) * 100}vh` }}
      className="relative bg-black"
    >
      {/* ── Pinned viewport ── */}
      <div ref={wrapperRef} className="w-full h-screen relative flex overflow-hidden">

        {/* Ambient glows — animated */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none z-0"
          animate={{ left: `${10 + activeProject * 15}%` }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          style={{
            background: "radial-gradient(circle, rgba(0,100,255,0.12), transparent 70%)",
            filter: "blur(120px)",
          }}
        />
        <motion.div
          className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none z-0"
          style={{
            background: "radial-gradient(circle, rgba(255,0,60,0.1), transparent 70%)",
            filter: "blur(100px)",
          }}
        />

        <div className="w-full h-full flex flex-col md:flex-row max-w-7xl mx-auto px-6 md:px-12 relative z-10">

          {/* ── LEFT: Project Details ── */}
          <div className="w-full md:w-1/2 h-full flex flex-col justify-center pr-0 md:pr-16">

            {/* Counter */}
            <motion.p
              className="font-bebas text-neon-red text-sm tracking-[0.5em] mb-8 uppercase"
              layout
            >
              Project Universe — {activeProject + 1}&nbsp;/&nbsp;{projects.length}
            </motion.p>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject}
                initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -40, filter: "blur(6px)" }}
                transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {/* Project title — large kinetic text */}
                <h3 className="font-anton text-[13vw] md:text-[5.5rem] lg:text-[7rem] text-white tracking-wide leading-none mb-4 will-change-transform">
                  {project.title}
                </h3>

                <p className="font-inter text-lg md:text-xl text-gray-400 mb-8 font-medium">
                  {project.theme}
                </p>

                {/* Feature badges */}
                <div className="flex flex-wrap gap-2.5 mb-10">
                  {project.features.map((feature, i) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.07, duration: 0.4, ease: "easeOut" }}
                    >
                      <Badge
                        variant="neon"
                        className="px-3 py-1.5 text-xs font-inter font-medium tracking-wide cursor-default"
                      >
                        {feature}
                      </Badge>
                    </motion.div>
                  ))}
                </div>

                {/* Image dot indicators */}
                <div className="flex gap-2 items-center mt-2">
                  {project.images.map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        width: i === activeImage ? 32 : 8,
                        backgroundColor:
                          i === activeImage ? "#ff003c" : "rgba(255,255,255,0.2)",
                        boxShadow:
                          i === activeImage ? "0 0 8px #ff003c" : "none",
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="h-1 rounded-full"
                    />
                  ))}
                </div>

                {/* View project link */}
                {projectLinks[project.title] && (
                  <motion.a
                    href={projectLinks[project.title]}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-8 inline-flex items-center gap-2 font-inter text-sm text-white/40 hover:text-neon-red transition-colors duration-300 tracking-widest uppercase group"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <span>View Project</span>
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                      className="text-neon-red"
                    >
                      →
                    </motion.span>
                  </motion.a>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── RIGHT: Device Mockups ── */}
          <div className="w-full md:w-1/2 h-full flex items-center justify-center">
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              style={{ y: phoneParallax }}
              className="relative will-change-transform flex items-center justify-center w-full"
            >
              {/* Glow beneath the active mockup */}
              <motion.div
                className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-4/5 h-12 rounded-full blur-2xl z-0"
                animate={{
                  backgroundColor:
                    project.layout === "mobile"
                      ? ["rgba(0,240,255,0.12)", "rgba(255,0,60,0.1)", "rgba(0,240,255,0.12)"]
                      : ["rgba(255,0,60,0.1)", "rgba(0,240,255,0.12)", "rgba(255,0,60,0.1)"],
                }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              />

              <AnimatePresence mode="wait">
                {project.layout === "mobile" ? (
                  /* ── PHONE MOCKUP ── */
                  <motion.div
                    key="phone-mockup"
                    initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.9, rotateY: 10 }}
                    transition={{ duration: 0.6 }}
                    className="relative w-[260px] h-[540px] md:w-[300px] md:h-[620px] bg-gray-950 border-[2.5px] border-gray-700 rounded-[2.8rem] overflow-hidden shadow-[0_0_80px_rgba(0,240,255,0.1),0_40px_80px_rgba(0,0,0,0.8)] z-10"
                  >
                    {/* Phone Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-gray-950 border-b border-gray-700 rounded-b-2xl z-50 flex items-center justify-center">
                      <div className="w-12 h-1.5 bg-gray-700 rounded-full" />
                    </div>

                    {/* Phone Neon border glow */}
                    <div
                      className="absolute inset-0 rounded-[2.8rem] z-40 pointer-events-none"
                      style={{
                        boxShadow: "inset 0 0 40px rgba(0,240,255,0.06), inset 0 0 0 1px rgba(0,240,255,0.1)",
                      }}
                    />

                    {/* Screen content */}
                    <div className="w-full h-full relative bg-gray-950">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`${activeProject}-${activeImage}`}
                          initial={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
                          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                          exit={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
                          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                          className="absolute inset-0"
                        >
                          <Image
                            src={project.images[activeImage]}
                            alt={`${project.title} screenshot ${activeImage + 1}`}
                            fill
                            className="object-cover"
                            priority
                          />
                        </motion.div>
                      </AnimatePresence>

                      {/* Screen shine */}
                      <div
                        className="absolute inset-0 z-30 pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)",
                        }}
                      />
                    </div>
                  </motion.div>
                ) : (
                  /* ── DESKTOP BROWSER MOCKUP ── */
                  <motion.div
                    key="browser-mockup"
                    initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
                    animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                    exit={{ opacity: 0, scale: 0.9, rotateX: -10 }}
                    transition={{ duration: 0.6 }}
                    className="relative w-[320px] h-[210px] sm:w-[440px] sm:h-[280px] md:w-[540px] md:h-[350px] lg:w-[600px] lg:h-[390px] bg-gray-950 border-[2px] border-gray-800 rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(255,0,60,0.08),0_40px_80px_rgba(0,0,0,0.85)] z-10 flex flex-col"
                  >
                    {/* Browser Toolbar */}
                    <div className="h-9 border-b border-gray-800 bg-gray-900/80 backdrop-blur-md flex items-center px-4 gap-2 z-50 select-none flex-shrink-0">
                      {/* Window Controls */}
                      <div className="flex gap-1.5 mr-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                      </div>
                      {/* URL Bar */}
                      <div className="flex-1 bg-black/45 rounded-md h-5 px-3 flex items-center text-[10px] text-gray-500 font-mono tracking-wider overflow-hidden">
                        {project.title.toLowerCase()}.tanaygoyal.dev
                      </div>
                    </div>

                    {/* Screen content */}
                    <div className="flex-1 w-full relative bg-gray-950">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`${activeProject}-${activeImage}`}
                          initial={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
                          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                          exit={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
                          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                          className="absolute inset-0"
                        >
                          <Image
                            src={project.images[activeImage]}
                            alt={`${project.title} screenshot ${activeImage + 1}`}
                            fill
                            className="object-cover object-top"
                            priority
                          />
                        </motion.div>
                      </AnimatePresence>

                      {/* Screen shine */}
                      <div
                        className="absolute inset-0 z-30 pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 60%)",
                        }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* ── Bottom project progress bar ── */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
          {projects.map((p, i) => (
            <div key={i} className="flex items-center gap-2">
              <motion.div
                animate={{
                  width: i === activeProject ? 48 : 16,
                  backgroundColor:
                    i === activeProject ? "#ff003c" : "rgba(255,255,255,0.15)",
                  boxShadow: i === activeProject ? "0 0 10px #ff003c" : "none",
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="h-[2px] rounded-full"
              />
              {i === activeProject && (
                <motion.span
                  layoutId="project-label"
                  className="font-inter text-[9px] tracking-[0.3em] text-neon-red uppercase"
                >
                  {p.title}
                </motion.span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
