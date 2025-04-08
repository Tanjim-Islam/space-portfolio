"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { StarryBackground } from "@/components/StarryBackground"
import { Navigation } from "@/components/Navigation"
import { CustomCursor } from "@/components/CustomCursor"
import { ProjectCard } from "@/components/ProjectCard"
import { allProjects, navLinks } from "@/data/portfolioData"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

const categories = [
  { id: "all", name: "All Projects" },
  { id: "web", name: "Web Development" },
  { id: "ml", name: "Machine Learning" },
]

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [filteredProjects, setFilteredProjects] = useState(allProjects)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    let filtered = allProjects

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (project) =>
          project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Filter by category
    if (selectedCategory !== "all") {
      if (selectedCategory === "web") {
        filtered = filtered.filter(
          (project) =>
            project.name.includes("Shop") ||
            project.name.includes("Store") ||
            project.name.includes("Stay") ||
            project.name.includes("Portfolio") ||
            project.name.includes("Chess") ||
            project.name.includes("Algorithm"),
        )
      } else if (selectedCategory === "ml") {
        filtered = filtered.filter(
          (project) =>
            project.name.includes("Recognition") ||
            project.name.includes("Detection") ||
            project.name.includes("Prediction") ||
            project.name.includes("Disease") ||
            project.name.includes("Bot"),
        )
      }
    }

    setFilteredProjects(filtered)
  }, [selectedCategory, searchQuery])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  }

  return (
    <div className="relative min-h-screen text-white">
      <CustomCursor />
      <StarryBackground />
      <Navigation links={navLinks} />

      <div className="container mx-auto px-4 pb-8 pt-24">
        <div className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <Link href="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-4">
                <ArrowLeft size={16} className="mr-2" /> Back to Home
              </Link>
              <h1 className="text-4xl font-bold">My Projects</h1>
              <p className="text-gray-300 mt-2">Explore all my projects and experiments</p>
            </div>

            <div className="w-full md:w-auto mt-4 md:mt-0">
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full md:w-64 p-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full transition-all ${
                  selectedCategory === category.id
                    ? "bg-blue-500 text-white"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project, index) => (
              <motion.div key={index} variants={item}>
                <ProjectCard
                  name={project.name}
                  description={project.description}
                  image={project.image}
                  github={project.github}
                  demo={project.demo}
                />
              </motion.div>
            ))}
          </motion.div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl text-gray-400">No projects found matching your search criteria</h3>
              <button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("all")
                }}
                className="mt-4 px-4 py-2 bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
