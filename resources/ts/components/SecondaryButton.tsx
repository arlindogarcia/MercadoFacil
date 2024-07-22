import React, { ButtonHTMLAttributes } from "react";

type SecondaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  processing?: boolean;
  externalClass?: string;
};

export const SecondaryButton = ({ children, processing, externalClass = 'w-full', ...field }: SecondaryButtonProps) => {
  return (
    <button className={`bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ${externalClass} ${processing ? 'opacity-50' : ''}`} {...field}>
      {children}
    </button>
  )
}
