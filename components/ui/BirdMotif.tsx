"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface BirdMotifProps {
  variant?: "flying" | "sitting";
  size?: number;
  color?: string;
  className?: string;
}

// Minimalist bird SVG paths
const FLYING_BIRD_PATH =
  "M0 10 C5 2, 15 0, 20 5 C25 0, 35 -2, 40 5 C30 8, 20 12, 0 10Z";
const SITTING_BIRD_PATH =
  "M10 0 C12 -4, 18 -4, 20 0 L22 6 C18 4, 12 4, 10 6 L8 4 C6 8, 6 12, 10 14 C8 14, 2 12, 2 6Z";

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

// The animated É → Bird transformation concept
export function LogoBird({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`relative inline-block ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Tilde accent that animates into bird tail */}
      <motion.svg
        width="60"
        height="20"
        viewBox="0 0 60 20"
        fill="none"
        className="absolute -top-3 left-1/2 -translate-x-1/2"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
      >
        <motion.path
          d="M10 10 C18 4, 22 4, 30 8 C38 12, 42 12, 50 6"
          stroke="var(--color-gold)"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          animate={{
            d: [
              "M10 10 C18 4, 22 4, 30 8 C38 12, 42 12, 50 6",
              "M5 8 C15 2, 25 0, 35 5 C42 8, 48 4, 55 6",
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      </motion.svg>
    </motion.div>
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
