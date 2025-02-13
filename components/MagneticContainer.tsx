import type React from "react"

interface MagneticContainerProps {
  children: React.ReactNode
}

export const MagneticContainer: React.FC<MagneticContainerProps> = ({ children }) => (
  <div className="relative">{children}</div>
)

