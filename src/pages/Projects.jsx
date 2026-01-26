import React, { useEffect, useMemo, useRef, useState } from 'react'
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import photo1 from "../assets/photo1.jpg";
import photo2 from "../assets/photo2.png";
import photo3 from "../assets/photo3.png";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion';

const useIsMobile = (query = "(max-width: 639px)") => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' && window.matchMedia(query).matches
  )

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia(query);
    const handler = (e) => setIsMobile(e.matches);

    mql.addEventListener("change", handler);
    setIsMobile(mql.matches);
    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return isMobile;
}

const Projects = () => {
  const isMobile = useIsMobile();
  const sceneRef = useRef(null);
  const projects = useMemo(
    () => [
      {
        title: "E-Commerce",
        link: "https://github.com/ImBsarfraz/shopit-mernstack-project",
        bgColor: "#0d4d3d",
        image: isMobile ? photo1 : img1, // use mobile or desktop image
      },
      {
        title: "LMS",
        link: "https://github.com/ImBsarfraz/learning-management-system",
        bgColor: "#3884d3",
        image: isMobile ? photo2 : img2,
      },
      {
        title: "YelpCamp",
        link: "https://github.com/ImBsarfraz/yelpcamp_project",
        bgColor: "#dc9317",
        image: isMobile ? photo3 : img3,
      },
    ],
    [isMobile] // re-run only when `isMobile` changes
  );

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"]
  })

  const thresholds = useMemo(
    () => projects.map((_, i) => (i + 1) / projects.length),
    [projects.length]
  );

  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!thresholds.length) return;

    const idx = thresholds.findIndex((t) => v <= t);
    const newIndex = idx === -1 ? thresholds.length - 1 : idx;

    setActiveIndex((prev) => (prev !== newIndex ? newIndex : prev));
  });

  const activeProject = projects[activeIndex];

  return (
    <section
      ref={sceneRef}
      id='projects'
      className='relative text-white'
      style={{
        height: `${100 * projects.length}vh`,
        backgroundColor: activeProject.bgColor,
        transition: "background-color: 400ms ease"
      }}
    >
      <div className='sticky top-0 h-screen flex flex-col items-center justify-center'>
        <h2 className={`text-3xl font-semibold z-10 text-center ${isMobile ? "mt-4" : "mt-8"}`}>My Work</h2>
        <div className={`relative w-full flex-1 flex items-center justify-center ${isMobile ? "-mt-4" : ""
          }`}>
          {
            projects.map((project, idx) => (
              <div key={project.title} className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${activeIndex === idx ? "opacity-100 z-20" : "opacity-0 z-0 pointer-events-none"
                }`}
                style={{
                  width: "85%",
                  maxWidth: "1200px"
                }}
              >
                <AnimatePresence mode='wait'>
                  {activeIndex === idx && (
                    <motion.h3
                      key={project.title}
                      initial={{ opacity: 0, y: -30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 30 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className={`block text-center text-[clamp(2rem,6vw,5rem)] text-white/95 sm:absolute sm:top-0 sm:left-[35%] lg:left-[-5%] sm:mb-0 italic font-semibold ${isMobile ? "-mt-24" : ""}`
                      }
                      style={{
                        zIndex: 5,
                        textAlign: isMobile ? "center" : "left"
                      }}
                    >
                      {project.title}
                    </motion.h3>
                  )}
                </AnimatePresence>

                <div className={`relative w-full overflow-hidden bg-black/20 shadow-2xl md:shadow-[0_35px_60px_-50px_rgba(0, 0, 0, 0.7)] ${isMobile ? "mb-6 rounded-lg" : "mb-10 mt-20 sm:mb-12 rounded-xl"
                  } h-[62vh] sm:h-[66vh] `}
                  style={{
                    zIndex: 10,
                    transition: "box-shadow 250ms ease"
                  }}
                >
                  <img
                    className='w-full h-full object-cover drop-shadow-xl md:drop-shadow-2xl'
                    style={{
                      position: "relative",
                      zIndex: 10,
                      filter: "drop-shadow(0px 16px 40px rgba(0, 0, 0, 0.65))",
                      transition: "filter 200ms ease",
                    }}
                    src={project.image}
                    alt={project.title}
                    loading='lazy'
                  />
                  <div
                    className='pointer-events-none absolute inset-0'
                    style={{
                      zIndex: 10,
                      background: "linear-gradient(180deg, rgba(0,0,0,0.12) 0%, rgba(0, 0, 0, 0) 40%)"
                    }}
                  ></div>
                </div>
              </div>
            ))
          }
        </div>

        <div className={`absolute ${isMobile ? "bottom-20" : "bottom-2"} z-50`}>
          <a
            target='_blank'
            rel='noopener noreferrer'
            className='inline-block px-6 py-3 font-semibold rounded-lg bg-white text-black hover:bg-gray-200 transition-all'
            aria-label={`view ${activeProject?.title}`}
            href={activeProject?.link}
          >View Project</a>
        </div>
      </div>
    </section>
  )
}

export default Projects