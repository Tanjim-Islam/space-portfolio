"use client";

import type React from "react";
import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SkillBubble } from "./SkillBubble";
import type { Skill } from "@/data/portfolioData";

interface SkillCloudProps {
  skills: Skill[];
}

export const SkillCloud: React.FC<SkillCloudProps> = ({ skills }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null);
  const [activeBubble, setActiveBubble] = useState<string | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      const updateDimensions = () => {
        setDimensions({
          width: containerRef.current?.offsetWidth || 0,
          height: containerRef.current?.offsetHeight || 0,
        });
      };

      updateDimensions();
      window.addEventListener("resize", updateDimensions);

      return () => window.removeEventListener("resize", updateDimensions);
    }
  }, []);

  const handleBubbleClick = (x: number, y: number) => {
    setRipple({ x, y });
    setTimeout(() => setRipple(null), 1000);
  };

  return (
    <div
      ref={containerRef}
      className="relative h-[400px] w-full overflow-hidden"
    >
      {dimensions.width > 0 &&
        dimensions.height > 0 &&
        skills.map((skill) => (
          <SkillBubble
            key={skill.name}
            skill={skill}
            containerWidth={dimensions.width}
            containerHeight={dimensions.height}
            onBubbleClick={handleBubbleClick}
            isActive={activeBubble === skill.name}
            setActiveBubble={setActiveBubble}
          />
        ))}

      <AnimatePresence>
        {ripple && (
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute w-20 h-20 rounded-full border-2 border-white pointer-events-none"
            style={{
              left: ripple.x - 40,
              top: ripple.y - 40,
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
