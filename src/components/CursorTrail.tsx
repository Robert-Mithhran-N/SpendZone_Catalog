import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  type: "dot" | "star";
  maxLife: number;
  life: number;
  angle: number;
  spin: number;
}

const GOLD_PALETTE = [
  "#D4AF37", // Luxury Gold
  "#F2D06B", // Soft Gold
  "#E7C66B", // Warm Metallic Gold
];
const LAVENDER_GLOW = "#C5A3FF"; // Lavender Accent

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const lastMousePosRef = useRef({ x: 0, y: 0, active: false });
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // 1. Accessibility check
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 2. Setup config dynamically based on device size & touch capabilities
    const checkDeviceLimits = () => {
      const width = window.innerWidth;
      const isTouchOnly =
        window.matchMedia("(pointer: coarse)").matches ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0;

      if (isTouchOnly || width <= 768) {
        // Mobile
        return {
          maxParticles: 30,
          spawnDist: 20,
          starChance: 0.0, // Only dots for mobile performance
          lifeRange: { min: 60, max: 90 }, // shorter duration on mobile
        };
      } else if (width <= 1024) {
        // Tablet
        return {
          maxParticles: 75,
          spawnDist: 12,
          starChance: 0.05,
          lifeRange: { min: 90, max: 130 },
        };
      } else {
        // Desktop
        return {
          maxParticles: 150,
          spawnDist: 6,
          starChance: 0.1, // 10% stars, 90% dots
          lifeRange: { min: 120, max: 180 }, // 2-3 seconds at 60 FPS
        };
      }
    };

    let config = checkDeviceLimits();

    // 3. Retina scaling and resize handling
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      config = checkDeviceLimits();
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // 4. Star shape renderer
    const drawStar = (
      c: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      spikes: number,
      outerRadius: number,
      innerRadius: number,
    ) => {
      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      c.beginPath();
      c.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        c.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        c.lineTo(x, y);
        rot += step;
      }
      c.lineTo(cx, cy - outerRadius);
      c.closePath();
      c.fill();
    };

    // 5. Spawn logic
    const spawnParticle = (x: number, y: number) => {
      const particles = particlesRef.current;
      if (particles.length >= config.maxParticles) {
        particles.shift(); // Evict oldest
      }

      // 10% chance for Lavender, 90% Gold
      const color =
        Math.random() < 0.1
          ? LAVENDER_GLOW
          : GOLD_PALETTE[Math.floor(Math.random() * GOLD_PALETTE.length)];
      const type = Math.random() < config.starChance ? "star" : "dot";

      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 0.35 + 0.15; // slow weightless drift
      const maxLife = Math.floor(
        Math.random() * (config.lifeRange.max - config.lifeRange.min) + config.lifeRange.min,
      );

      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.1, // slight upward drift
        size: type === "star" ? Math.random() * 2 + 2 : Math.random() * 1.5 + 0.8,
        color,
        type,
        maxLife,
        life: maxLife,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.02,
      });
    };

    // 6. Track pointer moves
    const handleMove = (clientX: number, clientY: number) => {
      const lastPos = lastMousePosRef.current;

      if (!lastPos.active) {
        lastPos.x = clientX;
        lastPos.y = clientY;
        lastPos.active = true;
        spawnParticle(clientX, clientY);
        return;
      }

      const dx = clientX - lastPos.x;
      const dy = clientY - lastPos.y;
      const dist = Math.hypot(dx, dy);

      if (dist >= config.spawnDist) {
        // Interpolate along the path
        const steps = Math.floor(dist / config.spawnDist);
        for (let i = 0; i < steps; i++) {
          const t = (i + 1) / steps;
          const x = lastPos.x + dx * t;
          const y = lastPos.y + dy * t;
          spawnParticle(x, y);
        }
        lastPos.x = clientX;
        lastPos.y = clientY;
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onMouseLeave = () => {
      lastMousePosRef.current.active = false;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    // 7. Simulation and animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life--;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        // Apply physics
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.angle += p.spin;

        const progress = p.life / p.maxLife;

        ctx.save();

        if (p.type === "star") {
          // Draw sparkling star
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          ctx.fillStyle = p.color;
          // Apply a gentle scaling sparkle pulsing
          const scale = progress * (1 + Math.sin(p.life * 0.15) * 0.15);
          ctx.globalAlpha = Math.max(0, Math.min(1, progress * 0.85));
          drawStar(ctx, 0, 0, 4, p.size * scale, p.size * 0.22 * scale);
        } else {
          // Render glowing dot (luxury stardust)
          // 1. Soft halo glow
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.8, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0, progress * 0.16);
          ctx.fill();

          // 2. Solid core
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * progress, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0, progress);
          ctx.fill();
        }

        ctx.restore();
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // 8. Handle tab visibility to freeze loops
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        lastMousePosRef.current.active = false;
      } else {
        animate();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // 9. Component Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 40,
      }}
    />
  );
}
