import React from "react";

interface Props {
  show: boolean;
  message?: string;
}

export function LoadingOverlay({ show, message = "Carregando..." }: Props) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm" />
      <div className="relative flex flex-col items-center gap-5">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-blue-100" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 animate-spin" />
          <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-blue-300 animate-spin" style={{ animationDuration: "0.6s", animationDirection: "reverse" }} />
        </div>
        <span className="text-gray-600 font-medium text-base tracking-wide">{message}</span>
      </div>
    </div>
  );
}
