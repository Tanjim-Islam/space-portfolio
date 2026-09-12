"use client";

import type React from "react";
import { Github, Linkedin, Mail, ExternalLink, Facebook } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { StarryBackground } from "@/components/StarryBackground";
import emailjs from '@emailjs/browser';
import { Navigation } from "@/components/Navigation";
import { AnimatedText } from "@/components/AnimatedText";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { SocialIcon } from "@/components/SocialIcon";
import { CustomCursor } from "@/components/CustomCursor";
import { SkillCloud } from "@/components/SkillCloud";
import { usePortfolio } from "@/lib/cms/provider";
import { itemsOf, safeLink, type SectionKey } from "@/lib/cms/content";
import type { Skill } from "@/data/portfolioData";
import Link from "next/link";

const PortfolioPage: React.FC = () => {
  const content = usePortfolio(); const { profile, sections } = content;
  const education = itemsOf(content, "education");
  const skills = itemsOf(content, "skills").map(item => ({ name: item.name, category: (item.category || "other") as Skill["category"], level: item.level, description: item.description }));
  const portfolio = itemsOf(content, "projects").filter(item => item.featured).map(item => ({ ...item, name: item.title }));
  const experiences = itemsOf(content, "experience").map(item => ({ ...item, title: item.role, company_name: item.company, date: item.period, details: item.highlights }));
  const research = itemsOf(content, "research").map(item => ({ ...item, type: item.status }));
  const navLinks = [{ id: "hero", title: "Hero" }, ...["education", "skills", "projects", "experience", "research"].filter(key => sections[key as SectionKey].enabled).map(key => ({ id: key === "projects" ? "portfolio" : key, title: sections[key as SectionKey].title })), { id: "contact", title: "Contact" }];
  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigator.clipboard.writeText(profile.email);
    toast.success("Email Copied!", {
      style: {
        background: "#333",
        color: "#fff",
      },
      position: "top-center",
    });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Show loading toast
    const loadingToast = toast.loading("Sending message...", {
      style: {
        background: "#333",
        color: "#fff",
      },
      position: "top-center",
    });
    
    // Get form data
    const form = e.currentTarget;
    const emailInput = form.querySelector('input[name="reply_to"]') as HTMLInputElement;
    
    // Create a hidden field for the from_email
    const hiddenEmailField = document.createElement('input');
    hiddenEmailField.type = 'hidden';
    hiddenEmailField.name = 'from_email';
    hiddenEmailField.value = emailInput.value;
    form.appendChild(hiddenEmailField);
    
    // Send email using EmailJS
    emailjs.sendForm(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_t84szxg',
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_pf7k77l',
      form,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '7hkg3LDcaGSzqgXbd'
    )
      .then(() => {
        // Dismiss loading toast
        toast.dismiss(loadingToast);
        
        // Show success toast
        toast.success("Message Sent!", {
          style: {
            background: "#333",
            color: "#fff",
          },
          position: "top-center",
        });
        
        // Remove the hidden field
        form.removeChild(hiddenEmailField);
        
        // Reset form
        form.reset();
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        
        // Dismiss loading toast
        toast.dismiss(loadingToast);
        
        // Show error toast
        toast.error("Failed to send message. Please try again.", {
          style: {
            background: "#333",
            color: "#fff",
          },
          position: "top-center",
        });
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
          <h1 className="text-4xl font-bold mb-4">{profile.fullName}</h1>
          <AnimatedText texts={profile.roles.filter(Boolean).length ? profile.roles.filter(Boolean) : [profile.headline]} />
          {profile.resumeUrl && <a className="inline-block mt-4 text-blue-300 underline" href={safeLink(profile.resumeUrl)} target="_blank" rel="noreferrer">Download CV</a>}
        </section>

        {sections.education.enabled && <section id="education" className="mb-20">
          <h2 className="text-3xl font-semibold mb-6">{sections.education.title}</h2>
          {education.map((edu, index) => (
            <Card
              key={index}
              className="mb-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/20"
            >
              <h3 className="text-xl font-semibold mb-2">{edu.degree}</h3>
              <p className="text-gray-300">
                {edu.institution}, {edu.date}
              </p>
              {edu.distinction && <p className="text-blue-200 mt-2">{edu.distinction}</p>}
              {edu.details && <p className="text-gray-300 mt-3 whitespace-pre-line">{edu.details}</p>}
            </Card>
          ))}
        </section>}

        {sections.skills.enabled && <section id="skills" className="mb-20">
          <h2 className="text-3xl font-semibold mb-6">{sections.skills.title}</h2>
          <Card noPadding>
            <SkillCloud skills={skills} />
          </Card>
        </section>}

        {sections.projects.enabled && <section id="portfolio" className="mb-20">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-semibold">{sections.projects.title}</h2>
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
                href={safeLink(project.demo || project.github || project.link) || "#portfolio"}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Card tilt={true} className="h-full">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.imageAlt || project.name}
                    className="w-full h-40 object-cover mb-4 rounded-xl"
                  />
                  <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  {project.tags.length > 0 && <p className="text-xs text-blue-200 mb-4">{project.tags.join(" · ")}</p>}
                  <span className="text-blue-300">View Project</span>
                </Card>
              </Link>
            ))}
          </div>
        </section>}

        {sections.experience.enabled && <section id="experience" className="mb-20">
          <h2 className="text-3xl font-semibold mb-6">{sections.experience.title}</h2>
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
                  <li key={i} >{detail}</li>
                ))}
              </ul>
              {exp.stack.length > 0 && <p className="text-sm text-blue-200 mt-3">{exp.stack.join(" · ")}</p>}
            </Card>
          ))}
        </section>}

        {sections.research.enabled && <section id="research" className="mb-20">
          <h2 className="text-3xl font-semibold mb-6">{sections.research.title}</h2>
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
              {item.authors && <p className="text-sm text-gray-400 mt-2">{item.authors}</p>}
              {item.venue && <p className="text-sm text-blue-200 mt-2">{item.venue}</p>}
              {item.tags.length > 0 && <p className="text-xs text-purple-200 mt-3">{item.tags.join(" · ")}</p>}
              {item.link && <a href={safeLink(item.link)} className="inline-block mt-3 text-blue-300" target="_blank" rel="noreferrer">Read paper</a>}
            </Card>
          ))}
        </section>}

        <section id="contact" className="mb-12">
          <h2 className="text-3xl font-semibold mb-6">{profile.contactNote || "Contact"}</h2>
          <div className="flex flex-wrap gap-4 text-sm text-gray-300 mb-6">
            <span>{[profile.location, profile.timezone].filter(Boolean).join(" · ")}</span>
            {profile.phone && <a href={`tel:${profile.phone}`}>{profile.phone}</a>}
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </div>
          <Card>
            <form className="space-y-4" onSubmit={handleFormSubmit}>
              <div>
                <label htmlFor="from_name" className="block mb-2">
                  Name
                </label>
                <input
                  id="from_name"
                  name="from_name"
                  type="text"
                  className="w-full bg-white/20 p-2 rounded-xl"
                  required
                />
              </div>
              <div>
                <label htmlFor="reply_to" className="block mb-2">
                  Email
                </label>
                <input
                  id="reply_to"
                  name="reply_to"
                  type="email"
                  className="w-full bg-white/20 p-2 rounded-xl"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full bg-white/20 p-2 rounded-xl"
                  required
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
                href={safeLink(profile.facebook)}
              />
              <SocialIcon
                icon={Github}
                href={safeLink(profile.github)}
              />
              <SocialIcon
                icon={Linkedin}
                href={safeLink(profile.linkedin)}
              />
              <SocialIcon icon={Mail} href="#" onClick={handleEmailClick} />
            </div>
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} {profile.fullName}. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default PortfolioPage;
