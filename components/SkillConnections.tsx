"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"

interface Point {
  x: number
  y: number
  id: string
}

interface SkillConnectionsProps {
  points: Point[]
  maxDistance: number
}

export const SkillConnections: React.FC<SkillConnectionsProps> = ({ points, maxDistance }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 400 })

  useEffect(() => {
    const updateSize = () => {
      setCanvasSize({ width: window.innerWidth, height: 400 })
    }
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const drawConnections = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x
          const dy = points[i].y - points[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance
            ctx.beginPath()
            ctx.moveTo(points[i].x, points[i].y)
            ctx.lineTo(points[j].x, points[j].y)
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.2})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }
    }

    drawConnections()
  }, [points, maxDistance])

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 pointer-events-none" 
      width={canvasSize.width} 
      height={canvasSize.height} 
    />
  )
}
