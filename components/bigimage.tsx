"use client";

import { useEffect, useRef } from "react";

const IMAGE_SRC = "/assest/image/img6.png";

const BIO_PARAGRAPHS = [
  "Since the moment I could hold a pencil, I've been obsessed with creating. Drawing anime for hours, making music with my best friend, then that life-changing day in 8th grade when my computer class introduced me to GeoCities. From that second on, I was hooked—building fan sites for Dragon Ball Z and The Legend of Zelda, obsessively tweaking layouts, collecting info, and trying to out-design every other kid's site.",
  "That competitive fire forced me to learn development just so I could actually build what I saw in my head. At 13, I didn't realize it yet, but that was the start of everything: the endless drive to turn vision into reality, no matter how many skills I had to pick up along the way.",
  "Over the years that hunger pushed me in every creative direction—producing music, owning and running my own photography studio, launching a web design agency, shipping apps and SaaS products, even building video games in my spare time. People sometimes throw \"jack of all trades, master of none\" at me, but I've never seen it that way. Every medium I learned was in service of one core strength: taste. I'm obsessed with pulling ideas from design, sound, photography, code, and branding, then weaving them into one cohesive, powerful experience.",
  "Early in my career I was frustrated as hell. I'd spent my entire teenage years studying the best designers in the world, dreaming of joining an agency that would level me up. Instead I watched too many agencies cut corners, bloat scope, under-deliver, and chase quick money—ruining client relationships and their own reputations. That pain became my best teacher. I started studying what actually separated good work from award-winning work, and the answer was always the same: branding.",
  "Not logos or colors—the Why. Why does this brand exist? What's its purpose in the world? Once I learned (and later refined) the \"Uncover Your Greatness\" process to dig that deep, everything changed. That essence became the North Star for every decision: the way a brand speaks, the shapes it uses, the colors, typography, imagery, even the scent when you walk into a store or open a new product box. When the Why is right, it bleeds into every detail and makes the work unforgettable.",
  "That philosophy has guided me for the last 16 years and eventually led me to Creative Director roles where I could shape entire brands from the ground up. Today I still bring that same approach to every project—even if I'm \"just\" building a website. I dig a little deeper so the final product actually feels alive.",
  "And now? AI has thrown rocket fuel on the fire. Ideas hit me at 1000 per minute and I can go from concept to polished execution faster than ever. I'm shipping more projects simultaneously than I ever thought possible—and honestly, I'm not even sure AI can keep up with me anymore. (Challenge accepted.)",
];

