"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

const ScrambledText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン0123456789";
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scramble = () => {
    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDisplayText(
        text.split("").map((_, index) =>
          index < iteration ? text[index] : chars[Math.floor(Math.random() * chars.length)]
        ).join("")
      );
      if (iteration >= text.length) clearInterval(intervalRef.current!);
      iteration += 1 / 3;
    }, 30);
  };

  return <span onMouseEnter={scramble} style={{ cursor: "default" }}>{displayText}</span>;
};

export default function FeaturedWorkSection() {
  // Mouse position එක සහ දැනට hover කරලා තියෙන image එක track කිරීමට
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const animate = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.08;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.08;
      if (imageRef.current) {
        imageRef.current.style.left = `${pos.current.x}px`;
        imageRef.current.style.top = `${pos.current.y}px`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mouse.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  const router = useRouter();

  const projects = [
    { num: "01", name: "Armada", tag: "Branding", img: "/assest/image/armada/armada7.png", href: "/armada" },
    { num: "02", name: "Wild Flower", tag: "Web Design", img: "/assest/image/wildflower/wildflower.png", href: "/wildflower" },
    { num: "03", name: "Zenith VR", tag: "Product", img: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=400", href: "/zenithvr" },
    { num: "04", name: "Mayfield", tag: "Strategy", img: "/assest/image/mayfield/mayfield.png", href: "/mayfield" },
    { num: "05", name: "Eden Exotics", tag: "AI Design", img: "/assest/image/edenexotics/edenexotics.png", href: "/edenexotics" },
    { num: "06", name: "OSO", tag: "Art Direction", img: "/assest/image/oso/oso.png", href: "/oso" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700&display=swap');

        .fw-section {
          background: #000000;
          width: 100%;
          min-height: 100vh;
          font-family: 'Barlow Condensed', sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* Hover Image Styling */
        .fw-hover-image {
          position: absolute;
          width: 280px;
          height: 180px;
          pointer-events: none;
          z-index: 10;
          overflow: hidden;
          border-radius: 10px;
          transform: translate(500px, -50%) scale(0.88);
          transition: opacity 0.45s cubic-bezier(0.4, 0, 0.2, 1), transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .fw-hover-image.active {
          opacity: 1;
          transform: translate(150px, -50%) scale(1);
        }

        .fw-hover-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Existing Styles ... */
        .fw-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.06'/%3E%3C/svg%3E");
          opacity: 0.3;
          pointer-events: none;
          z-index: 0;
        }

        .fw-inner {
          position: relative;
          z-index: 1;
          max-width: 1400px;
          margin: 0 auto;
          padding: 60px 40px 80px;
        }

        .fw-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 70px;
          gap: 40px;
        }

        .fw-header-left {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .fw-label {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #ffffff;
          opacity: 0;
          transform: translateY(10px);
          animation: fwFadeUp 0.5s ease forwards 0.2s;
        }

        .fw-kanji {
          font-size: 28px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 0.05em;
          opacity: 0;
          transform: translateY(10px);
          animation: fwFadeUp 0.5s ease forwards 0.35s;
        }

        .fw-headline {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(36px, 5.5vw, 72px);
          line-height: 0.92;
          letter-spacing: 0.04em;
          color: #ffffff;
          max-width: 620px;
          text-align: left;
          opacity: 0;
          transform: translateY(16px);
          animation: fwFadeUp 0.6s ease forwards 0.4s;
        }

        .fw-divider {
          width: 100%;
          height: 1px;
          background: rgba(255,255,255,0.15);
        }

        .fw-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .fw-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 28px 0;
          border-bottom: 1px solid rgba(255,255,255,0.12);
          cursor: pointer;
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateY(20px);
          transition: padding-left 0.35s ease, border-color 0.3s ease;
        }

        .fw-item:nth-child(1) { animation: fwFadeUp 0.5s ease forwards 0.5s; }
        .fw-item:nth-child(2) { animation: fwFadeUp 0.5s ease forwards 0.62s; }
        .fw-item:nth-child(3) { animation: fwFadeUp 0.5s ease forwards 0.74s; }
        .fw-item:nth-child(4) { animation: fwFadeUp 0.5s ease forwards 0.86s; }
        .fw-item:nth-child(5) { animation: fwFadeUp 0.5s ease forwards 0.98s; }
        .fw-item:nth-child(6) { animation: fwFadeUp 0.5s ease forwards 1.1s; }

        .fw-item::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 0;
          background: #E84A00;
          transition: width 0.5s cubic-bezier(0.76, 0, 0.24, 1);
          z-index: 0;
        }

        .fw-item:hover::before { width: 100%; }
        .fw-item:hover { padding-left: 20px; border-bottom-color: #E84A00; }

        .fw-item-left {
          display: flex;
          align-items: center;
          gap: 24px;
          position: relative;
          z-index: 1;
        }

        .fw-num {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: #555;
          min-width: 28px;
          transition: color 0.25s;
        }

        .fw-item:hover .fw-num { color: rgba(0,0,0,0.45); }

        .fw-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(38px, 5vw, 64px);
          letter-spacing: 0.03em;
          color: #ffffff;
          line-height: 1;
          transition: color 0.25s;
        }

        .fw-item:hover .fw-name { color: #000000; }

        .fw-item-right {
          display: flex;
          align-items: center;
          gap: 20px;
          position: relative;
          z-index: 1;
        }

        .fw-tag {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #555;
          border: 1px solid #333;
          padding: 5px 14px;
          border-radius: 100px;
          display: none;
        }

        .fw-item:hover .fw-tag {
          display: block;
          color: rgba(0, 0, 0, 0.85);
          border-color: rgba(0,0,0,0.25);
        }

        .fw-arrow {
          width: 44px;
          height: 44px;
          border: 1px solid rgb(255, 255, 255);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.25s, border-color 0.25s, transform 0.25s;
          flex-shrink: 0;
        }

        .fw-item:hover .fw-arrow {
          background: #000000;
          border-color: #000000;
          transform: rotate(45deg);
        }

        .fw-item:hover .fw-arrow svg path { stroke: #ffffff; }

        @keyframes fwFadeUp {
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 600px) {
          .fw-inner { padding: 40px 20px 60px; }
          .fw-header { flex-direction: column; gap: 20px; }
          .fw-headline { text-align: left; font-size: 36px; }
          .fw-tag { display: none !important; }
          .fw-hover-image { display: none; } /* Mobile වලදී image එක hide කිරීම */
        }
      `}</style>

      <section className="fw-section" ref={containerRef} onMouseMove={handleMouseMove}>
        
        {/* Floating Image Component */}
        <div 
          ref={imageRef}
          className={`fw-hover-image ${activeImage ? 'active' : ''}`}
        >
          {activeImage && <img src={activeImage} alt="Preview" />}
        </div>

        <div className="fw-inner">
          <div className="fw-header">
            <div className="fw-header-left">
              <span className="fw-label">Featured Work</span>
              <span className="fw-kanji"><ScrambledText text="代表作" /></span>
            </div>
            <h2 className="fw-headline">Selected Work Shaping Brands, Products, and Experiences</h2>
          </div>

          <div className="fw-divider"></div>

          <ul className="fw-list">
            {projects.map((item) => (
              <li 
                className="fw-item" 
                key={item.num}
                onMouseEnter={() => setActiveImage(item.img)}
                onMouseLeave={() => setActiveImage(null)}
                onClick={() => item.href && router.push(item.href)}
              >
                <div className="fw-item-left">
                  <span className="fw-num">{item.num}</span>
                  <span className="fw-name">{item.name}</span>
                </div>
                <div className="fw-item-right">
                  <span className="fw-tag">{item.tag}</span>
                  <div className="fw-arrow">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 13L13 3M13 3H5M13 3V11" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}