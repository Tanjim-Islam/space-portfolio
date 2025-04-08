"use client";

import type React from "react";
import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useAnimation } from "framer-motion";
import type { Skill } from "@/data/portfolioData";
import { categoryColors } from "@/data/portfolioData";

const BUBBLE_SPEED = 1; // Reduced speed for smoother movement

interface SkillBubbleProps {
  skill: Skill;
  containerWidth: number;
  containerHeight: number;
  onBubbleClick: (x: number, y: number) => void;
  isActive: boolean;
  setActiveBubble: (skillName: string | null) => void;
}

export const SkillBubble: React.FC<SkillBubbleProps> = ({
  skill,
  containerWidth,
  containerHeight,
  onBubbleClick,
  isActive,
  setActiveBubble,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(Math.random() * containerWidth);
  const y = useMotionValue(Math.random() * containerHeight);
  const controls = useAnimation();
  const velocityRef = useRef({
    x: (Math.random() - 0.5) * BUBBLE_SPEED,
    y: (Math.random() - 0.5) * BUBBLE_SPEED,
  });
  const [isTouched, setIsTouched] = useState(false);

  useEffect(() => {
    let animationFrameId: number;

    const updatePosition = () => {
      if (elementRef.current && !isActive) {
        const rect = elementRef.current.getBoundingClientRect();
        let newX = x.get() + velocityRef.current.x;
        let newY = y.get() + velocityRef.current.y;

        // Simple boundary check and collision response
        if (newX < 0 || newX > containerWidth - rect.width) {
          velocityRef.current.x *= -1;
          newX = Math.max(0, Math.min(newX, containerWidth - rect.width));
        }
        if (newY < 0 || newY > containerHeight - rect.height) {
          velocityRef.current.y *= -1;
          newY = Math.max(0, Math.min(newY, containerHeight - rect.height));
        }

        x.set(newX);
        y.set(newY);
      }

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    updatePosition();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [containerWidth, containerHeight, x, y, isActive]);

  const handleClick = (event: React.MouseEvent) => {
    onBubbleClick(event.clientX, event.clientY);
    setActiveBubble(isActive ? null : skill.name);
  };

  const handleTouchStart = () => {
    setIsTouched(true);
    setActiveBubble(isActive ? null : skill.name);
  };

  const handleTouchEnd = () => {
    setIsTouched(false);
  };

  return (
    <motion.div
      ref={elementRef}
      className="absolute backdrop-blur-sm rounded-full cursor-pointer"
      style={{
        background: `linear-gradient(45deg, ${
          categoryColors[skill.category]
        }33, ${categoryColors[skill.category]}66)`,
        boxShadow: `0 0 ${skill.level * 4}px ${categoryColors[skill.category]}`,
        x,
        y,
      }}
      animate={controls}
      whileHover={{
        scale: 1.1,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      onHoverStart={() => !isTouched && setActiveBubble(skill.name)}
      onHoverEnd={() => !isTouched && setActiveBubble(null)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative px-4 py-2 group">
        <span className="text-white">{skill.name}</span>

        {/* Skill level indicators */}
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-1 h-1 rounded-full"
              style={{
                backgroundColor:
                  i < skill.level
                    ? categoryColors[skill.category]
                    : "rgba(255,255,255,0.2)",
              }}
            />
          ))}
        </div>

        {/* Tooltip */}
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-black/90 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <p
            className="font-semibold mb-1"
            style={{ color: categoryColors[skill.category] }}
          >
            {skill.category.toUpperCase()}
          </p>
          <p className="text-white/80">{skill.description}</p>
        </div>
      </div>
    </motion.div>
  );
};
