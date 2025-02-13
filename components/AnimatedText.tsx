"use client"

import type React from "react"
import { useState, useEffect } from "react"

interface AnimatedTextProps {
  texts: string[]
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ texts }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length)
    }, 1000)

    return () => clearInterval(interval)
  }, [texts])

  return (
    <div className="h-8 relative">
      {texts.map((text, index) => (
        <div
          key={index}
          className={`absolute w-full text-center transition-all duration-500 ${
            index === currentTextIndex ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {text}
        </div>
      ))}
    </div>
  )
}

