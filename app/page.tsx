"use client"

import type React from "react"
import { Facebook, Github, Linkedin, Mail } from "lucide-react"
import toast, { Toaster } from "react-hot-toast"
import { StarryBackground } from "@/components/StarryBackground"
import { Navigation } from "@/components/Navigation"
import { AnimatedText } from "@/components/AnimatedText"
import { Card } from "@/components/Card"
import { Button } from "@/components/Button"
import { SocialIcon } from "@/components/SocialIcon"
import { CustomCursor } from "@/components/CustomCursor"
import { SkillCloud } from "@/components/SkillCloud"
import { Contact } from "@/components/Contact"
import { navLinks, experiences, portfolio, skills } from "@/data/portfolioData"

const PortfolioPage: React.FC = () => {
  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    navigator.clipboard.writeText("example@email.com")
    toast.success("Email Copied!", {
      style: {
        background: "#333",
        color: "#fff",
      },
      position: "top-center",
    })
  }

  return (
    <div className="relative min-h-screen text-white">
      <CustomCursor />
      <Toaster />
      <StarryBackground />

      <Navigation links={navLinks} />

      <div className="container mx-auto px-4 py-20">
        <section id="hero" className="mb-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Tanjim Islam Riju</h1>
          <AnimatedText texts={["Software Engineer", "AI Developer"]} />
        </section>

        <section id="education" className="mb-20">
          <h2 className="text-3xl font-semibold mb-6">Education</h2>
          <Card>
            <h3 className="text-xl font-semibold mb-2">Bachelor of Science in Computer Science</h3>
            <p className="text-gray-300">University of Example, 2020-2024</p>
          </Card>
        </section>

        <section id="skills" className="mb-20">
          <h2 className="text-3xl font-semibold mb-6">Skills</h2>
          <Card noPadding>
            <SkillCloud skills={skills} />
          </Card>
        </section>

        <section id="portfolio" className="mb-20">
          <h2 className="text-3xl font-semibold mb-6">Portfolio</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolio.map((project, index) => (
              <Card key={index} tilt={true}>
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.name}
                  className="w-full h-40 object-cover mb-4 rounded-xl"
                />
                <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-300 hover:underline"
                >
                  View Project
                </a>
              </Card>
            ))}
          </div>
        </section>

        <section id="experience" className="mb-20">
          <h2 className="text-3xl font-semibold mb-6">Experience</h2>
          {experiences.map((exp, index) => (
            <Card key={index} className="mb-6">
              <h3 className="text-xl font-semibold mb-2">{exp.title}</h3>
              <p className="text-gray-300 mb-2">
                {exp.company_name} | {exp.date}
              </p>
              <ul className="list-disc list-inside text-gray-300">
                {exp.details.map((detail, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: detail }}></li>
                ))}
              </ul>
            </Card>
          ))}
        </section>

        <Contact />

        <footer className="text-center py-8">
          <p className="mb-6">&copy; 2023 Tanjim Islam Riju. All rights reserved.</p>
          <div className="flex justify-center items-center space-x-4">
            <SocialIcon icon={Facebook} href="https://facebook.com" />
            <SocialIcon icon={Github} href="https://github.com" />
            <SocialIcon icon={Linkedin} href="https://linkedin.com" />
            <SocialIcon icon={Mail} href="#" onClick={handleEmailClick} />
          </div>
        </footer>
      </div>
    </div>
  )
}

export default PortfolioPage
