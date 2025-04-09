"use client";

import type React from "react";
import { Github, Linkedin, Mail, ExternalLink, Facebook } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { StarryBackground } from "@/components/StarryBackground";
import { Navigation } from "@/components/Navigation";
import { AnimatedText } from "@/components/AnimatedText";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { SocialIcon } from "@/components/SocialIcon";
import { CustomCursor } from "@/components/CustomCursor";
import { SkillCloud } from "@/components/SkillCloud";
import {
  navLinks,
  experiences,
  portfolio,
  skills,
  education,
  research,
} from "@/data/portfolioData";
import Link from "next/link";

const PortfolioPage: React.FC = () => {
  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigator.clipboard.writeText("tanjim.riju1243@gmail.com");
    toast.success("Email Copied!", {
      style: {
        background: "#333",
        color: "#fff",
      },
      position: "top-center",
    });
  };

  return (
    <div className="relative min-h-screen text-white">
      <CustomCursor />
      <Toaster />
      <StarryBackground />

      <Navigation links={navLinks} />

      <div className="container mx-auto px-4 pb-8">
        <section id="hero" className="pt-24 mb-20 text-center">
          {" "}
          {/* Added pt-24 for top padding */}
          <h1 className="text-4xl font-bold mb-4">Tanjim Islam Riju</h1>
          <AnimatedText texts={["Software Engineer", "AI Developer"]} />
        </section>

        <section id="education" className="mb-20">
          <h2 className="text-3xl font-semibold mb-6">Education</h2>
          {education.map((edu, index) => (
            <Card
              key={index}
              className="mb-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/20"
            >
              <h3 className="text-xl font-semibold mb-2">{edu.degree}</h3>
              <p className="text-gray-300">
                {edu.institution}, {edu.date}
              </p>
            </Card>
          ))}
        </section>

        <section id="skills" className="mb-20">
          <h2 className="text-3xl font-semibold mb-6">Skills</h2>
          <Card noPadding>
            <SkillCloud skills={skills} />
          </Card>
        </section>

        <section id="portfolio" className="mb-20">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-semibold">Portfolio</h2>
            <Link href="/projects">
              <Button className="w-full flex items-center justify-center gap-2 bg-transparent border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50">
                View All <ExternalLink size={16} />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolio.slice(0, 6).map((project, index) => (
              <Link
                key={index}
                href={project.demo || project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Card tilt={true} className="h-full">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.name}
                    className="w-full h-40 object-cover mb-4 rounded-xl"
                  />
                  <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <span className="text-blue-300">View Project</span>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <section id="experience" className="mb-20">
          <h2 className="text-3xl font-semibold mb-6">Experience</h2>
          {experiences.map((exp, index) => (
            <Card
              key={index}
              className="mb-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-green-500/20"
            >
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

        <section id="research" className="mb-20">
          <h2 className="text-3xl font-semibold mb-6">Research & Thesis</h2>
          {research.map((item, index) => (
            <Card
              key={index}
              className="mb-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/20"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <span className="text-sm bg-white/10 px-2 py-1 rounded">
                  {item.type}
                </span>
              </div>
              <p className="text-gray-300">{item.description}</p>
            </Card>
          ))}
        </section>

        <section id="contact" className="mb-12">
          <h2 className="text-3xl font-semibold mb-6">Contact</h2>
          <Card>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-2">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full bg-white/20 p-2 rounded-xl"
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full bg-white/20 p-2 rounded-xl"
                />
              </div>
              <div>
                <label htmlFor="message" className="block mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full bg-white/20 p-2 rounded-xl"
                ></textarea>
              </div>
              <Button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-transparent border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50"
              >
                Send Message
              </Button>
            </form>
          </Card>
        </section>

        <footer className="mt-auto pt-8 border-t border-white/10">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex justify-center items-center space-x-4">
              <SocialIcon
                icon={Facebook}
                href="https://www.facebook.com/tanjim.islam1"
              />
              <SocialIcon
                icon={Github}
                href="https://github.com/Tanjim-Islam"
              />
              <SocialIcon
                icon={Linkedin}
                href="https://www.linkedin.com/in/tanjim-riju/"
              />
              <SocialIcon icon={Mail} href="#" onClick={handleEmailClick} />
            </div>
            <p className="text-sm text-gray-400">
              &copy; 2025 Tanjim Islam Riju. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default PortfolioPage;
