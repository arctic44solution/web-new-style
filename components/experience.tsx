"use client";

import { useState } from "react";

const experiences = [
  {
    company: "JumpFactor",
    role: "Creative Director",
    location: "Toronto, ON",
    period: "May 2025 – March 2026",
    summary:
      "Partnered with executive leadership to define brand purpose, reposition the organization, and elevate creative strategy as a core business driver.",
    bullets: [
      "Led brand discovery and positioning workshops (\"Uncover Your Greatness\"), aligning leadership, teams, and long-term vision across the organization.",
      "Architected a complete internal brand replatform, modernizing visual systems for consistency, scalability, and stronger market authority.",
      "Directed rapid turnaround rebrand and website realignment for a subsidiary business, resolving brand perception and conversion issues within months.",
      "Provided strategic creative leadership across design, development, and marketing teams, improving execution velocity and reducing cross-functional friction.",
      "Implemented AI-powered creative workflows that accelerated on-brand asset and video production by 40–60% while preserving creative integrity.",
      "Served as a senior creative advisor, translating complex business objectives into cohesive brand, marketing, and experiential strategies.",
    ],
  },
  {
    company: "FutureCraft",
    role: "Creative Director / Partner",
    location: "Hamilton, ON",
    period: "Jan 2023 – Present",
    summary:
      "Co-founded and scaled a boutique brand consultancy focused on clarity, differentiation, and sustainable growth for founders and leadership teams.",
    bullets: [
      "Owned end-to-end brand vision and execution, leading deep discovery through positioning, messaging, visual identity, and digital experience systems.",
      "Led executive “why” workshops, translating insight into actionable brand frameworks that support long-term relevance and alignment.",
      "Directed multidisciplinary teams and external partners, maintaining rigorous standards across design, UX, copy, and delivery.",
      "Launched high-impact brands across diverse industries, balancing creative ambition with strategic and operational constraints.",
      "Served as a long-term strategic partner to clients, advising on brand evolution, competitive differentiation, and creative direction beyond individual engagements.",
    ],
  },
  {
    company: "Muse Marketing Group",
    role: "Founding Partner & Creative Director",
    location: "Hamilton, ON",
    period: "2015 – 2023",
    summary:
      "Helped grow and shape a boutique agency into a nationally recognized firm through brand leadership, systems thinking, and high-impact creative execution.",
    bullets: [
      "Partnered in scaling the agency from a founding team of 3 to a multidisciplinary team of 12, supporting operational growth, process maturity, and creative output.",
      "Contributed to national recognition as a Top Marketing Agency in Canada (Clutch, 2020) and Best Local Advertising Agency for three consecutive years.",
      "Led the agency’s internal rebrand and positioning, strengthening market perception and supporting accelerated growth.",
      "Built, managed, and mentored multidisciplinary teams across design, photography, development, copywriting, SEO, and brand strategy.",
      "Directed over 80 website launches and numerous brand engagements, overseeing work from executive discovery through launch and post-launch evolution.",
      "Designed and implemented proprietary discovery workshops and long-term client partnership programs that elevated work quality, improved retention, and increased recurring revenue.",
    ],
  },
];

export default function ExperienceSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section
      id="experience"
      style={{
        backgroundColor: "#ffffff",
        minHeight: "100vh",
        padding: "80px 64px",
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      }}
    >
      {/* Top header row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "40px",
          marginBottom: "60px",
        }}
      >
        <div>
          <p
            style={{
              fontSize: "12px",
              letterSpacing: "0.10em",
              textTransform: "uppercase",
              color: "#111",
              marginBottom: "12px",
            }}
          >
            My Experience
          </p>
          <p
            style={{
              fontSize: "28px",
              fontWeight: "700",
              color: "#111",
              lineHeight: 1.1,
            }}
          >
            経験
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "flex-start" }}>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: "700",
              color: "#111",
              lineHeight: 1.05,
              textTransform: "uppercase",
              letterSpacing: "-0.01em",
              margin: 0,
            }}
          >
            Work Experience Spanning 15+ Years of Creativity, Imagination, and
            Passion.
          </h2>
        </div>
      </div>

      {/* Top divider */}
      <div style={{ borderTop: "1px solid #c8c8c4" }} />

      {/* Accordion list */}
      <div>
        {experiences.map((exp, i) => {
          const isOpen = openIndex === i;

          return (
            <div key={i}>
              {/* Company row */}
              <div
                onClick={() => toggle(i)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "28px 0",
                  cursor: "pointer",
                  transition: "background-color 0.2s ease",
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#fafafa"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
              >
                <span
                  style={{
                    fontSize: "clamp(22px, 3vw, 36px)",
                    fontWeight: "100",
                    color: "#5a5858",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {exp.company}
                </span>

                {/* Plus / Minus circle icon */}
                <div
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    border: "1px solid #aaa",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "transform 0.3s ease, border-color 0.3s ease",
                    transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                  }}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Horizontal line always shown */}
                    <line x1="0" y1="6" x2="12" y2="6" stroke="#555" strokeWidth="1.2" />
                    {/* Vertical line only when closed (shows +) */}
                    {!isOpen && (
                      <line x1="6" y1="0" x2="6" y2="12" stroke="#555" strokeWidth="1.2" />
                    )}
                  </svg>
                </div>
              </div>

              {/* Expanded content */}
              <div
                style={{
                  overflow: "hidden",
                  maxHeight: isOpen ? "1000px" : "0",
                  opacity: isOpen ? 1 : 0,
                  transition: "max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease 0.1s",
                }}
              >
                <div style={{ 
                  paddingBottom: "40px",
                  transform: isOpen ? "translateY(0)" : "translateY(-10px)",
                  transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.1s",
                }}>

                  {/* Row: Role pill (left) + Location & Date (right) */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "32px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#333",
                        border: "1px solid #bbb",
                        borderRadius: "999px",
                        padding: "5px 16px",
                        display: "inline-block",
                      }}
                    >
                      {exp.role}
                    </span>

                    <span
                      style={{
                        fontSize: "13px",
                        color: "#333",
                      }}
                    >
                      {exp.location}&nbsp;&nbsp;{exp.period}
                    </span>
                  </div>

                  {/* Content: Summary (left) + Bullets (right) */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "2fr 3fr",
                      gap: "48px",
                      alignItems: "start",
                    }}
                  >
                    {/* Summary paragraph */}
                    <p
                      style={{
                        fontSize: "18px",
                        fontWeight: "400",
                        color: "#111",
                        lineHeight: 1.55,
                        margin: 0,
                      }}
                    >
                      {exp.summary}
                    </p>

                    {/* Bullet list */}
                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                      {exp.bullets.map((b, j) => (
                        <li
                          key={j}
                          style={{
                            display: "flex",
                            gap: "18px",
                            marginBottom: "16px",
                            alignItems: "flex-start",
                          }}
                        >
                          <span
                            style={{
                              color: "#999",
                              fontSize: "14px",
                              flexShrink: 0,
                              marginTop: "3px",
                            }}
                          >
                            —
                          </span>
                          <span
                            style={{
                              fontSize: "14px",
                              color: "#222",
                              lineHeight: 1.65,
                            }}
                          >
                            {b}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Bottom divider */}
              <div style={{ borderTop: "1px solid #c8c8c4" }} />
            </div>
          );
        })}
      </div>
    </section>
  );
}