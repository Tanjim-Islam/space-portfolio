"use client"

import type React from "react"
import { useRef, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import type { Skill } from "@/data/portfolioData"
import { categoryColors } from "@/data/portfolioData"

interface SkillBubbleProps {
  skill: Skill
  containerWidth: number
  containerHeight: number
  onPositionUpdate: (id: string, x: number, y: number, radius: number, velocity: { x: number; y: number }) => void
  onBubbleClick: (x: number, y: number) => void
}

export const SkillBubble: React.FC<SkillBubbleProps> = ({
  skill,
  containerWidth,
  containerHeight,
  onPositionUpdate,
  onBubbleClick,
}) => {
  const controls = useAnimation()
  const elementRef = useRef<HTMLDivElement>(null)
  const velocityRef = useRef({ x: (Math.random() - 0.5) * 1.5, y: (Math.random() - 0.5) * 1.5 })
  const positionRef = useRef({ x: Math.random() * (containerWidth - 100), y: Math.random() * (containerHeight - 40) })

  useEffect(() => {
    const updatePosition = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect()
        const radius = rect.width / 2

        // Update position based on velocity
        positionRef.current.x += velocityRef.current.x
        positionRef.current.y += velocityRef.current.y

        // Bounce off container walls with minimum speed
        const minSpeed = 0.8
        if (positionRef.current.x < 0 || positionRef.current.x > containerWidth - rect.width) {
          velocityRef.current.x *= -1
          velocityRef.current.x = Math.sign(velocityRef.current.x) * Math.max(Math.abs(velocityRef.current.x), minSpeed)
        }
        if (positionRef.current.y < 0 || positionRef.current.y > containerHeight - rect.height) {
          velocityRef.current.y *= -1
          velocityRef.current.y = Math.sign(velocityRef.current.y) * Math.max(Math.abs(velocityRef.current.y), minSpeed)
        }

        // Keep within bounds
        positionRef.current.x = Math.max(0, Math.min(positionRef.current.x, containerWidth - rect.width))
        positionRef.current.y = Math.max(0, Math.min(positionRef.current.y, containerHeight - rect.height))

        // Update position and notify parent
        controls.set({
          x: positionRef.current.x,
          y: positionRef.current.y,
        })

        onPositionUpdate(
          skill.name,
          positionRef.current.x + radius,
          positionRef.current.y + radius,
          radius,
          velocityRef.current,
        )
      }
    }

    const interval = setInterval(updatePosition, 16)
    return () => clearInterval(interval)
  }, [controls, skill.name, onPositionUpdate, containerWidth, containerHeight])

  const handleClick = (event: React.MouseEvent) => {
    onBubbleClick(event.clientX, event.clientY)
  }

  return (
    <motion.div
      ref={elementRef}
      className="absolute backdrop-blur-sm rounded-full cursor-pointer"
      style={{
        background: `linear-gradient(45deg, ${categoryColors[skill.category]}33, ${categoryColors[skill.category]}66)`,
        boxShadow: `0 0 ${skill.level * 4}px ${categoryColors[skill.category]}`,
      }}
      initial={{ x: positionRef.current.x, y: positionRef.current.y }}
      animate={controls}
      whileHover={{
        scale: 1.1,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
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
                backgroundColor: i < skill.level ? categoryColors[skill.category] : "rgba(255,255,255,0.2)",
              }}
            />
          ))}
        </div>

        {/* Tooltip */}
        <div 
          className="absolute z-50 p-2 bg-black/90 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none w-48"
          style={{
            bottom: "100%",
            left: "50%",
            transform: `translate(${
              positionRef.current.x > containerWidth - 200 ? "-100%" :
              positionRef.current.x < 200 ? "0%" :
              "-50%"
            }, 8px)`,
          }}
        >
          <p className="font-semibold mb-1" style={{ color: categoryColors[skill.category] }}>
            {skill.category.toUpperCase()}
          </p>
          <p className="text-white/80">{skill.description}</p>
        </div>
      </div>
    </motion.div>
  )
}
