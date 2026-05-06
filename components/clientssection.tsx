"use client";

import { useState } from "react";

const categories = [
  "Arts, Entertainment & Venues",
  "Legal & Professional",
  "Construction, Trades & Auto",
  "Manufacturing & Logistics",
  "Healthcare & Wellness",
  "Tech, Gaming & Agency",
  "Education, Public & Food",
];

// Add your client names per category here
const clientsByCategory: Record<string, string[]> = {
  "Arts, Entertainment & Venues": [
    "97 South Song Sessions",
    "Desert Star Estate",
    "Lauzon Music",
    "Liz Long",
    "Ottawa Black Bears",
    "Paranormal Tours",
    "Reid Flocking",
    "Steady Canoe Studio",
    "Telling Tales Festival",
    "The Cotton Factory",
    "Tim Hawkes Music",
  ],
  "Legal & Professional": [
    "Apex Legal Group",
    "Birchwood Consulting",
    "Clearview Law",
    "Donnelly & Associates",
    "Evergreen Advisory",
  ],
  "Construction, Trades & Auto": [
    "Anchor Build Co.",
    "Crestline Roofing",
    "Iron Ridge Contracting",
    "Maple Auto Works",
    "Summit Trades Group",
  ],
  "Manufacturing & Logistics": [
    "BridgePoint Logistics",
    "CoreFlux Manufacturing",
    "Nordex Supply Chain",
    "Precision Parts Co.",
  ],
  "Healthcare & Wellness": [
    "ClearMind Therapy",
    "Harbour Health Clinic",
    "Luminary Wellness",
    "Sage Physiotherapy",
    "Vitalcare Medical",
  ],
  "Tech, Gaming & Agency": [
    "Driftware Labs",
    "Forge Digital",
    "Neon Pixel Studios",
    "Orbit Creative Agency",
    "Stackline Tech",
  ],
  "Education, Public & Food": [
    "Harvest Table Co.",
    "Inkwell Academy",
    "Maple Grove School",
    "The Public Kitchen",
    "Wildroot Bakery",
  ],
};

export default function ClientsSection() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section
      id="clients"
      style={{
        background: "#000000",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif",
        padding: "80px 60px",
        boxSizing: "border-box",
      }}
    >
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .client-panel {
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.4s ease, opacity 0.3s ease;
          opacity: 0;
        }
        .client-panel.open {
          max-height: 800px;
          opacity: 1;
        }
      `}</style>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "60px",
          width: "100%",
          maxWidth: "1400px",
          margin: "0 auto",
          alignItems: "start",
        }}
      >
        {/* LEFT SIDE */}
        <div style={{ display: "flex", flexDirection: "column", gap: "28px", position: "sticky", top: "150px" }}>
          {/* Label */}
          <p
            style={{
              color: "#ffffff",
              fontSize: "11px",
              fontWeight: "700",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              margin: 0,
              fontFamily: "'Helvetica Neue', Arial, sans-serif",
            }}
          >
            CLIENTS I&apos;VE WORKED WITH
          </p>

          {/* Japanese text */}
          <p
            style={{
              color: "#ffffff",
              fontSize: "22px",
              fontWeight: "400",
              margin: 0,
              fontFamily: "'Noto Sans JP', 'Hiragino Sans', sans-serif",
              letterSpacing: "0.05em",
            }}
          >
            これまでのクライアント
          </p>

          {/* Big headline */}
          <h2
            style={{
              color: "#ffffff",
              fontSize: "clamp(22px, 4vw, 35px)",
              fontWeight: "400",
              textTransform: "uppercase",
              lineHeight: "1.05",
              letterSpacing: "-0.01em",
              margin: 0,
              fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif",
            }}
          >
            A DECADE OF SHAPING BRAND IDENTITIES FOR GLOBAL TECH LEADERS AND
            LOCAL CULTURAL ICONS.
          </h2>

          {/* CTA Button */}
          <div style={{ marginTop: "200px", alignSelf: "flex-start" }}>
            <button
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                background: "#ffffff",
                color: "#000000",
                border: "none",
                borderRadius: "999px",
                padding: "12px 25px",
                fontSize: "14px",
                fontWeight: "400",
                cursor: "pointer",
                fontFamily: "'Helvetica Neue', Arial, sans-serif",
                letterSpacing: "0.01em",
                transition: "background 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "#e0e0e0";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "#ffffff";
              }}
            >
              Connect with me
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#000000",
                  color: "#ffffff",
                  borderRadius: "50%",
                  width: "28px",
                  height: "28px",
                  fontSize: "14px",
                  flexShrink: 0,
                }}
              >
                ↗
              </span>
            </button>
          </div>
        </div>

        {/* RIGHT SIDE — Category List */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {categories.map((category, i) => (
            <div key={i}>
              <button
                onClick={() => setExpanded(expanded === i ? null : i)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                  padding: "28px 0",
                  cursor: "pointer",
                  textAlign: "left",
                  color: "#ffffff",
                }}
              >
                {/* Circle + icon */}
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1.5px solid rgba(255,255,255,0.4)",
                    borderRadius: "50%",
                    width: "34px",
                    height: "34px",
                    fontSize: "18px",
                    color: "rgba(255,255,255,0.7)",
                    flexShrink: 0,
                    transition: "transform 0.3s ease, border-color 0.2s",
                    transform: expanded === i ? "rotate(45deg)" : "rotate(0deg)",
                  }}
                >
                  +
                </span>

                <span
                  style={{
                    fontSize: "clamp(16px, 1.6vw, 22px)",
                    fontWeight: "400",
                    fontFamily: "'Helvetica Neue', Arial, sans-serif",
                    letterSpacing: "0.01em",
                    color: "#ffffff",
                  }}
                >
                  {category}
                </span>
              </button>

              {/* Expandable client list */}
              <div
                className={`client-panel${expanded === i ? " open" : ""}`}
                style={{
                  borderBottom: expanded === i ? "1px solid rgba(255,255,255,0.1)" : "none",
                  paddingBottom: "16px",
                  paddingLeft: "56px",
                }}
              >
                  {(clientsByCategory[category] ?? []).map((client, j) => (
                    <div
                      key={j}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        padding: "10px 0",
                        borderBottom:
                          j < (clientsByCategory[category]?.length ?? 0) - 1
                            ? "1px solid rgba(255,255,255,0.06)"
                            : "none",
                        opacity: 0,
                        animation: "fadeSlideIn 0.25s ease forwards",
                        animationDelay: `${j * 35}ms`,
                      }}
                    >
                      <span
                        style={{
                          color: "rgba(255,255,255,0.2)",
                          fontSize: "13px",
                          flexShrink: 0,
                        }}
                      >
                        —
                      </span>
                      <span
                        style={{
                          fontSize: "clamp(14px, 1.3vw, 17px)",
                          color: "rgba(255,255,255,0.55)",
                          fontWeight: "300",
                          letterSpacing: "0.02em",
                          fontFamily: "'Helvetica Neue', Arial, sans-serif",
                          transition: "color 0.15s",
                          cursor: "default",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLSpanElement).style.color =
                            "rgba(255,255,255,0.95)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLSpanElement).style.color =
                            "rgba(255,255,255,0.55)";
                        }}
                      >
                        {client}
                      </span>
                    </div>
                  ))}
                </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}