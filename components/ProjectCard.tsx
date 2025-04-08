"use client"

import type React from "react"
import { Github, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"

interface ProjectCardProps {
  name: string
  description: string
  image: string
  github: string
  demo: string | null
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ name, description, image, github, demo }) => {
  const handleCardClick = () => {
    if (demo) {
      window.open(demo, "_blank")
    } else {
      window.open(github, "_blank")
    }
  }

  return (
    <motion.div
      className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden h-full cursor-pointer group"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      onClick={handleCardClick}
    >
      <div className="relative">
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4">
          <span className="text-white text-sm flex items-center gap-1">
            {demo ? "View Live Demo" : "View on GitHub"} <ExternalLink size={14} />
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-white">{name}</h3>
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
          >
            <Github size={18} className="text-white" />
          </a>
        </div>
        <p className="text-gray-300">{description}</p>
      </div>
    </motion.div>
  )
}
