import React, { InputHTMLAttributes } from "react";

type SelectInputProps = InputHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  externalClass?: string;
  inputSize?: 'sm' | 'md';
};

export const SelectInput = ({ label, error, children, externalClass, inputSize = "md", ...field }: SelectInputProps) => {
    const sizes = {
        sm: 'py-0.5 rounded-md',
        md: 'py-2 rounded-md',
    }

  return (
    <div className={externalClass}>
      {label && <label className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>}
      <div className={label ? "mt-1" : ''}>
        <select
          className={`
          ${sizes[inputSize]}
          block
          w-full
          border-0
          text-gray-900
          shadow-sm
          ring-1
          ring-inset
          ring-gray-300
          focus:ring-2
          focus:ring-inset
          focus:ring-green-600
          sm:text-sm
          sm:leading-6
          ${error ? 'ring-red-600 focus:ring-red-600' : ''}`}
          {...field}
        >
          {children}
        </select>
      </div>
      {error && <div className="text-sm text-red-500">{error}</div>}
    </div>
  )
}
