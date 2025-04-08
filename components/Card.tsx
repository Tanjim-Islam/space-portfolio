import type React from "react";
import { TiltCard } from "./TiltCard";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  tilt?: boolean;
  noPadding?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  tilt = false,
  noPadding = false,
}) => {
  const cardContent = (
    <div
      className={`bg-white/10 backdrop-blur-sm rounded-xl h-full ${
        noPadding ? "" : "p-6"
      } ${className}`}
    >
      {children}
    </div>
  );

  return tilt ? (
    <TiltCard className="h-full rounded-2xl">{cardContent}</TiltCard>
  ) : (
    cardContent
  );
};
