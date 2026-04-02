"use client";

import { motion, useScroll, useTransform, useAnimate } from "framer-motion";
import { useRef, useEffect } from "react";

interface BirdMotifProps {
  variant?: "flying" | "sitting";
  size?: number;
  color?: string;
  className?: string;
}

export function BirdMotif({
  variant = "flying",
  size = 40,
  color = "var(--color-gold)",
  className = "",
}: BirdMotifProps) {
  return (
    <motion.svg
      width={size}
      height={size * 0.5}
      viewBox="0 0 40 20"
      fill="none"
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      {variant === "flying" ? (
        <motion.path
          d="M2 10 C8 4, 14 3, 20 7 C26 3, 32 4, 38 10 C30 8, 24 9, 20 12 C16 9, 10 8, 2 10Z"
          fill={color}
          opacity={0.85}
          animate={{
            d: [
              "M2 10 C8 4, 14 3, 20 7 C26 3, 32 4, 38 10 C30 8, 24 9, 20 12 C16 9, 10 8, 2 10Z",
              "M2 10 C8 6, 14 6, 20 9 C26 6, 32 6, 38 10 C30 9, 24 10, 20 12 C16 10, 10 9, 2 10Z",
              "M2 10 C8 4, 14 3, 20 7 C26 3, 32 4, 38 10 C30 8, 24 9, 20 12 C16 9, 10 8, 2 10Z",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ) : (
        <motion.g>
          {/* Sitting bird body */}
          <ellipse cx="20" cy="13" rx="8" ry="5" fill={color} opacity={0.8} />
          {/* Head */}
          <circle cx="26" cy="9" r="3.5" fill={color} opacity={0.85} />
          {/* Beak */}
          <path d="M29 9 L33 8.5 L29 10Z" fill={color} opacity={0.7} />
          {/* Tail */}
          <path
            d="M12 13 C9 12, 7 14, 8 16 C10 15, 12 14, 14 15Z"
            fill={color}
            opacity={0.75}
          />
        </motion.g>
      )}
    </motion.svg>
  );
}

// ─── Logo Bird Animation ────────────────────────────────────────────────────────
// Per brand PDF: "la animación convierte la tilde en la E del logo, en la cola
// del pájaro, para así después formar la figura entera y volar"
// Sequence: CHRÉA text → tilde morphs into bird tail → full bird forms → flies away → É restored
export function LogoBirdAnimation({ className = "" }: { className?: string }) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const seq = async () => {
      // Step 0: Start — show CHRÉA with normal É accent (opacity 1)
      // Small pause before starting
      await new Promise((r) => setTimeout(r, 600));

      // Step 1: The tilde accent starts to stretch & glow (0.4s)
      await animate(
        "#tilde-stroke",
        { scaleX: 1.4, scaleY: 0.7, opacity: [0.7, 1], fill: "var(--color-gold)" },
        { duration: 0.4, ease: "easeInOut" }
      );

      // Step 2: Tilde morphs into tail shape — the É starts fading (0.5s)
      await animate(
        "#tilde-stroke",
        { scaleX: 1.8, scaleY: 0.5 },
        { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
      );

      // Step 3: Bird body fades in around the tail (0.6s)
      await animate(
        "#bird-body",
        { opacity: 1, scale: 1 },
        { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
      );

      // Step 4: É letter fades back slightly (bird is "detaching") (0.4s)
      await animate(
        "#e-accent",
        { opacity: 0.3 },
        { duration: 0.4, ease: "easeIn" }
      );

      // Step 5: Bird flies away — up-right arc (0.9s)
      await animate(
        "#bird-body",
        {
          x: [0, 30, 80],
          y: [0, -20, -60],
          opacity: [1, 1, 0],
          scale: [1, 0.85, 0.6],
        },
        { duration: 0.9, ease: [0.45, 0, 0.55, 1] }
      );

      // Step 6: É accent tilde restores (0.35s)
      await animate(
        "#e-accent",
        { opacity: 1 },
        { duration: 0.35, ease: "easeOut" }
      );
      await animate(
        "#tilde-stroke",
        { scaleX: 1, scaleY: 1, opacity: 0 },
        { duration: 0.3, ease: "easeOut" }
      );
    };

    seq();
  }, [animate]);

  return (
    <div
      ref={scope}
      className={className}
      style={{
        position: "relative",
        display: "inline-block",
        lineHeight: 1,
      }}
    >
      {/* The main CHRÉA text */}
      <span
        id="e-accent"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(3rem, 7.5vw, 8rem)",
          fontWeight: 300,
          letterSpacing: "-0.02em",
          color: "var(--color-obsidian)",
          lineHeight: 1.05,
          display: "inline-block",
          position: "relative",
        }}
      >
        CHRÉA
      </span>

      {/* Animated tilde overlay — sits over the É */}
      <motion.svg
        id="tilde-stroke"
        width="24"
        height="12"
        viewBox="0 0 24 12"
        fill="none"
        initial={{ opacity: 0.7, scaleX: 1, scaleY: 1 }}
        style={{
          position: "absolute",
          /* Approximate position of accent over É in CHRÉA — 4th of 5 chars = ~68% from left */
          left: "calc(68% - 12px)",
          top: "-4px",
          transformOrigin: "center",
          pointerEvents: "none",
          overflow: "visible",
        }}
      >
        {/* Tilde / accent shape */}
        <path
          d="M2 8 C5 4, 8 4, 12 6 C16 8, 19 8, 22 4"
          stroke="var(--color-gold)"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />
      </motion.svg>

      {/* Bird silhouette — starts at É position, flies away */}
      <motion.svg
        id="bird-body"
        width="48"
        height="24"
        viewBox="0 0 48 24"
        fill="none"
        initial={{ opacity: 0, scale: 0.6 }}
        style={{
          position: "absolute",
          left: "calc(68% - 24px)",
          top: "-14px",
          transformOrigin: "center",
          pointerEvents: "none",
          overflow: "visible",
        }}
      >
        {/* Full bird silhouette — wings + body */}
        <path
          d="M2 12 C8 4, 16 2, 24 8 C32 2, 40 4, 46 12 C36 10, 28 11, 24 14 C20 11, 12 10, 2 12Z"
          fill="var(--color-gold)"
          opacity={0.9}
        />
        {/* Tail detail */}
        <path
          d="M18 13 C15 15, 13 18, 15 20 C17 18, 19 16, 21 17Z"
          fill="var(--color-gold)"
          opacity={0.75}
        />
      </motion.svg>
    </div>
  );
}

// Parallax bird for hero
export function ParallaxBird({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const x = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ y, x, opacity }}
      className={`absolute pointer-events-none ${className}`}
    >
      <BirdMotif variant="flying" size={56} color="var(--color-gold)" />
    </motion.div>
  );
}

// Small atmospheric bird for hero scatter
export function AtmosphericBird({
  size = 24,
  opacity = 0.08,
  delay = 0,
  color = "var(--color-obsidian)",
  style = {},
}: {
  size?: number;
  opacity?: number;
  delay?: number;
  color?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      style={{ position: "absolute", opacity, ...style }}
      initial={{ opacity: 0 }}
      animate={{ opacity }}
      transition={{ duration: 1.5, delay }}
    >
      <BirdMotif variant="flying" size={size} color={color} />
    </motion.div>
  );
}
