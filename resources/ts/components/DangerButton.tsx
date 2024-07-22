import React, { ButtonHTMLAttributes } from "react";

type DangerButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  processing?: boolean;
  externalClass?: string;
  size?: 'md' | 'sm';
};

export const DangerButton = ({ children, processing, externalClass = 'w-full', size = 'md', ...field }: DangerButtonProps) => {
  const paddings = {
    'md': 'py-2 px-4 text-md',
    'sm': 'py-0 px-2 text-sm',
  }

  return (
    <button className={`bg-red-500 hover:bg-red-700 text-white font-bold rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${paddings[size]} ${externalClass} ${processing ? 'opacity-50' : ''}`} {...field}>
      {children}
    </button>
  )
}
