import type React from "react"
import type { LucideIcon } from "lucide-react"
import { MagneticContainer } from "./MagneticContainer"

interface SocialIconProps {
  icon: LucideIcon
  href: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

export const SocialIcon: React.FC<SocialIconProps> = ({ icon: Icon, href, onClick }) => (
  <MagneticContainer>
    <a
      href={href}
      onClick={onClick}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors group"
    >
      <Icon className="w-5 h-5 text-white group-hover:text-yellow-400 transition-colors" />
    </a>
  </MagneticContainer>
)

