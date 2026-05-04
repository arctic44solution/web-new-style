"use client";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";

export default function HeroSection() {
  const targetRef = useRef(null);
  const [imageOnTop, setImageOnTop] = useState(false);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end end"],
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.8]);
  const imageOpacity = useTransform(scrollYProgress, [0.3, 0.7], [0, 1]);
  const imageY = useTransform(scrollYProgress, [0.3, 0.7], [80, 0]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setImageOnTop(v >= 0.35);
  });

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">

        <motion.div
          style={{ opacity: textOpacity, scale: textScale }}
          className={`absolute text-center ${imageOnTop ? "z-0" : "z-10"}`}
        >
          <h1 className="text-6xl md:text-9xl font-bold text-zinc-500 leading-tight">
            CREATIVE <br /> DIRECTOR
          </h1>
        </motion.div>

        <motion.div
          style={{ opacity: imageOpacity, y: imageY }}
          className={`relative w-full max-w-sm px-4 ${imageOnTop ? "z-10" : "z-0"}`}
        >
          <img
            src="/assest/image/img6.png"
            alt="Portrait"
            className="w-full h-auto rounded-lg shadow-2xl"
          />
        </motion.div>

      </div>
    </section>
  );
}
