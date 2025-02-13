"use client"

import type React from "react"
import { useRef, useEffect } from "react"
import VanillaTilt from "vanilla-tilt"

interface TiltCardProps {
  children: React.ReactNode
  className?: string
}

export const TiltCard: React.FC<TiltCardProps> = ({ children, className = "" }) => {
  const tiltRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tiltNode = tiltRef.current
    const vanillaTiltOptions = {
      max: 25,
      speed: 400,
      glare: true,
      "max-glare": 0.5,
    }

    VanillaTilt.init(tiltNode!, vanillaTiltOptions)

    return () => {
      if (tiltNode) {
        ;(tiltNode as any).vanillaTilt.destroy()
      }
    }
  }, [])

  return (
    <div ref={tiltRef} className={`${className} transform transition-all duration-300 ease-out hover:scale-105`}>
      {children}
    </div>
  )
}

