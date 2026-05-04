"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// --- අකුරු මාරුවන Animation එක සඳහා Component එක ---
// isJapanese prop එකෙන් අහඹු ලෙස මාරු වන අකුරු වලට ජපන් අකුරු එකතු කරනවා
const ScrambledText = ({ text, isJapanese = false }: { text: string; isJapanese?: boolean }) => {
  const [displayText, setDisplayText] = useState(text);
  
  // භාෂාව අනුව මාරු විය යුතු අකුරු තෝරා ගැනීම
  const chars = isJapanese 
    ? "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン0123456789"
    : "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()";

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scramble = () => {
    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return text[index]; // නියම අකුර පෙන්වයි
            }
            return chars[Math.floor(Math.random() * chars.length)]; // අහඹු අකුරක් පෙන්වයි
          })
          .join("")
      );

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }

      iteration += 1 / 3;
    }, 30);
  };

  return (
    <span onMouseEnter={scramble} style={{ cursor: "default", display: "inline-block" }}>
      {displayText}
    </span>
  );
};

export default function CreativeSection() {
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
          fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
          background: "#000",
          color: "#fff",
          width: "100%",
          overflow: "hidden",
        }}
      >

        {/* White Divider Line */}
        <div style={{ width: "100%", height: "1px", background: "#fff", opacity: 0.3 }} />

        {/* MY EXPERTISE Bar */}
        <div style={{ background: "#000000", width: "100%", padding: "14px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", boxSizing: "border-box" }}>
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "18px", color: "#fff", letterSpacing: "0.15em" }}>MY EXPERTISE</span>
          <span style={{ fontFamily: "serif", fontSize: "18px", color: "#fff", letterSpacing: "0.1em" }}>専門分野</span>
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
          <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
              <span
                ref={textRef}
                style={{
                  fontSize: "clamp(200px, 35vw, 500px)",
                  fontWeight: 900,
                  color: "rgb(0, 0, 0)",
                  lineHeight: 1,
                  fontFamily: "serif",
                  userSelect: "none",
                  whiteSpace: "nowrap",
                  transition: "transform 0.18s ease-out",
                  display: "inline-block",
                  willChange: "transform",
                }}
              >
                代表作
              </span>
          </div>

          {/* Robot / Hero Image */}
          {/* 3. මෙන්න මෙතන තමයි Animation එක වෙන්නේ - Robot / Hero Image */}
          <motion.div 
            style={{ 
              position: "absolute", 
              top: 0, 
              left: "50%", 
              x: "-50%", // Framer motion වල transform: translateX වෙනුවට x භාවිතා කරයි
              width: "780px", 
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
              src="/assest/image/img2.png"
              alt="AI Robot"
              style={{ width: "100%", height: "100%", objectFit: "cover", mixBlendMode: "luminosity" }}
              onError={(e) => (e.currentTarget.parentElement!.style.display = "none")}
            />
          </motion.div>

          {/* Bottom label: // 02 + CREATIVE LEADERSHIP */}
          <div style={{ position: "relative", zIndex: 3, maxWidth: "1400px", margin: "0 auto", padding: "0 40px 32px 40px", width: "100%", boxSizing: "border-box" }}>
            <p style={{ fontSize: "20px", fontWeight: 600, color: "#fff", margin: "0 0 4px 0", letterSpacing: "0.1em", fontFamily: "'Barlow Condensed', sans-serif" }}>
              // 02
            </p>
            <h3
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(38px, 9vw, 120px)",
                fontWeight: 400,
                color: "#fff",
                margin: 0,
                lineHeight: 1,
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              {/* --- මෙතන CREATIVE LEADERSHIP සඳහා Animation එක --- */}
              <ScrambledText text="CREATIVE LEADERSHIP" />
            </h3>
          </div>
        </div>
      </section>
    </>
  );
}