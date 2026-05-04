"use client";

import { useEffect, useRef } from "react";

const awards = [
  {
    company: "Muse Marketing Group",
    source: "Clutch",
    title: "Top Marketing Agency in Canada",
    year: "2020",
  },
  {
    company: "Muse Marketing Group",
    source: "Hamilton Spectator",
    title: "Best Local Advertising Agency (Platinum)",
    year: "2015–2016",
  },
  {
    company: "Muse Marketing Group",
    source: "Hamilton Spectator",
    title: "Best Video Services (Platinum)",
    year: "2016",
  },
];

export default function AwardsSection() {
  const rowsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 }
    );

    rowsRef.current.forEach((row) => {
      if (row) observer.observe(row);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="awards-section">
      <div className="awards-container">
        {/* Label Area */}
        <div className="awards-label">
          <span className="label-en">AWARDS &amp; RECOGNITION</span>
          <span className="label-jp">受賞・表彰</span>
        </div>

        {/* Headline Area */}
        <div className="awards-headline">
          <h2>
            CREATIVE LEADERSHIP THAT DIRECTLY DROVE AGENCY-WIDE RECOGNITION AND
            GROWTH
          </h2>
        </div>

        {/* Table Area */}
        <div className="awards-table">
          {awards.map((award, i) => (
            <div
              key={i}
              className="awards-row"
              ref={(el) => {
                if (el) rowsRef.current[i] = el;
              }}
              style={{
                opacity: 0,
                transform: "translateY(20px)",
                transition: `opacity 0.6s ease ${i * 0.12}s, transform 0.6s ease ${i * 0.12}s`,
              }}
            >
              <span className="col-company">{award.company}</span>
              <span className="col-source">{award.source}</span>
              <span className="col-title">{award.title}</span>
              <span className="col-year">{award.year}</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .awards-section {
          background-color: #000000;
          color: #ffffff;
          padding: 100px 60px;
          font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        }

        .awards-container {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          /* Desktop layout: Label on left, Headline on right */
          grid-template-columns: 250px 1fr;
          column-gap: 40px;
        }

        .awards-label {
          grid-column: 1;
        }

        .label-en {
          display: block;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.10em;
          color: #aaaaaa;
          margin-bottom: 8px;
        }

        .label-jp {
          display: block;
          font-size: clamp(24px, 2vw, 28px);
          font-weight: 700;
          color: #ffffff;
        }

        .awards-headline {
          grid-column: 2;
          margin-bottom: 80px;
        }

        .awards-headline h2 {
          font-size: clamp(28px, 4.5vw, 48px);
          font-weight: 700;
          line-height: 1.1;
          text-transform: uppercase;
          margin: 0;
        }

        .awards-table {
          grid-column: 1 / -1; /* Spans across both columns */
          border-top: 1px solid #333;
        }

        .awards-row {
          display: grid;
          grid-template-columns: 1.2fr 1fr 1.5fr 0.5fr;
          padding: 25px 0;
          border-bottom: 1px solid #333;
          align-items: center;
          gap: 20px;
        }

        .col-company, .col-source, .col-title, .col-year {
          font-size: 15px;
          color: #e0e0e0;
        }

        .col-year {
          text-align: right;
        }

        /* Responsive Fix for 900px and below */
        @media (max-width: 900px) {
          .awards-section {
            padding: 60px 30px;
          }
          
          .awards-container {
            grid-template-columns: 1fr; /* Stack everything in one column */
            gap: 30px;
          }

          .awards-label {
            grid-column: 1;
          }

          .awards-headline {
            grid-column: 1;
            margin-bottom: 40px;
          }

          .awards-table {
            grid-column: 1;
          }

          .awards-row {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto auto;
          }

          .col-year {
            text-align: right;
          }
        }

        /* Extreme Mobile Fix (Phones) */
        @media (max-width: 600px) {
          .awards-row {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }

          .col-year {
            text-align: left;
            font-size: 13px;
            color: #888;
          }
        }
      `}</style>
    </section>
  );
}