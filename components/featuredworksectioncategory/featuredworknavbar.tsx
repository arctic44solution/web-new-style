"use client";

export default function FeatureNavbar() {
  return (
    <>
      <style>{`
        .feature-navbar {
          position: absolute;
          top: 0; left: 0; right: 0;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 28px 40px;
          opacity: 0;
          transform: translateY(-12px);
          animation: fadeSlideDown 0.7s ease forwards 0.1s;
        }

        .logo { width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; }
        .logo svg { width: 100%; height: 100%; }

        .nav-right { display: flex; align-items: center; gap: 20px; }

        .connect-btn {
          background: transparent;
          border: 1.5px solid rgba(255, 255, 255, 0.7);
          color: #ffffff;
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
        .connect-btn:hover { background: #ffffff; color: #000000; }

        .menu-btn { background: transparent; border: none; cursor: pointer; display: flex; flex-direction: column; gap: 5px; padding: 4px; }
        .menu-btn span { display: block; width: 26px; height: 2px; background: #ffffff; }

        @keyframes fadeSlideDown { to { opacity: 1; transform: translateY(0); } }

        @media (max-width: 768px) {
          .feature-navbar { padding: 20px 20px; }
        }
      `}</style>

      <nav className="feature-navbar">
        <div className="logo">
          <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 10h28M8 18h20M8 26h24M8 34h16" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="nav-right">
          <button className="connect-btn">Connect With Me</button>
          <button className="menu-btn" aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>
    </>
  );
}