export default function CreativeDirectorScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const currentProgress = useRef(0);

  useEffect(() => {
    let rafId: number;

    const updateProgress = (scrollY: number) => {
      const section = sectionRef.current;
      if (!section) return;

      const sectionTop = section.offsetTop;
      const totalScrollable = section.offsetHeight - window.innerHeight;
      const p = Math.min(Math.max((scrollY - sectionTop) / totalScrollable, 0), 1);

      currentProgress.current = p;

      if (textRef.current) {
        textRef.current.style.opacity = String(Math.max(0, 1 - p / 0.4));
        textRef.current.style.transform = `scale(${1 + p * 0.08})`;
        textRef.current.style.filter = `blur(${p * 10}px)`;
      }

      if (imageWrapperRef.current) {
        imageWrapperRef.current.style.transform = `translateY(${(1 - p) * 55}%)`;
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const win = window as any;
    if (win.__lenis) {
      win.__lenis.on("scroll", ({ scroll }: { scroll: number }) => updateProgress(scroll));
      return () => win.__lenis.off("scroll");
    }

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => updateProgress(window.scrollY));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    updateProgress(window.scrollY);
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
          background: #000000;
          color: #000000;
        }

        /* ── Scroll hero section ── */
        .cd-section {
          position: relative;
          height: 300vh;
          background: #000000;
        }

        .cd-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          width: 100%;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #000000;
        }

        .cd-sticky::before {
          display: none;
        }

        .cd-text-wrapper {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding-top: 12vh;
          z-index: 2;
          pointer-events: none;
        }

        .cd-title {
          font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-weight: 300;
          font-style: italic;
          font-size: clamp(3.5rem, 10vw, 9rem);
          letter-spacing: 0.02em;
          line-height: 1;
          color: #ffffff;
          text-align: center;
          will-change: opacity, transform, filter;
          white-space: nowrap;
        }

        .cd-title span {
          display: block;
        }

        .cd-title .small-line {
          font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-size: clamp(5rem, 13vw, 1rem);
          letter-spacing: 0.35em;
          font-style: normal;
          font-weight: 700;
          text-transform: uppercase;
          margin-bottom: 0.6em;
          opacity: 0.5;
        }

        .cd-image-wrapper {
          position: absolute;
          inset: 0;
          z-index: 3;
          will-change: transform;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: translateZ(0);
        }

        .cd-img-inner {
          width: 35%;
          height: 80vh;
          overflow: hidden;
          border-radius: 24px;
          background: #000;
          isolation: isolate;
        }

        .cd-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
          filter: none;
          mix-blend-mode: normal;
          image-rendering: auto;
        }

        .cd-image-overlay {
          display: none;
        }

        /* ── Bio / paragraph section ── */
        .cd-bio-section {
          background: #000000;
          padding: 10px 0 160px;
          position: relative;
        }

        .cd-bio-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 1px;
          height: 80px;
          background: linear-gradient(to bottom, transparent, rgba(240,237,230,0.2));
        }

        .cd-bio-inner {
          max-width: 780px;
          margin: 0 auto;
          padding: 0 40px;
        }

        .cd-bio-label {
          font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(240,237,230,0.35);
          margin-bottom: 56px;
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .cd-bio-label::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(240,237,230,0.1);
          max-width: 200px;
        }

        .cd-bio-paragraph {
          font-family: "Georgia", "Times New Roman", serif;
          font-size: clamp(1rem, 1.6vw, 1.125rem);
          line-height: 1.85;
          color: rgba(240,237,230,0.75);
          margin-bottom: 2.2em;
          font-weight: 400;
          letter-spacing: 0.01em;
        }

        .cd-bio-paragraph:first-of-type {
          font-size: clamp(1.1rem, 1.8vw, 1.3rem);
          color: rgba(240,237,230,0.92);
          line-height: 1.75;
        }

        .cd-bio-paragraph:last-of-type {
          margin-bottom: 0;
          color: rgba(240,237,230,0.9);
          font-style: italic;
        }

        @media (max-width: 768px) {
          .cd-img-inner {
            width: 72%;
            height: 65vh;
          }

          .cd-bio-inner {
            padding: 0 24px;
          }

          .cd-bio-section {
            padding: 120px 0 120px;
          }
        }
      `}</style>

      {/* ── Scroll hero ── */}
      <div id="about" className="cd-section" ref={sectionRef}>
        <div className="cd-sticky">

          <div
            className="cd-image-wrapper"
            ref={imageWrapperRef}
            style={{ transform: "translateY(60%)" }}
          >
            <div className="cd-img-inner">
              <img src={IMAGE_SRC} alt="Creative Director" />
            </div>
          </div>

          <div className="cd-text-wrapper" style={{ zIndex: 2 }}>
            <h1
              className="cd-title"
              ref={textRef}
              style={{ opacity: 1, transform: "scale(1)", filter: "blur(0px)" }}
            >
              <span className="small-line"></span>
              <span>Creative</span>
              <span>Director</span>
            </h1>
          </div>
        </div>
      </div>

      {/* ── Bio paragraphs ── */}
      <section className="cd-bio-section">
        <div className="cd-bio-inner">
          {BIO_PARAGRAPHS.map((para, i) => (
            <p key={i} className="cd-bio-paragraph">
              {para}
            </p>
          ))}
        </div>
      </section>
    </>
  );
}