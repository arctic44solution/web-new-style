"use client";

import { useState } from "react";

// Data array for the services list
const services = [
  { id: "01", title: "Conversion-Focused Creative" },
  { id: "02", title: "Paid Media Creative Strategy" },
  { id: "03", title: "Campaign Systems Design" },
  { id: "04", title: "Funnel-Aware Creative" },
  { id: "05", title: "Platform-Specific Optimization" },
  { id: "06", title: "Visual Consistency at Scale" },
  { id: "07", title: "Performance-Driven Storytelling" }, 
];

export default function Design() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=Barlow:wght@400;500&display=swap');

        /* Global Reset */
        *, *::before, *::after {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          background-color: #000000;
          color: #ffffff;
          font-family: 'Barlow', sans-serif;
          min-height: 100vh;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          
        }

        /* Main Container 
           CRITICAL: align-items must be 'flex-start' for sticky to work. 
           If it's 'stretch' (default), the big-number height will match the right-content, 
           and there will be no room for it to "slide" down.
        */
        .page-wrapper {
          display: flex;
          align-items: flex-start; 
          padding: 100px 60px;
          position: relative;
          gap: 40px;
        }

        /* The Sticky Big Number 
           It stays fixed in the viewport once it reaches 'top: 100px' 
           until the parent container (.page-wrapper) ends.
        */
        .big-number {
          font-family: 'Bebas Neue', 'Arial Black', sans-serif;
          font-weight: 900;
          font-size: clamp(220px, 28vw, 420px);
          line-height: 0.8;
          color: #ffffff;
          letter-spacing: 0.03em;
          user-select: none;
          
          /* Sticky Logic */
          position: -webkit-sticky; /* Support for Safari */
          position: sticky;
          top: 100px; /* Offset from the top of the screen */
          
          flex-shrink: 0;
          width: clamp(250px, 35vw, 450px);
        }

        /* Right Side Content */
        .right-content {
          flex: 1;
          max-width: 900px;
          padding-top: 20px;
        }

        .headline {
          font-family: 'Bebas Neue', 'Arial Black', sans-serif;
          font-weight: 900;
          font-size: clamp(32px, 4.5vw, 64px);
          line-height: 1.0;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 28px;
        }

        .description {
          font-size: clamp(14px, 1.1vw, 17px);
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 80px;
          letter-spacing: 0.01em;
        }

        /* Services List Styling */
        .services-list {
          list-style: none;
          width: 100%;
        }

        .service-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 25px 25px;
          border-top: 1px solid rgba(255, 255, 255, 0.15);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .service-item:last-child {
          border-bottom: 1px solid rgba(255, 255, 255, 0.15);
        }

        /* Interaction: Add slight background and padding shift on hover */
        .service-item:hover {
          background-color: rgba(255, 255, 255, 0.05);
          padding-left: 15px;
        }

        .service-title {
          font-size: clamp(16px, 1.2vw, 20px);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .service-number {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700;
          opacity: 0.5;
        }

        /* Grain Texture Overlay */
        .grain {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 100;
          opacity: 0.015;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
        }

        /* Responsive Design for Tablets/Phones */
        @media (max-width: 768px) {
          .page-wrapper {
            flex-direction: column;
            padding: 40px 20px;
          }
          .big-number {
            position: relative; /* Disable sticky on mobile for better flow */
            top: 0;
            font-size: 120px;
            width: 100%;
            margin-bottom: 20px;
          }
        }
      `}</style>

      {/* Visual background noise */}
      <div className="grain" />

      <div className="page-wrapper">
        {/* Left Side: Number stays sticky as you scroll */}
        <div className="big-number">05</div>

        {/* Right Side: Long content that creates the scroll */}
        <div className="right-content">
          <h1 className="headline">
            Designing Performance-Driven<br />
            Creative That Turns Attention Into
            Action
          </h1>

          <p className="description">
            I design performance-driven digital creative that turns attention into action—crafting social content, paid ads, and campaign
            systems optimized for conversion, clarity, and consistency, guided by audience insight, creative testing, and measurable
            results.
          </p>

          <ul className="services-list">
            {services.map((service) => (
              <li
                key={service.id}
                className="service-item"
                onMouseEnter={() => setHoveredId(service.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <span className="service-title">{service.title}</span>
                <span className="service-number">{service.id}</span>
              </li>
            ))}
          </ul>
          
          {/* Spacer to allow for more scrolling and test the sticky effect */}
          <div style={{ height: '0vh' }}></div>
        </div>
      </div>
    </>
  );
}