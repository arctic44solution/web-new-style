"use client";

import { useEffect, useRef, useState } from "react";
import Footer from '../footer';
import FeatureNavbar from './featuredworknavbar';

export default function ArmadaCaseStudy() {
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Mouse position and hover image tracking for More Work section
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Animation for cursor-following image
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

  return (
    <main className="armada-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&family=Space+Mono:wght@400;700&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        :root {
          --black: #0a0a0a;
          --dark: #111111;
          --orange: #E8450A;
          --orange-light: #FF5A1F;
          --white: #f5f5f5;
          --muted: #666666;
          --border: rgba(255,255,255,0.08);
        }

        .armada-page {
          background: var(--black);
          color: var(--white);
          font-family: 'Barlow Condensed', sans-serif;
          overflow-x: hidden;
        }

        /* HERO */
        .hero {
          min-height: 50vh;
          padding: 180px 40px 80px;
          position: relative;
        }

        .hero-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(80px, 10vw, 150px);
          line-height: 0.9;
          letter-spacing: 0.03em;
          color: var(--white);
          overflow: hidden;
        }

        .hero-title-inner {
          display: block;
          transform: translateY(100%);
          animation: slideUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
        }

        @keyframes slideUp {
          to { transform: translateY(0); }
        }

        /* HERO META - Updated to match image */
        .hero-meta {
          display: grid;
          grid-template-columns: 240px 1fr auto;
          align-items: end;
          margin-top: 40px;
          opacity: 0;
          animation: fadeIn 0.7s ease 0.8s forwards;
        }

        @keyframes fadeIn {
          to { opacity: 1; }
        }

        .meta-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 8px;
        }

        .meta-value {
          font-family: 'DM Sans', sans-serif;
          font-size: 16px;
          color: var(--white);
          font-weight: 400;
        }

        .meta-tags {
          display: flex;
          gap: 12px;
        }

        .tag {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          padding: 6px 16px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 100px;
          color: var(--white);
          font-weight: 400;
        }

        /* FULL WIDTH IMAGE */
        .full-image {
          width: 100%;
          aspect-ratio: 16/9;
          overflow: hidden;
          position: relative;
          background: #1a1a1a;
        }

        .full-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.8s ease;
        }

        .full-image:hover img {
          transform: scale(1.02);
        }

        /* CONTENT SECTION */
        .content-section {
          padding: 100px 40px;
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 80px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .section-label {
          font-family: 'Barlow Condensed', monospace;
          font-size: 25px;
          color: var(--white);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding-top: 8px;
        }

        .section-body h2 {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: clamp(12px, 2vw, 28px);
          font-weight: 400;
          line-height: 1.45;
          margin-bottom: 36px;
          color: var(--white);
        }

        .section-body p {
          font-size: 20px;
          line-height: 1.75;
          color: var(--white);
          margin-bottom: 24px;
        }

        .section-body strong {
          color: var(--white);
          font-weight: 500;
        }

        .section-body ul {
          list-style: none;
          margin-top: 16px;
        }

        .section-body ul li {
          font-size: 14px;
          color: #999;
          padding: 8px 0;
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .section-body ul li::before {
          content: '';
          width: 6px;
          height: 6px;
          background: var(--orange);
          border-radius: 50%;
          flex-shrink: 0;
        }

        /* BRAND CARD - Dark rounded */
        .brand-logo-image {
          margin: 0 90px;
          border-radius: 16px;
          overflow: hidden;
          background: #111;
          border: 1px solid var(--border);
        }


        /* REVEAL ANIMATION */
        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }

        .reveal.in-view {
          opacity: 1;
          transform: translateY(0);
        }

        /* DIVIDER LINE */
        .divider {
          height: 1px;
          background: var(--border);
          margin: 0 40px;
        }

        /* MORE WORK SECTION */
        .more-work-section {
          padding: 80px 40px;
          background: #006699;
          position: relative;
        }

        .more-work-inner {
          max-width: 1400px;
          margin: 0 auto;
        }

        .more-work-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(26px, 3vw, 24px);
          color: var(--black);
          margin-bottom: 40px;
          letter-spacing: 0.03em;
        }

        .work-list {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .work-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 0;
          border-bottom: 1px solid rgb(0, 0, 0);
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: padding-left 0.35s ease;
        }

        .work-item::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 0;
          background: var(--black);
          transition: width 0.5s cubic-bezier(0.76, 0, 0.24, 1);
          z-index: 0;
        }

        .work-item:hover::before {
          width: 100%;
        }

        .work-item:hover {
          padding-left: 20px;
        }

        .work-num {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #010101;
          min-width: 28px;
          position: relative;
          z-index: 1;
          transition: color 0.25s;
        }

        .work-item:hover .work-num {
          color: rgb(255, 255, 255);
        }

        .work-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(28px, 4vw, 48px);
          color: var(--black);
          flex: 1;
          margin-left: 24px;
          position: relative;
          z-index: 1;
          transition: color 0.25s;
        }

        .work-item:hover .work-name {
          color: #ffffff;
        }

        .work-tag {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #000000;
          border: 1px solid #000000;
          padding: 5px 14px;
          border-radius: 100px;
          position: relative;
          z-index: 1;
          transition: all 0.25s;
        }

        .work-item:hover .work-tag {
          color: rgb(255, 255, 255);
          border-color: rgb(255, 255, 255);
        }

        /* Hover Image Styling */
        .work-hover-image {
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

        .work-hover-image.active {
          opacity: 1;
          transform: translate(150px, -50%) scale(1);
        }

        .work-hover-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 8px;
        }

        @media (max-width: 768px) {
          .hero { padding: 140px 20px 60px; }
          
          /* Updated responsive styles for hero-meta */
          .hero-meta { 
            grid-template-columns: 1fr 1fr; 
            gap: 24px; 
            align-items: start; 
          }
          .meta-tags { 
            grid-column: 1 / -1; 
            flex-wrap: wrap; 
          }
          
          .content-section { grid-template-columns: 1fr; gap: 20px; padding: 80px 20px; }
          .brand-grid { grid-template-columns: 1fr; margin: 0 20px; padding: 30px; }
          .brand-card { margin: 0 20px; }
          .mockup-row { grid-template-columns: 1fr; margin: 2px 20px; }
          .logo-reveal { grid-template-columns: 1fr; padding: 60px 20px; }
          .footer-top { grid-template-columns: 1fr 1fr; }
          .result-section { grid-template-columns: 1fr; gap: 20px; padding: 60px 20px; }
          .navbar { padding: 16px 20px; }
          .divider { margin: 0 20px; }
          
          .more-work-section { padding: 60px 20px; }
          .work-name { font-size: clamp(24px, 6vw, 36px); }
        }
      `}</style>

      <FeatureNavbar />

      {/* HERO */}
      <section className="hero" ref={heroRef}>
        <h1 className="hero-title">
          <span className="hero-title-inner">ARMADA</span>
        </h1>
        <div className="hero-meta">
          <div>
            <p className="meta-label">Year</p>
            <p className="meta-value">2025</p>
          </div>
          <div>
            <p className="meta-label">Client</p>
            <p className="meta-value">Armada Construction Group</p>
          </div>
          <div className="meta-tags">
            <span className="tag">Branding</span>
            <span className="tag">Graphic Design</span>
            <span className="tag">Web Design</span>
          </div>
        </div>
      </section>

      {/* LAPTOP MOCKUP 1 */}
      <div className="laptop-mockup reveal">
        <img src="/assest/image/armada/armada1.png" alt="Armada" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>

      {/* CHALLENGE SECTION */}
      <section className="content-section reveal">
        <div>
          <p className="section-label">The Challenge</p>
        </div>
        <div className="section-body">
          <h2>
            Armada Construction Group, a bold new force in the heavy construction
            industry, needed a brand that could command attention while staying
            grounded in grit, precision, and professionalism.
          </h2>
          <p>
            With a name rooted in power and unity, the visual identity had to evoke strength,
            reliability, and forward momentum. The goal was to develop a brand that felt modern
            yet built for legacy — something that could scale across worksites, gear, digital
            platforms, and public perception.
          </p>
          <p>
            From logo to hardhat, every touchpoint was an opportunity to redefine what modern
            construction branding could look like.
          </p>
        </div>
      </section>

      {/* HELMET SECTION */}
      <div className="reveal">
        <img src="/assest/image/armada/armada2.png" alt="Armada Construction" style={{ width: "100%", height: "auto", display: "block" }} />
      </div>

      {/* LOGO DESIGN SECTION */}
      <section className="content-section reveal">
        <div>
          <p className="section-label">Logo Design</p>
        </div>
        <div className="section-body">
          <p>
            The Armada logo is an emblem of strength, movement, and cohesion. The stylized "A" icon
            represents a forward-driving force — leaning into progress with bold symmetry. It's built
            for recognition, even at a distance, whether it's stamped on a jobsite trailer or stitched
            onto a uniform.
          </p>
          <p>
            The wordmark uses custom, angular typography designed to mirror the structural integrity of
            steelwork and the deliberate force of industrial machinery. Set in clean white against punchy
            orange or matte black, it reflects clarity and confidence.
          </p>
          <p><strong>The full identity system includes:</strong></p>
          <ul>
            <li>Primary and secondary logos</li>
            <li>Hardhat and gear applications</li>
            <li>Construction signage</li>
            <li>Digital and print consistency</li>
          </ul>
        </div>
      </section>

      {/* BRAND LOGO DISPLAY */}
      <div className="brand-logo-image">
        <div className="brand-logo-display">
            <img src="/assest/image/armada/armada3.png" alt="Armada Logo"/>
        </div>
      </div>
      <div style={{ marginTop: "2px" }} />

      {/* BRAND GRID */}
      <div className="brand-logo-image" style={{ marginTop: "40px" }}>
        <div className="brand-logo-display">
            <img src="/assest/image/armada/armada4.png" alt="Brand Grid"/>
        </div>
      </div>

      {/* LAPTOP 2 - Orange */}
      <div className="brand-logo-image" style={{ marginTop: "30px" }}>
        <div className="brand-logo-display">
            <img src="/assest/image/armada/armada5.png" alt="Laptop Image"/>
        </div>
      </div>

      {/* BRAND GUIDELINES SECTION */}
      <section className="content-section reveal">
        <div>
          <p className="section-label">Brand Guidelines & Stationery</p>
        </div>
        <div className="section-body">
          <p>
            Armada's brand voice is assertive and to the point. Headlines like "From Dirt to Done" and
            "Build Bold. Build with Armada." speak to an audience that values execution over excuses.
          </p>
          <p>
            Visually, the palette leans on <strong>safety orange</strong> and <strong>industrial black</strong>,
            balancing high-visibility practicality with design-forward edge. Bold typography, hard shadows,
            and desaturated imagery create a no-nonsense aesthetic that still feels premium.
          </p>
          <p>
            Photography direction focused on real moments — boots on the ground, steel in hand, sweat and
            resolve on display. The brand doesn't talk about hard work. It shows it.
          </p>
        </div>
      </section>

      {/* MOCKUP ITEMS */}
      
      <div className="brand-logo-image" style={{ marginTop: "30px" }}>
        <div className="brand-logo-display">
            <img src="/assest/image/armada/armada6.png" alt="Tshirt Image"/>
        </div>
      </div>

        <div className="brand-logo-image" style={{ marginTop: "30px" }}>
        <div className="brand-logo-display">
            <img src="/assest/image/armada/armada7.png" alt="Keyboard Image"/>
        </div>
      </div>

        <div className="brand-logo-image" style={{ marginTop: "30px" }}>
        <div className="brand-logo-display">
            <img src="/assest/image/armada/armada8.png" alt="Military Image"/>
        </div>
      </div>

      {/* LOGO FINAL REVEAL */}
      
        <div className="laptop-mockup reveal">
        <img src="/assest/image/armada/armada9.png" alt="Another" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", marginTop: "20px" }} />
      </div>

        <div className="brand-logo-image" style={{ marginTop: "10px" }}>
        <div className="brand-logo-display">
            <img src="/assest/image/armada/armada10.png" alt="whight Image"/>
        </div>
      </div>


      {/* RESULT SECTION */}
      <section className="content-section reveal">
        <div>
          <p className="section-label">The Result</p>
        </div>
        <div className="section-body">
          <p>
            Armada now stands as more than a construction company — it's a recognizable force. The brand
            system unifies every touchpoint, from field crews to client presentations, under a single, bold
            visual flag. It's tough, distinct, and ready to scale with the company's ambition.
          </p>
        </div>
      </section>

      {/* MORE WORK SECTION */}
      <section className="more-work-section" ref={containerRef} onMouseMove={handleMouseMove}>
        <div className="more-work-inner">
          <h2 className="more-work-title">Other Work</h2>
          <div className="work-list">
            <div 
              className="work-item"
              onMouseEnter={() => setActiveImage("/assest/image/wildflower/wildflower.png")}
              onMouseLeave={() => setActiveImage(null)}
            >
              <span className="work-num">01</span>
              <span className="work-name">Wild Flower</span>
              <span className="work-tag">Web Design</span>
            </div>
            <div 
              className="work-item"
              onMouseEnter={() => setActiveImage("https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=400")}
              onMouseLeave={() => setActiveImage(null)}
            >
              <span className="work-num">02</span>
              <span className="work-name">Zenith VR</span>
              <span className="work-tag">Product</span>
            </div>
          </div>
        </div>
        
        {/* Hover Image */}
        <div 
          ref={imageRef}
          className={`work-hover-image ${activeImage ? 'active' : ''}`}
          style={{
            display: activeImage ? 'flex' : 'none'
          }}
        >
          {activeImage && (
            <img src={activeImage} alt="Project preview" />
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}