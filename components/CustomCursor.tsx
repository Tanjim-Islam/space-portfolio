"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useSpring, useMotionValue } from "framer-motion"

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [cursorSize, setCursorSize] = useState(10)
  const [particles, setParticles] = useState<{ x: number; y: number; id: number }[]>([])
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 700 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)

      // Create particles with a rate limit
      if (Math.random() > 0.8) {
        const newParticle = {
          x: e.clientX,
          y: e.clientY,
          id: Date.now(),
        }
        setParticles((prev) => [...prev.slice(-5), newParticle]) // Keep only last 5 particles
      }
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === "A" || target.tagName === "BUTTON") {
        setCursorSize(30)
      }
    }

    const handleMouseOut = () => {
      setCursorSize(10)
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseover", handleMouseOver)
    document.addEventListener("mouseout", handleMouseOut)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseover", handleMouseOver)
      document.removeEventListener("mouseout", handleMouseOut)
    }
  }, [mouseX, mouseY])

  return (
    <>
      <motion.div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-50 hidden mix-blend-difference md:block"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        <motion.div
          className="relative flex h-2.5 w-2.5 items-center justify-center rounded-full bg-white"
          animate={{
            width: cursorSize,
            height: cursorSize,
          }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 15,
          }}
        />
      </motion.div>
      {particles.map((particle, i) => (
        <motion.div
          key={particle.id}
          className="pointer-events-none fixed left-0 top-0 z-40 h-1 w-1 rounded-full bg-white/30 mix-blend-difference"
          initial={{ x: particle.x, y: particle.y, opacity: 0.5, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{
            x: particle.x,
            y: particle.y,
          }}
        />
      ))}
    </>
  )
}

