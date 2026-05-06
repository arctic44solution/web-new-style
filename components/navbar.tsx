"use client";

import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setVisible(currentY < lastScrollY.current || currentY < 80);
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>{`
        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 28px 40px;
          transition: transform 0.4s ease, opacity 0.4s ease;
        }
        .navbar.hidden {
          transform: translateY(-100%);
          opacity: 0;
          pointer-events: none;
        }

        .logo { width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; }
        .logo svg { width: 100%; height: 100%; }

        .nav-right { display: flex; align-items: center; gap: 20px; }

        .connect-btn {
          background: transparent;
          border: 1.5px solid rgba(0,0,0,0.7);
          color: #0a0a0a;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 10px 22px;
          border-radius: 100px;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .connect-btn:hover { background: #0a0a0a; color: #ffffff; }

        .menu-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          gap: 5px;
          padding: 4px;
          z-index: 110;
          position: relative;
        }
        .menu-btn span {
          display: block;
          width: 26px;
          height: 2px;
          background: #000000;
          transition: transform 0.3s ease, opacity 0.3s ease;
          transform-origin: center;
        }

        /* Side Panel */
        .side-panel {
          position: fixed;
          top: 0; right: 0;
          width: 42vw;
          min-width: 320px;
          height: 100vh;
          background: #000000;
          z-index: 100;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 60px 64px;
          transform: translateX(100%);
          transition: transform 0.55s cubic-bezier(0.77, 0, 0.175, 1);
        }
        .side-panel.open {
          transform: translateX(0);
        }

        /* Close button — orange circle with X */
        .close-btn {
          position: absolute;
          top: 50%;
          left: -28px;
          transform: translateY(-50%);
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: #006699;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          visibility: hidden;
          transition: background 0.2s, transform 0.2s, opacity 0.3s, visibility 0.3s;
        }
        .side-panel.open .close-btn {
          opacity: 1;
          visibility: visible;
        }
        .close-btn:hover { background: #006699; transform: translateY(-50%) scale(1.08); }
        .close-btn svg { width: 20px; height: 20px; }

        /* Nav links */
        .side-panel nav {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .side-panel nav a {
          font-family: 'Barlow', 'Helvetica Neue', sans-serif;
          font-size: clamp(36px, 4.5vw, 56px);
          font-weight: 500;
          color: #ffffff;
          text-decoration: none;
          line-height: 1.25;
          padding: 6px 0;
          letter-spacing: -0.01em;
          transition: opacity 0.2s, transform 0.2s;
          display: block;
        }
        .side-panel nav a:hover {
          opacity: 0.45;
          transform: translateX(6px);
        }

        /* Staggered link animation */
        .side-panel.open nav a {
          animation: linkFadeIn 0.4s ease forwards;
          opacity: 0;
        }
        .side-panel.open nav a:nth-child(1) { animation-delay: 0.15s; }
        .side-panel.open nav a:nth-child(2) { animation-delay: 0.2s; }
        .side-panel.open nav a:nth-child(3) { animation-delay: 0.25s; }
        .side-panel.open nav a:nth-child(4) { animation-delay: 0.3s; }
        .side-panel.open nav a:nth-child(5) { animation-delay: 0.35s; }
        .side-panel.open nav a:nth-child(6) { animation-delay: 0.4s; }
        .side-panel.open nav a:nth-child(7) { animation-delay: 0.45s; }

        @keyframes linkFadeIn {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        /* Overlay */
        .menu-overlay {
          position: fixed;
          inset: 0;
          z-index: 90;
          pointer-events: none;
        }
        .menu-overlay.open { pointer-events: all; }


        @media (max-width: 768px) {
          .navbar { padding: 20px 20px; }
          .side-panel { width: 100%; padding: 60px 36px; }
          .close-btn { left: -24px; width: 48px; height: 48px; }
        }
      `}</style>

      {/* Invisible overlay to catch outside clicks */}
      <div
        className={`menu-overlay ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Side Panel */}
      <div className={`side-panel ${menuOpen ? "open" : ""}`}>
        {/* Orange X close button on the left edge */}
        <button className="close-btn" onClick={() => setMenuOpen(false)} aria-label="Close menu">
          <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4l12 12M16 4L4 16" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round"/>
          </svg>
        </button>

        <nav>
          <a href="#work"     onClick={(e) => { e.preventDefault(); setMenuOpen(false); document.getElementById('featured-work')?.scrollIntoView({ behavior: 'smooth' }); }}>Work</a>
          <a href="#expertise"  onClick={(e) => { e.preventDefault(); setMenuOpen(false); document.getElementById('expertise')?.scrollIntoView({ behavior: 'smooth' }); }}>Expertise</a>
          <a href="#experience" onClick={(e) => { e.preventDefault(); setMenuOpen(false); document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' }); }}>Experience</a>
          <a href="#clients"    onClick={(e) => { e.preventDefault(); setMenuOpen(false); document.getElementById('clients')?.scrollIntoView({ behavior: 'smooth' }); }}>Clients</a>
          <a href="#awards"     onClick={(e) => { e.preventDefault(); setMenuOpen(false); document.getElementById('awards')?.scrollIntoView({ behavior: 'smooth' }); }}>Awards</a>
          <a href="#about"      onClick={(e) => { e.preventDefault(); setMenuOpen(false); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }}>About</a>
          <a href="#connect"    onClick={(e) => { e.preventDefault(); setMenuOpen(false); document.getElementById('connect')?.scrollIntoView({ behavior: 'smooth' }); }}>Connect</a>
        </nav>
      </div>

      {/* Navbar */}
      <nav className={`navbar${!visible ? " hidden" : ""}`}>
        <div className="logo">
          <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 10h28M8 18h20M8 26h24M8 34h16" stroke="#0a0a0a" strokeWidth="3.5" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="nav-right">
          <button className="connect-btn">Connect With Me</button>
          <button
            className="menu-btn"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>
    </>
  );
}