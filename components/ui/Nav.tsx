"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BirdMotif } from "./BirdMotif";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "1.25rem clamp(1.5rem, 6vw, 5rem)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: scrolled
            ? "rgba(250,247,242,0.92)"
            : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(196, 180, 154, 0.3)" : "1px solid transparent",
          transition: "background-color 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease",
        }}
      >
        {/* Brand wordmark */}
        <a
          href="/"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.25rem",
            fontWeight: 300,
            letterSpacing: "0.2em",
            color: "var(--color-obsidian)",
            textDecoration: "none",
            lineHeight: 1,
          }}
        >
          CHRÉA
        </a>

        {/* Desktop nav links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2.5rem",
          }}
          className="nav-desktop"
        >
          {[
            { label: "Espacio", href: "#espacio" },
            { label: "Christeena", href: "#christeena" },
            { label: "Unirse", href: "#join" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.72rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--color-charcoal)",
                textDecoration: "none",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-gold)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-charcoal)";
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          className="nav-mobile-btn"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "0.25rem",
            display: "none",
            flexDirection: "column",
            gap: "5px",
            alignItems: "flex-end",
          }}
        >
          <motion.span
            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
            transition={{ duration: 0.25 }}
            style={{
              display: "block",
              width: "24px",
              height: "1px",
              backgroundColor: "var(--color-obsidian)",
              transformOrigin: "center",
            }}
          />
          <motion.span
            animate={{ opacity: menuOpen ? 0 : 1, width: menuOpen ? 0 : "16px" }}
            transition={{ duration: 0.2 }}
            style={{
              display: "block",
              width: "16px",
              height: "1px",
              backgroundColor: "var(--color-obsidian)",
            }}
          />
          <motion.span
            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
            transition={{ duration: 0.25 }}
            style={{
              display: "block",
              width: "24px",
              height: "1px",
              backgroundColor: "var(--color-obsidian)",
              transformOrigin: "center",
            }}
          />
        </button>
      </motion.nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99,
              backgroundColor: "var(--color-obsidian)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "3rem",
            }}
          >
            {/* Bird decoration */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.2, y: 0 }}
              transition={{ delay: 0.15 }}
              style={{ position: "absolute", top: "8rem", right: "3rem" }}
            >
              <BirdMotif variant="flying" size={48} color="var(--color-gold)" />
            </motion.div>

            {[
              { label: "El Espacio", href: "#espacio" },
              { label: "Christeena", href: "#christeena" },
              { label: "Unirse al Flock", href: "#join" },
            ].map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: i * 0.07 + 0.1 }}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 6vw, 3.5rem)",
                  fontWeight: 300,
                  fontStyle: "italic",
                  color: "var(--color-cream)",
                  textDecoration: "none",
                  letterSpacing: "-0.01em",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-gold-light)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-cream)";
                }}
              >
                {link.label}
              </motion.a>
            ))}

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 0.5 }}
              style={{
                position: "absolute",
                bottom: "3rem",
                fontFamily: "var(--font-body)",
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--color-warm-gray)",
              }}
            >
              CHRÉA © 2026
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
