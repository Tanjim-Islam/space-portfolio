"use client"

import type React from "react"
import { useRef, useState } from "react"
import { motion } from "framer-motion"

interface NavLink {
  id: string
  title: string
}

interface NavigationProps {
  links: NavLink[]
}

interface Position {
  left: number
  width: number
  opacity: number
}

export const Navigation: React.FC<NavigationProps> = ({ links }) => {
  const [position, setPosition] = useState<Position>({
    left: 0,
    width: 0,
    opacity: 0,
  })

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <nav className="fixed top-2 left-1/2 transform -translate-x-1/2 z-10 w-full px-4 sm:px-0 sm:w-auto">
      <ul
        onMouseLeave={() => {
          setPosition((pv) => ({
            ...pv,
            opacity: 0,
          }))
        }}
        className="relative mx-auto flex w-fit max-w-full items-center rounded-full backdrop-filter backdrop-blur-[1px] backdrop-saturate-[100%] bg-[rgba(27,29,32,0.75)] border border-[rgba(255,255,255,0.125)] p-1 overflow-hidden"
      >
        {links.map((link) => (
          <Tab key={link.id} setPosition={setPosition}>
            <a
              href={`#${link.id}`}
              onClick={(e) => handleClick(e, link.id)}
              className="flex items-center justify-center h-full w-full text-white hover:text-blue-300 transition"
            >
              {link.title}
            </a>
          </Tab>
        ))}
        <Cursor position={position} />
      </ul>
    </nav>
  )
}

const Tab: React.FC<{
  children: React.ReactNode
  setPosition: React.Dispatch<React.SetStateAction<Position>>
}> = ({ children, setPosition }) => {
  const ref = useRef<HTMLLIElement>(null)

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return

        const { width } = ref.current.getBoundingClientRect()

        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        })
      }}
      className="relative z-10 flex items-center justify-center h-7 px-2.5 cursor-pointer text-[11px] uppercase text-white mix-blend-difference md:h-8 md:px-4 md:text-sm whitespace-nowrap"
    >
      {children}
    </li>
  )
}

const Cursor: React.FC<{ position: Position }> = ({ position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30,
      }}
      className="absolute z-0 h-full top-0 rounded-full bg-white/20"
    />
  )
}

