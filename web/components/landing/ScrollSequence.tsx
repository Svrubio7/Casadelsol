"use client";

import { useEffect, useRef } from "react";
import { useMotionValueEvent, type MotionValue } from "motion/react";

/**
 * Paints a frame sequence onto a <canvas>, with the frame index driven by
 * `progress` (0→1). Scroll advances; scrolling back rewinds. Frame-accurate
 * and reversible — the Apple-style scrub, without video seeking jank.
 */
export default function ScrollSequence({
  progress,
  frameCount,
  basePath = "/hero/frames/frame-",
  ext = ".jpg",
  className,
}: {
  progress: MotionValue<number>;
  frameCount: number;
  basePath?: string;
  ext?: string;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedRef = useRef<boolean[]>([]);
  const currentRef = useRef(0);

  useEffect(() => {
    const pad = (n: number) => String(n).padStart(3, "0");

    const draw = (index: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;

      let img: HTMLImageElement | undefined = loadedRef.current[index]
        ? imagesRef.current[index]
        : undefined;
      if (!img) {
        for (let d = 1; d < frameCount; d++) {
          if (loadedRef.current[index - d]) {
            img = imagesRef.current[index - d];
            break;
          }
          if (loadedRef.current[index + d]) {
            img = imagesRef.current[index + d];
            break;
          }
        }
      }
      if (!img) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
    };

    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      draw(currentRef.current);
    };

    // Load every Nth frame to roughly halve the payload; draw() falls back to
    // the nearest loaded frame, so the scrub stays smooth.
    const STEP = 2;
    imagesRef.current = new Array(frameCount);
    loadedRef.current = new Array(frameCount).fill(false);

    const loadFrame = (i: number) => {
      if (i < 0 || i >= frameCount || imagesRef.current[i]) return;
      const img = new Image();
      img.src = `${basePath}${pad(i + 1)}${ext}`;
      img.onload = () => {
        loadedRef.current[i] = true;
        if (Math.abs(i - currentRef.current) <= STEP) draw(currentRef.current);
      };
      imagesRef.current[i] = img;
    };

    // First frame immediately so the sequence can paint once scrolled into;
    // defer the rest to idle time so they never compete with the LCP.
    loadFrame(0);
    const idle: number =
      "requestIdleCallback" in window
        ? window.requestIdleCallback(() => {
            for (let i = STEP; i < frameCount; i += STEP) loadFrame(i);
            loadFrame(frameCount - 1);
          }, { timeout: 2500 })
        : (setTimeout(() => {
            for (let i = STEP; i < frameCount; i += STEP) loadFrame(i);
            loadFrame(frameCount - 1);
          }, 1200) as unknown as number);

    resize();
    window.addEventListener("resize", resize);

    // expose draw for the scroll handler below
    drawRef.current = draw;
    return () => {
      window.removeEventListener("resize", resize);
      if ("cancelIdleCallback" in window) window.cancelIdleCallback(idle);
      else clearTimeout(idle);
    };
  }, [frameCount, basePath, ext]);

  const drawRef = useRef<(i: number) => void>(() => {});

  useMotionValueEvent(progress, "change", (v) => {
    const idx = Math.min(frameCount - 1, Math.max(0, Math.round(v * (frameCount - 1))));
    if (idx === currentRef.current) return;
    currentRef.current = idx;
    requestAnimationFrame(() => drawRef.current(idx));
  });

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}
