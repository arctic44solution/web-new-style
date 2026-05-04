"use client";
import Navbar from './navbar';

export default function HeroSection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .hero-wrapper {
          position: relative;
          width: 100%;
          height: 100vh;
          min-height: 600px;
          background-color: #E84A00;
          overflow: hidden;
          font-family: 'Barlow Condensed', sans-serif;
        }

        /* ── VIDEO BACKGROUND ── */
        .hero-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          background: #E84A00; 
          z-index: 0;
          opacity: 0.30;
        }

        /* Grain texture overlay */
        .hero-wrapper::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E");
          opacity: 0.25;
          z-index: 1;
          pointer-events: none;
        }

        /* Radial vignette */
        .hero-wrapper::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 55% 50%, transparent 30%, rgba(160, 30, 0, 0.55) 100%);
          z-index: 2;
          pointer-events: none;
        }



        .hero-title-wrap { position: absolute; top: 50%; left: 0; right: 0; transform: translateY(-50%); z-index: 6; text-align: center; padding: 0 20px; }
        .hero-subtitle { font-family: 'Barlow Condensed', sans-serif; font-size: clamp(13px, 1.4vw, 18px); font-weight: 600; letter-spacing: 0.25em; text-transform: uppercase; color: #0a0a0a; margin-bottom: 4px; opacity: 0; transform: translateY(10px); animation: fadeSlideUp 0.6s ease forwards 0.5s; }
        .hero-name { font-family: 'Bebas Neue', sans-serif; font-size: clamp(80px, 13vw, 200px); line-height: 0.88; color: #0a0a0a; letter-spacing: 0.10em; opacity: 0; transform: translateY(20px); animation: fadeSlideUp 0.8s ease forwards 0.65s; }

        .hero-meta { position: absolute; bottom: 28px; left: 0; right: 0; z-index: 10; display: flex; align-items: flex-end; justify-content: space-between; padding: 0 40px; opacity: 0; transform: translateY(10px); animation: fadeSlideUp 0.6s ease forwards 0.9s; }
        .hero-meta-item { font-family: 'Barlow Condensed', sans-serif; font-size: clamp(15px, 1vw, 13px); font-weight: 600; letter-spacing: 0.11em; text-transform: uppercase; color: #0a0a0a; }

        @keyframes fadeSlideDown { to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeSlideUp { to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeSlideLeft { to { opacity: 1; transform: translateX(0); } }

        @media (max-width: 768px) {
          .hero-meta { padding: 0 20px; }
          .hero-meta-item:nth-child(2) { display: none; }
          .hero-name { font-size: clamp(60px, 18vw, 100px); }
        }
      `}</style>

      <section className="hero-wrapper">

        {/* ── VIDEO BACKGROUND ── */}
        {<video
          autoPlay
          muted
          loop
          playsInline
          className="hero-video"
        >
          <source src="/assest/video/hero3.mp4" type="video/mp4" />
        </video>
        }
        {/* ── NAVBAR ── */}
        <Navbar />

        {/* ── TITLE OVERLAY ── */}
        <div className="hero-title-wrap">
          <p className="hero-subtitle">Creative Director</p>
          <h1 className="hero-name">Brandin Hall</h1>
        </div>

        {/* ── FOOTER META ── */}
        <footer className="hero-meta">
          <span className="hero-meta-item">Based in Hamilton, Ontario</span>
          <span className="hero-meta-item">Specializing in AI, Branding, &amp; Web Design</span>
          <span className="hero-meta-item">15+ Years Experience</span>
        </footer>

      </section>
    </>
  );
}