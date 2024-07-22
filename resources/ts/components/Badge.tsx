import { ReactNode } from "react";

interface BadgeProps {
  color: "blue" | "gray" | "red" | "green" | "yellow" | "indigo" | "purple" | "pink";
  size?: "md" | "sm";
  children: ReactNode;
}

export const Badge = ({ color, children, size = "md" }: BadgeProps) => {
  const colors = {
    blue: "bg-blue-100 text-blue-800",
    gray: "bg-gray-100 text-gray-800",
    red: "bg-red-100 text-red-800",
    green: "bg-green-100 text-green-800",
    yellow: "bg-yellow-100 text-yellow-800",
    indigo: "bg-indigo-100 text-indigo-800",
    purple: "bg-purple-100 text-purple-800",
    pink: "bg-pink-100 text-pink-800",
  };

  const sizes = {
    md: "px-2.5 py-0.5",
    sm: "px-2 py-0",
  };

  return (
    <span
      className={`text-xs font-medium  rounded whitespace-nowrap block ${colors[color]} ${sizes[size]}`}
    >
      {children}
    </span>
  );
};
