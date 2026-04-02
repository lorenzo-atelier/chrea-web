"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/AnimatedSection";
import { BirdMotif, ParallaxBird } from "@/components/ui/BirdMotif";

// ─── Hero Section ──────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      style={{
        minHeight: "100svh",
        backgroundColor: "var(--color-cream-light)",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "clamp(6rem, 12vw, 10rem) clamp(1.5rem, 6vw, 5rem)",
        overflow: "hidden",
      }}
    >
      {/* Decorative top line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "absolute",
          top: "2.5rem",
          left: "clamp(1.5rem, 6vw, 5rem)",
          right: "clamp(1.5rem, 6vw, 5rem)",
          height: "1px",
          backgroundColor: "var(--color-sand)",
          transformOrigin: "left",
        }}
      />

      {/* Brand name top-left */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        style={{
          position: "absolute",
          top: "2.5rem",
          left: "clamp(1.5rem, 6vw, 5rem)",
          transform: "translateY(-50%)",
          fontFamily: "var(--font-display)",
          fontSize: "0.875rem",
          letterSpacing: "0.2em",
          color: "var(--color-warm-gray)",
          textTransform: "uppercase",
        }}
      >
        CHRÉA
      </motion.div>

      {/* Parallax bird — upper right */}
      <div
        style={{
          position: "absolute",
          top: "clamp(5rem, 15vw, 12rem)",
          right: "clamp(2rem, 8vw, 8rem)",
        }}
      >
        <ParallaxBird />
      </div>

      {/* Second bird — lower left, small */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 0.35, x: 0 }}
        transition={{ duration: 2, delay: 1.5 }}
        style={{
          position: "absolute",
          bottom: "clamp(6rem, 12vw, 10rem)",
          left: "clamp(1.5rem, 6vw, 5rem)",
        }}
      >
        <BirdMotif variant="flying" size={28} color="var(--color-sand)" />
      </motion.div>

      {/* Content */}
      <div style={{ maxWidth: "var(--content-max)", margin: "0 auto", width: "100%" }}>
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(0.75rem, 1.2vw, 0.85rem)",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--color-gold)",
            marginBottom: "clamp(1.5rem, 3vw, 2.5rem)",
          }}
        >
          Un espacio de conversación consciente
        </motion.p>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3rem, 7.5vw, 8rem)",
            fontWeight: 300,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "var(--color-obsidian)",
            maxWidth: "14ch",
            marginBottom: "clamp(1.5rem, 3vw, 2.5rem)",
          }}
        >
          Un universo para{" "}
          <em style={{ color: "var(--color-gold)", fontStyle: "italic" }}>
            volver a ti.
          </em>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.65 }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.15rem, 2.2vw, 1.75rem)",
            fontWeight: 300,
            fontStyle: "italic",
            color: "var(--color-charcoal)",
            maxWidth: "38ch",
            lineHeight: 1.5,
            marginBottom: "clamp(3rem, 6vw, 5rem)",
          }}
        >
          Para{" "}
          <span style={{ color: "var(--color-gold)" }}>CHRÉA[r]</span> una vida
          que se sienta tuya.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85 }}
          style={{ display: "flex", gap: "2rem", flexWrap: "wrap", alignItems: "center" }}
        >
          <a
            href="#join"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(0.8rem, 1.2vw, 0.9rem)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--color-cream-light)",
              backgroundColor: "var(--color-obsidian)",
              padding: "0.875rem 2.25rem",
              textDecoration: "none",
              transition: "background-color 0.3s ease, color 0.3s ease",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--color-gold)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--color-obsidian)";
            }}
          >
            → Join the flock.
          </a>
          <a
            href="#espacio"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(0.8rem, 1.2vw, 0.9rem)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--color-charcoal)",
              textDecoration: "none",
              borderBottom: "1px solid var(--color-sand)",
              paddingBottom: "2px",
              transition: "color 0.3s ease, border-color 0.3s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-gold)";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--color-gold)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-charcoal)";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--color-sand)";
            }}
          >
            → Explorar
          </a>
        </motion.div>
      </div>

      {/* Bottom decorative line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "clamp(1.5rem, 6vw, 5rem)",
          right: "clamp(1.5rem, 6vw, 5rem)",
          height: "1px",
          backgroundColor: "var(--color-sand)",
          transformOrigin: "left",
        }}
      />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        style={{
          position: "absolute",
          bottom: "2.5rem",
          right: "clamp(1.5rem, 6vw, 5rem)",
          transform: "translateY(50%)",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          fontFamily: "var(--font-body)",
          fontSize: "0.7rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--color-warm-gray)",
        }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: "1px",
            height: "2rem",
            backgroundColor: "var(--color-gold)",
          }}
        />
        Scroll
      </motion.div>
    </section>
  );
}

// ─── What This Space Holds ─────────────────────────────────────────────────────
function WhatThisSpaceHolds() {
  return (
    <section
      id="espacio"
      style={{
        backgroundColor: "var(--color-obsidian)",
        padding: "var(--section-pad) clamp(1.5rem, 6vw, 5rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decorative text */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: "-2rem",
          transform: "translateY(-50%) rotate(90deg)",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(6rem, 15vw, 18rem)",
          fontWeight: 300,
          color: "transparent",
          WebkitTextStroke: "1px rgba(184, 151, 90, 0.08)",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          letterSpacing: "-0.05em",
          lineHeight: 1,
        }}
        aria-hidden="true"
      >
        CHRÉA
      </div>

      <div style={{ maxWidth: "var(--content-max)", margin: "0 auto" }}>
        {/* Section label */}
        <AnimatedSection delay={0}>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--color-gold-muted)",
              marginBottom: "clamp(3rem, 6vw, 5rem)",
            }}
          >
            El espacio
          </p>
        </AnimatedSection>

        {/* Main quote lines */}
        <StaggerContainer staggerDelay={0.18}>
          <StaggerItem>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.75rem, 4vw, 3.5rem)",
                fontWeight: 300,
                lineHeight: 1.2,
                color: "var(--color-cream)",
                marginBottom: "clamp(1.25rem, 2.5vw, 2rem)",
                maxWidth: "22ch",
              }}
            >
              Un espacio de{" "}
              <em style={{ color: "var(--color-gold-light)", fontStyle: "italic" }}>
                conversación consciente.
              </em>
            </h2>
          </StaggerItem>

          <StaggerItem>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.25rem, 2.5vw, 2.25rem)",
                fontWeight: 300,
                lineHeight: 1.35,
                color: "var(--color-blush)",
                marginBottom: "clamp(1.25rem, 2.5vw, 2rem)",
                maxWidth: "30ch",
                fontStyle: "italic",
              }}
            >
              El lugar en donde todo empieza a hacer sentido.
            </p>
          </StaggerItem>

          <StaggerItem>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.1rem, 2vw, 1.85rem)",
                fontWeight: 300,
                lineHeight: 1.45,
                color: "var(--color-sand)",
                maxWidth: "34ch",
                fontStyle: "italic",
              }}
            >
              Donde dejas de buscar afuera… y empiezas a{" "}
              <span style={{ color: "var(--color-cream)" }}>regresar a ti.</span>
            </p>
          </StaggerItem>
        </StaggerContainer>

        {/* Decorative divider */}
        <AnimatedSection delay={0.3} direction="fade">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2rem",
              margin: "clamp(4rem, 8vw, 7rem) 0",
            }}
          >
            <div className="divider-gold" style={{ width: "3rem", height: "1px", backgroundColor: "var(--color-gold)" }} />
            <BirdMotif variant="flying" size={36} color="var(--color-gold)" className="" />
            <div style={{ width: "3rem", height: "1px", backgroundColor: "var(--color-gold)" }} />
          </div>
        </AnimatedSection>

        {/* Three pillars */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(200px, 100%), 1fr))",
            gap: "clamp(2rem, 4vw, 4rem)",
            marginTop: "clamp(2rem, 4vw, 4rem)",
          }}
        >
          {["Despierta", "Recuérdate", "CHRÉA"].map((word, i) => (
            <AnimatedSection key={word} delay={i * 0.15} direction="up">
              <div style={{ textAlign: "center" }}>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                    fontWeight: 400,
                    fontStyle: "italic",
                    color: i === 2 ? "var(--color-gold)" : "var(--color-cream)",
                    letterSpacing: "-0.01em",
                    marginBottom: "0.75rem",
                  }}
                >
                  {word}
                </p>
                <div
                  style={{
                    width: "1.5rem",
                    height: "1px",
                    backgroundColor: "var(--color-gold-muted)",
                    margin: "0 auto",
                  }}
                />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── About the Founder ─────────────────────────────────────────────────────────
function AboutFounder() {
  return (
    <section
      style={{
        backgroundColor: "var(--color-cream)",
        padding: "var(--section-pad) clamp(1.5rem, 6vw, 5rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background bird */}
      <div
        style={{
          position: "absolute",
          top: "clamp(4rem, 8vw, 7rem)",
          right: "clamp(1.5rem, 6vw, 5rem)",
          opacity: 0.06,
        }}
        aria-hidden="true"
      >
        <BirdMotif variant="flying" size={200} color="var(--color-obsidian)" />
      </div>

      <div style={{ maxWidth: "var(--content-max)", margin: "0 auto" }}>
        {/* Section label */}
        <AnimatedSection delay={0}>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--color-gold)",
              marginBottom: "clamp(3rem, 6vw, 5rem)",
            }}
          >
            La fundadora
          </p>
        </AnimatedSection>

        {/* Split layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))",
            gap: "clamp(3rem, 6vw, 7rem)",
            alignItems: "start",
          }}
        >
          {/* Text side */}
          <div>
            <AnimatedSection delay={0.1} direction="left">
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 4.5vw, 4rem)",
                  fontWeight: 300,
                  lineHeight: 1.1,
                  color: "var(--color-obsidian)",
                  marginBottom: "clamp(1.5rem, 3vw, 2.5rem)",
                }}
              >
                Hola, soy{" "}
                <em style={{ color: "var(--color-gold)", fontStyle: "italic" }}>
                  Christeena.
                </em>
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(0.9rem, 1.3vw, 1.05rem)",
                  lineHeight: 1.85,
                  color: "var(--color-charcoal)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.25rem",
                }}
              >
                <p>
                  Siempre me ha movido una curiosidad inagotable. Y una necesidad
                  muy natural de expresarme. Durante mucho tiempo lo hice hacia
                  afuera. A través de la imagen, la estética… lo visible.
                </p>
                <p>
                  Y aunque eso me encantaba, hubo un punto donde algo empezó a
                  sentirse incompleto. Algo en mí empezó a incomodarse. Y en lugar
                  de ignorarlo… lo seguí.
                </p>
                <p>
                  Empecé a cuestionarme. A ir más profundo. A explorar partes de
                  mí que antes no veía. Espiritualidad. Cuerpo. Energía.
                  Emociones. Y también… a atravesar muchas cosas incómodas.
                  Porque despertar no siempre se siente bonito.
                </p>
                <p>
                  Pero ahí fue donde todo empezó a cambiar.{" "}
                  <strong
                    style={{
                      fontWeight: 500,
                      color: "var(--color-obsidian)",
                      fontFamily: "var(--font-display)",
                      fontStyle: "italic",
                      fontSize: "1.1em",
                    }}
                  >
                    CHRÉA nace de ese momento.
                  </strong>{" "}
                  De dejar de vivir solo hacia afuera… y empezar a{" "}
                  <span style={{ color: "var(--color-gold)" }}>
                    CHRÉA[r] mi vida desde adentro.
                  </span>
                </p>
              </div>
            </AnimatedSection>

            {/* Signature divider */}
            <AnimatedSection delay={0.35} direction="fade">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginTop: "clamp(2rem, 4vw, 3.5rem)",
                }}
              >
                <div
                  style={{
                    width: "2.5rem",
                    height: "1px",
                    backgroundColor: "var(--color-gold)",
                  }}
                />
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1rem",
                    fontStyle: "italic",
                    color: "var(--color-warm-gray)",
                    letterSpacing: "0.05em",
                  }}
                >
                  Christeena
                </p>
              </div>
            </AnimatedSection>
          </div>

          {/* Image placeholder */}
          <AnimatedSection delay={0.25} direction="right">
            <div
              style={{
                position: "relative",
                aspectRatio: "3/4",
                backgroundColor: "var(--color-blush)",
                overflow: "hidden",
              }}
            >
              {/* Inner texture */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(135deg, var(--color-cream-dark) 0%, var(--color-blush) 50%, var(--color-sand) 100%)",
                  opacity: 0.7,
                }}
              />
              {/* Placeholder label */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "1rem",
                }}
              >
                <BirdMotif
                  variant="sitting"
                  size={48}
                  color="var(--color-gold-muted)"
                />
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "var(--color-warm-gray)",
                  }}
                >
                  Foto próximamente
                </p>
              </div>
              {/* Thin border inset */}
              <div
                style={{
                  position: "absolute",
                  inset: "1.5rem",
                  border: "1px solid rgba(184,151,90,0.2)",
                  pointerEvents: "none",
                }}
              />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// ─── Join the Flock ────────────────────────────────────────────────────────────
