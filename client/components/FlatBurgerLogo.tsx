import React from "react";

interface FlatBurgerLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  animated?: boolean;
  className?: string;
}

export const FlatBurgerLogo: React.FC<FlatBurgerLogoProps> = ({
  size = "md",
  animated = false,
  className = "",
}) => {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
    xl: "w-48 h-48",
  };

  return (
    <div
      className={`${sizeClasses[size]} ${className} ${animated ? "animate-bounce" : ""}`}
    >
      <img
        src="https://cdn.builder.io/api/v1/image/assets%2Fa819516bbe9e41ec81132ec0652faf4d%2F8560222a198a4f3494a466576408a777?format=webp&width=800"
        alt="Flat Burger Logo"
        className="w-full h-full object-contain"
      />
    </div>
  );
};
