import React, { ButtonHTMLAttributes } from "react";

type DefaultButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  processing?: boolean;
  externalClass?: string;
  size?: 'md' | 'sm' | 'xs';
  color?: 'default' | 'gray' | 'red' | 'white' | 'green' | 'gray-light' | 'blue';
};

export const DefaultButton = ({ children, processing, externalClass = 'w-full', size = "md", color = "default", ...field }: DefaultButtonProps) => {
  const paddings = {
    'md': 'py-2 px-4 text-md',
    'sm': 'py-1 px-2 text-sm',
    'xs': 'py-0.5 px-1 text-xs',
  }

  const colors = {
    'default': 'text-white bg-green-500 hover:bg-green-700 focus:ring-green-500',
    'gray': 'text-white bg-gray-500 hover:bg-gray-700 focus:ring-gray-500',
    'gray-light': 'text-white bg-gray-400 hover:bg-gray-400 focus:ring-gray-400',
    'red': 'text-white bg-red-500 hover:bg-red-700 focus:ring-red-500',
    'white': 'bg-white hover:bg-gray-50 focus:ring-gray-200 border border-gray-300 text-gray-700',
    'green': 'text-white bg-green-600 hover:bg-green-700 focus:ring-green-600',
    'blue': 'text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-600',
  }

  return (
    <button className={`${colors[color]} font-bold rounded focus:outline-none focus:ring-2 focus:ring-offset-2  ${paddings[size]} ${externalClass} ${processing ? 'opacity-50' : ''}`} {...field}>
      {children}
    </button>
  )
}