function JoinTheFlock() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="join"
      style={{
        backgroundColor: "var(--color-obsidian)",
        padding: "var(--section-pad) clamp(1.5rem, 6vw, 5rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Large background number */}
      <div
        style={{
          position: "absolute",
          bottom: "-2rem",
          left: "-1rem",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(10rem, 25vw, 30rem)",
          fontWeight: 300,
          color: "transparent",
          WebkitTextStroke: "1px rgba(184, 151, 90, 0.05)",
          lineHeight: 1,
          pointerEvents: "none",
          userSelect: "none",
        }}
        aria-hidden="true"
      >
        ∞
      </div>

      <div
        style={{
          maxWidth: "var(--content-max)",
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Label */}
        <AnimatedSection delay={0}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1.5rem",
              marginBottom: "clamp(2.5rem, 5vw, 4rem)",
            }}
          >
            <div
              style={{
                width: "2.5rem",
                height: "1px",
                backgroundColor: "var(--color-gold-muted)",
              }}
            />
            <BirdMotif variant="flying" size={28} color="var(--color-gold)" />
            <div
              style={{
                width: "2.5rem",
                height: "1px",
                backgroundColor: "var(--color-gold-muted)",
              }}
            />
          </div>
        </AnimatedSection>

        {/* Headline */}
        <StaggerContainer staggerDelay={0.15}>
          <StaggerItem>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.75rem, 4.5vw, 4rem)",
                fontWeight: 300,
                lineHeight: 1.15,
                color: "var(--color-cream)",
                marginBottom: "1rem",
              }}
            >
              Para mujeres que saben que{" "}
              <em style={{ color: "var(--color-gold-light)", fontStyle: "italic" }}>
                hay algo más.
              </em>
            </h2>
          </StaggerItem>

          <StaggerItem>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.1rem, 2vw, 1.75rem)",
                fontWeight: 300,
                fontStyle: "italic",
                color: "var(--color-blush)",
                lineHeight: 1.5,
                marginBottom: "0.75rem",
              }}
            >
              Más profundidad. Más verdad. Más vida.
            </p>
          </StaggerItem>

          <StaggerItem>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(0.85rem, 1.3vw, 1rem)",
                color: "var(--color-sand)",
                lineHeight: 1.75,
                maxWidth: "44ch",
                margin: "0 auto",
                marginBottom: "clamp(3rem, 6vw, 5rem)",
              }}
            >
              Un espacio para reconectar, elegir distinto y{" "}
              <span style={{ color: "var(--color-gold)" }}>CHRÉA[r]</span> desde
              quien realmente eres.
            </p>
          </StaggerItem>
        </StaggerContainer>

        {/* Email Form */}
        <AnimatedSection delay={0.4} direction="up">
          {status === "success" ? (
            <div
              style={{
                padding: "2rem",
                border: "1px solid var(--color-gold-muted)",
                display: "inline-block",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1rem, 1.8vw, 1.35rem)",
                  fontStyle: "italic",
                  color: "var(--color-gold-light)",
                }}
              >
                ✦ Bienvenida al flock.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                gap: "0",
                maxWidth: "480px",
                margin: "0 auto",
                flexWrap: "wrap",
              }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Tu correo"
                required
                style={{
                  flex: "1 1 200px",
                  padding: "1rem 1.25rem",
                  backgroundColor: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(184,151,90,0.3)",
                  borderRight: "none",
                  color: "var(--color-cream)",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.875rem",
                  letterSpacing: "0.05em",
                  outline: "none",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "var(--color-gold)";
                  e.target.style.backgroundColor = "rgba(255,255,255,0.08)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(184,151,90,0.3)";
                  e.target.style.backgroundColor = "rgba(255,255,255,0.05)";
                }}
              />
              <button
                type="submit"
                disabled={status === "loading"}
                style={{
                  flex: "0 0 auto",
                  padding: "1rem 1.75rem",
                  backgroundColor: status === "loading" ? "var(--color-gold-muted)" : "var(--color-gold)",
                  border: "1px solid var(--color-gold)",
                  color: "var(--color-obsidian)",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  cursor: status === "loading" ? "wait" : "pointer",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  if (status !== "loading")
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--color-gold-light)";
                }}
                onMouseLeave={(e) => {
                  if (status !== "loading")
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--color-gold)";
                }}
              >
                {status === "loading" ? "..." : "Unirse"}
              </button>
              {status === "error" && (
                <p
                  style={{
                    width: "100%",
                    textAlign: "center",
                    marginTop: "0.75rem",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.8rem",
                    color: "var(--color-blush)",
                  }}
                >
                  Algo salió mal. Intenta de nuevo.
                </p>
              )}
            </form>
          )}
        </AnimatedSection>

        {/* Fine print */}
        <AnimatedSection delay={0.5} direction="fade">
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.7rem",
              letterSpacing: "0.1em",
              color: "var(--color-warm-gray)",
              marginTop: "1.5rem",
            }}
          >
            Sin spam. Solo lo que importa.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "var(--color-cream-light)",
        padding: "clamp(3rem, 6vw, 5rem) clamp(1.5rem, 6vw, 5rem)",
        borderTop: "1px solid var(--color-cream-dark)",
      }}
    >
      <div
        style={{
          maxWidth: "var(--content-max)",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        {/* Sitting bird */}
        <BirdMotif variant="sitting" size={36} color="var(--color-gold-muted)" />

        {/* Brand */}
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.5rem",
            fontWeight: 300,
            letterSpacing: "0.15em",
            color: "var(--color-obsidian)",
          }}
        >
          CHRÉA
        </p>

        {/* Social links */}
        <nav
          style={{
            display: "flex",
            gap: "2rem",
            alignItems: "center",
          }}
          aria-label="Redes sociales"
        >
          {[
            { label: "Instagram", href: "#" },
            { label: "Spotify", href: "#" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.72rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--color-warm-gray)",
                textDecoration: "none",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-gold)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-warm-gray)";
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Copyright */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
          }}
        >
          <div
            style={{
              width: "1.5rem",
              height: "1px",
              backgroundColor: "var(--color-sand)",
            }}
          />
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.7rem",
              letterSpacing: "0.15em",
              color: "var(--color-warm-gray)",
            }}
          >
            CHRÉA © 2026
          </p>
          <div
            style={{
              width: "1.5rem",
              height: "1px",
              backgroundColor: "var(--color-sand)",
            }}
          />
        </div>
      </div>
    </footer>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <main>
      <Hero />
      <WhatThisSpaceHolds />
      <AboutFounder />
      <JoinTheFlock />
      <Footer />
    </main>
  );
}
