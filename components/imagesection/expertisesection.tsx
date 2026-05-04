"use client";
import { useEffect, useRef, useState } from "react";
// 1. Framer Motion import කරගන්න
import { motion, useScroll, useTransform } from "framer-motion";

// --- ScrambledText Component එක එලෙසම පවතී ---
const ScrambledText = ({ text, isJapanese = false }: { text: string; isJapanese?: boolean }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = isJapanese 
    ? "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン0123456789"
    : "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()";
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scramble = () => {
    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDisplayText((prev) =>
        text.split("").map((char, index) => {
          if (index < iteration) return text[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("")
      );
      if (iteration >= text.length) if (intervalRef.current) clearInterval(intervalRef.current);
      iteration += 1 / 3;
    }, 30);
  };

  return (
    <span onMouseEnter={scramble} style={{ cursor: "default", display: "inline-block" }}>
      {displayText}
    </span>
  );
};

export default function ExpertiseSection() {
  const textRef = useRef<HTMLSpanElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [animationComplete, setAnimationComplete] = useState(false);

  // 2. Scroll Animation සඳහා අවශ්‍ය Hooks
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"], // Section එක පෙනෙන්න පටන් ගත් විට ආරම්භ වේ
  });

  // Scroll කරන විට Scale එක 1.5 සිට 1 දක්වා අඩු වේ (Zoom out)
  const scale = useTransform(scrollYProgress, [0, 0.4], [1.5, 1]);
  // මදක් පැහැදිලි වීමට opacity එකත් වෙනස් කළ හැක
  const opacity = useTransform(scrollYProgress, [0, 0.0], [0, 1]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest >= 0.4 && !animationComplete) {
        setAnimationComplete(true);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, animationComplete]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (!textRef.current) return;
      const rect = section.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const offsetX = ((e.clientX - centerX) / (rect.width / 2)) * -40;
      const offsetY = ((e.clientY - centerY) / (rect.height / 2)) * -20;
      textRef.current.style.transform = `translateX(${offsetX}px) translateY(${offsetY}px)`;
    };
    section.addEventListener("mousemove", handleMouseMove);
    return () => section.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700&display=swap');
      `}</style>
      
      <section
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          background: "#000",
          color: "#fff",
          width: "100%",
          overflow: "hidden",
        }}
      >
        {/* Header Header Bar  */}
        <div style={{ background: "#000", maxWidth: "1400px", margin: "0 auto", padding: "60px 40px 32px 40px", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
           <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <p style={{ fontSize: "13px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#ffffff", margin: 0, fontWeight: 600, fontFamily: "'Barlow Condensed', sans-serif" }}>MY EXPERTISE</p>
            <p style={{ fontSize: "28px", margin: 0, fontWeight: 700, letterSpacing: "0.05em", color: "#ffffff", fontFamily: "'Barlow Condensed', sans-serif" }}>
              <ScrambledText text="専門分野" isJapanese={true} />
            </p>
          </div>
          <div style={{ maxWidth: "620px", textAlign: "right" }}>
            <h2 style={{ fontSize: "clamp(36px, 5.5vw, 72px)", fontWeight: 400, lineHeight: 0.92, textTransform: "uppercase", margin: 0, letterSpacing: "0.04em" }}>
              CRAFTING DIGITAL<br />EXPERIENCES THROUGH<br />VISION, DESIGN, AND AI
            </h2>
          </div>
        </div>

        {/* Main Orange Section */}
        <div
          ref={sectionRef}
          style={{
            position: "relative",
            background: "#E84000",
            minHeight: "580px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          {/* Giant Japanese Kanji background */}
          <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", display: "flex", alignItems: "flex-end" }}>
            <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
              <span ref={textRef} style={{ fontSize: "clamp(200px, 35vw, 500px)", fontWeight: 900, color: "rgb(0, 0, 0)", lineHeight: 1, fontFamily: "serif", userSelect: "none", whiteSpace: "nowrap", transition: "transform 0.18s ease-out", display: "inline-block" }}>
                ビジョン
              </span>
            </div>
          </div>

          {/* 3. මෙන්න මෙතන තමයි Animation එක වෙන්නේ - Robot / Hero Image */}
          <motion.div 
            style={{ 
              position: "absolute", 
              top: 0, 
              left: "50%", 
              x: "-50%", // Framer motion වල transform: translateX වෙනුවට x භාවිතා කරයි
              width: "550px", 
              height: "100%", 
              display: "flex", 
              alignItems: "flex-start", 
              justifyContent: "center", 
              zIndex: 2,
              scale: animationComplete ? 1 : scale,
              opacity: 1,
            }}
          >
            <img
              src="/assest/image/img1.png"
              alt="AI Robot"
              style={{ width: "100%", height: "100%", objectFit: "cover", mixBlendMode: "luminosity" }}
              onError={(e) => (e.currentTarget.parentElement!.style.display = "none")}
            />
          </motion.div>

          {/* Bottom label */}
          <div style={{ position: "relative", zIndex: 3, maxWidth: "1400px", margin: "0 auto", padding: "0 40px 32px 40px", width: "100%", boxSizing: "border-box" }}>
            <p style={{ fontSize: "20px", fontWeight: 600, color: "#fff", margin: "0 0 4px 0", letterSpacing: "0.1em", fontFamily: "'Barlow Condensed', sans-serif" }}>// 01</p>
            <h3 style={{ fontSize: "clamp(38px, 9vw, 120px)", fontWeight: 400, color: "#fff", margin: 0, lineHeight: 1, textTransform: "uppercase", letterSpacing: "0.04em" }}>
              <ScrambledText text="ARTIFICIAL INTELLIGENCE" />
            </h3>
          </div>
        </div>
      </section>
    </>
  );
}