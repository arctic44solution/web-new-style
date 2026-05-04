"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";

// Number Counter Component
const Counter = ({ value }: { value: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value);
      const duration = 2; // seconds
      let startTime: number | null = null;

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - (startTime as number)) / (duration * 1000), 1);
        setCount(Math.floor(progress * (end - start) + start));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, value]);

  return <span ref={ref}>{count}<sup className="text-4xl md:text-5xl align-super">+</sup></span>;
};

export default function StatsSection() {
  const containerRef = useRef(null);
  
  // Scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Left ani Right movement sathi transforms
  const xLeftRaw = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const xRightRaw = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const xLeft = useSpring(xLeftRaw, { stiffness: 40, damping: 20, mass: 1 });
  const xRight = useSpring(xRightRaw, { stiffness: 40, damping: 20, mass: 1 });

  const stats = [
    { number: "85", label: "Brands Directed", direction: "left" },
    { number: "18", label: "Different Sectors Served", direction: "right" },
    { number: "500", label: "Creative Deployments", direction: "left" },
    { number: "16", label: "Years of Vision", direction: "right" },
  ];

  return (
    <section 
      ref={containerRef} 
      className="bg-[#E84000] min-h-screen pt-10 pb-20 overflow-hidden flex flex-col justify-center font-sans"
    >
      <div className="w-full px-8">
        {stats.map((item, index) => (
          <motion.div
            key={index}
            style={{ x: item.direction === "left" ? xLeft : xRight, marginBottom: index === stats.length - 1 ? "0" : "4rem" }}
            className={`flex items-center justify-center gap-8 border-b border-black/10 ${index === stats.length - 1 ? "pb-0" : "pb-10"}`}
          >
            <h2 className="text-8xl md:text-9xl font-bold text-black">
              <Counter value={item.number} />
            </h2>
            <p className="text-3xl md:text-5xl font-medium text-black/80 leading-tight text-right">
              {item.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}