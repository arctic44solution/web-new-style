"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const IMAGE_URL =
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop";
const IMAGE_URL_2 =
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=400&auto=format&fit=crop";
const IMAGE_URL_3 =
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=400&auto=format&fit=crop";

const words = [
  { text: "IN", break: false },
  { text: "A", break: false },
  { text: "WORLD", break: false },
  { text: "FILLED", break: true },
  { text: "WITH", break: false },
  { text: "GENERIC", break: false },
  { text: "AI", break: false },
  { text: "NOISE,", break: false, hasImage: true },
  { text: "I", break: false },
  { text: "HELP", break: true },
  { text: "BRANDS", break: false },
  { text: "UNCOVER", break: true },
  { text: "THEIR", break: false },
  { text: "WHY", break: false, hasImage: true, imageUrl: IMAGE_URL_2 },
  { text: "AND", break: true },
  { text: "SCALE", break: false },
  { text: "IT", break: false },
  { text: "WITH", break: true },
  { text: "CREATIVITY", break: false, hasImage: true, imageUrl: IMAGE_URL_3, earlyExpand: true },
  { text: "AND", break: true },
  { text: "TECHNOLOGY", break: false },
  { text: "DRIVEN", break: false },
  { text: "BY", break: false },
  { text: "STRATEGY.", break: false },
];

// ─── Word component ───────────────────────────────────────────────────────────
interface WordProps {
  text: string;
  hasImage?: boolean;
  imageUrl?: string;
  earlyExpand?: boolean;
  progress: MotionValue<number>;
  range: [number, number];
}

const Word = ({ text, hasImage, imageUrl = IMAGE_URL, earlyExpand, progress, range }: WordProps) => {
  const color = useTransform(
    progress,
    range,
    ["rgba(255,255,255,0.15)", "rgba(255,255,255,1)"]
  );

  const imageStart = earlyExpand ? range[0] - 0.15 : range[0];
  const imageEnd = earlyExpand ? range[0] : range[1];

  const imageWidth = useTransform(progress, [imageStart, imageEnd], [0, 140]);
  const imageOpacity = useTransform(progress, [imageStart, imageEnd], [0, 1]);

  return (
    <span className="inline-flex items-center">
      <motion.span style={{ color }}>
        {text}
      </motion.span>

      {hasImage && (
        <motion.span
          style={{
            width: imageWidth,
            opacity: imageOpacity,
            height: "clamp(55px, 8vw, 100px)",
            borderRadius: "8px",
            overflow: "hidden",
            flexShrink: 0,
            display: "inline-block",
            marginLeft: "0.3em",
            marginRight: "0.1em",
            verticalAlign: "middle",
            position: "relative",
            top: "-2px",
            // ADDED: center-expand effect
            transformOrigin: "center center",
          }}
        >
          <img
            src={imageUrl}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </motion.span>
      )}
    </span>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────
const InteractiveText = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const totalWords = words.length;

  const rows: (typeof words[0] & { index: number })[][] = [];
  let currentRow: (typeof words[0] & { index: number })[] = [];

  words.forEach((w, i) => {
    currentRow.push({ ...w, index: i });
    if (w.break || i === words.length - 1) {
      rows.push(currentRow);
      currentRow = [];
    }
  });

  return (
    <div ref={containerRef} style={{ height: "250vh", background: "#000" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "120px 40px 0",
          overflow: "hidden",
        }}
      >
        <motion.h1
          style={{
            y,
            fontFamily: "'Arial Black', 'Arial', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(40px, 6.5vw, 62px)",
            lineHeight: 1.1,
            textTransform: "uppercase",
            textAlign: "center",
            letterSpacing: "-0.01em",
            maxWidth: "850px",
          }}
        >
          {rows.map((row, ri) => (
            <span
              key={ri}
              style={{ display: "block", marginBottom: "0.05em" }}
            >
              {row.map((w) => {
                const start = w.index / totalWords;
                const end = (w.index + 1) / totalWords;

                return (
                  <span key={w.index} style={{ marginRight: "0.22em" }}>
                    <Word
                      text={w.text}
                      hasImage={w.hasImage}
                      imageUrl={(w as any).imageUrl}
                      earlyExpand={(w as any).earlyExpand}
                      progress={scrollYProgress}
                      range={[start, end]}
                    />
                  </span>
                );
              })}
            </span>
          ))}
        </motion.h1>
      </div>
    </div>
  );
};

export default InteractiveText;