"use client";

import { motion, useReducedMotion } from "motion/react";
import { useId } from "react";

type NetChartProps = {
  values: number[];
  target: number;
  max: number;
  labels?: string[];
  className?: string;
};

const W = 320;
const H = 140;
const PAD = { top: 12, right: 8, bottom: 22, left: 8 };

/** Önizleme amaçlı hafif SVG çizgi grafik (gerçek paneller Recharts kullanır). */
export function NetChart({ values, target, max, labels, className }: NetChartProps) {
  const reduce = useReducedMotion();
  const gradientId = `net-area-${useId().replace(/:/g, "")}`;
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;
  const x = (i: number) => PAD.left + (i / Math.max(values.length - 1, 1)) * innerW;
  const y = (v: number) => PAD.top + innerH - (v / max) * innerH;

  const line = values
    .map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(v).toFixed(1)}`)
    .join(" ");
  const area = `${line} L${x(values.length - 1)},${PAD.top + innerH} L${x(0)},${PAD.top + innerH} Z`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      role="img"
      aria-label="Örnek net gelişim grafiği"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((t) => (
        <line
          key={t}
          x1={PAD.left}
          x2={W - PAD.right}
          y1={PAD.top + innerH * t}
          y2={PAD.top + innerH * t}
          stroke="var(--color-border)"
          strokeDasharray="2 4"
        />
      ))}
      <line
        x1={PAD.left}
        x2={W - PAD.right}
        y1={y(target)}
        y2={y(target)}
        stroke="var(--color-accent)"
        strokeWidth={1.5}
        strokeDasharray="6 4"
      />
      <text
        x={W - PAD.right}
        y={y(target) - 4}
        textAnchor="end"
        fontSize="9"
        fill="var(--color-muted-foreground)"
      >
        Hedef {target}
      </text>
      <motion.path
        d={area}
        fill={`url(#${gradientId})`}
        initial={reduce ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      />
      <motion.path
        d={line}
        fill="none"
        stroke="var(--color-primary)"
        strokeWidth={2.25}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />
      {values.map((v, i) => (
        <circle
          key={i}
          cx={x(i)}
          cy={y(v)}
          r={2.75}
          fill="var(--color-card)"
          stroke="var(--color-primary)"
          strokeWidth={1.5}
        />
      ))}
      {labels?.map((label, i) => (
        <text
          key={label}
          x={x(i)}
          y={H - 6}
          textAnchor="middle"
          fontSize="9"
          fill="var(--color-muted-foreground)"
        >
          {label}
        </text>
      ))}
    </svg>
  );
}
