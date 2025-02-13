"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SkillBubble } from "./SkillBubble"
import { SkillConnections } from "./SkillConnections"
import type { Skill } from "@/data/portfolioData"

interface SkillCloudProps {
  skills: Skill[]
}

interface Point {
  x: number
  y: number
  id: string
  radius: number
  velocity: {
    x: number
    y: number
  }
}

export const SkillCloud: React.FC<SkillCloudProps> = ({ skills }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [points, setPoints] = useState<Point[]>([])
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null)

  useEffect(() => {
    if (containerRef.current) {
      const updateDimensions = () => {
        setDimensions({
          width: containerRef.current?.offsetWidth || 0,
          height: containerRef.current?.offsetHeight || 0,
        })
      }

      updateDimensions()
      window.addEventListener("resize", updateDimensions)

      return () => window.removeEventListener("resize", updateDimensions)
    }
  }, [])

  const handlePositionUpdate = (
    id: string,
    x: number,
    y: number,
    radius: number,
    velocity: { x: number; y: number },
  ) => {
    setPoints((prev) => {
      const newPoints = prev.map((p) => (p.id === id ? { ...p, x, y, radius, velocity } : p))

      // Collision detection and response
      for (let i = 0; i < newPoints.length; i++) {
        for (let j = i + 1; j < newPoints.length; j++) {
          const dx = newPoints[j].x - newPoints[i].x
          const dy = newPoints[j].y - newPoints[i].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const minDistance = newPoints[i].radius + newPoints[j].radius

          if (distance < minDistance) {
            // Calculate collision normal
            const nx = dx / distance
            const ny = dy / distance

            // Calculate relative velocity
            const vx = newPoints[i].velocity.x - newPoints[j].velocity.x
            const vy = newPoints[i].velocity.y - newPoints[j].velocity.y

            // Calculate relative velocity in terms of the normal direction
            const velocityAlongNormal = vx * nx + vy * ny

            // Do not resolve if velocities are separating
            if (velocityAlongNormal > 0) continue

            // Calculate restitution (bounciness)
            const restitution = 0.8

            // Calculate impulse scalar
            const impulseScalar = (-(1 + restitution) * velocityAlongNormal) / 2

            // Apply impulse while maintaining consistent speed
            const baseSpeed = 1
            newPoints[i].velocity.x -= impulseScalar * nx
            newPoints[i].velocity.y -= impulseScalar * ny
            newPoints[j].velocity.x += impulseScalar * nx
            newPoints[j].velocity.y += impulseScalar * ny

            // Normalize velocities to maintain consistent speed
            const normalizeVelocity = (point: Point) => {
              const speed = Math.sqrt(point.velocity.x * point.velocity.x + point.velocity.y * point.velocity.y)
              if (speed !== 0) {
                point.velocity.x = (point.velocity.x / speed) * baseSpeed
                point.velocity.y = (point.velocity.y / speed) * baseSpeed
              }
            }

            normalizeVelocity(newPoints[i])
            normalizeVelocity(newPoints[j])

            // Move bubbles apart to prevent overlap
            const correction = (minDistance - distance) / distance * 0.5
            const correctionX = correction * nx
            const correctionY = correction * ny

            newPoints[i].x -= correctionX * newPoints[i].radius
            newPoints[i].y -= correctionY * newPoints[i].radius
            newPoints[j].x += correctionX * newPoints[j].radius
            newPoints[j].y += correctionY * newPoints[j].radius
          }
        }
      }

      return newPoints
    })
  }

  const handleBubbleClick = (x: number, y: number) => {
    setRipple({ x, y })
    setTimeout(() => setRipple(null), 1000)
  }

  return (
    <div ref={containerRef} className="relative h-[400px] w-full overflow-hidden">
      <SkillConnections points={points} maxDistance={150} />

      {dimensions.width > 0 &&
        dimensions.height > 0 &&
        skills.map((skill) => (
          <SkillBubble
            key={skill.name}
            skill={skill}
            containerWidth={dimensions.width}
            containerHeight={dimensions.height}
            onPositionUpdate={handlePositionUpdate}
            onBubbleClick={handleBubbleClick}
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
  )
}
