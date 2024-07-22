import React, { InputHTMLAttributes } from "react";

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  externalClass?: string;
};

export const TextInput = ({ label, error, externalClass, ...field }: TextInputProps) => {
  return (
    <div className={externalClass}>
      <label className="block text-gray-700 text-sm font-semibold mb-1">
        {label}
      </label>
      <div className="mt-2">
        <input
          className={`
            block
            w-full
            rounded-md
            border-0
            py-2
            px-3
            text-gray-900
            shadow-sm
            ring-1
            ring-inset
            ring-gray-300
            placeholder:text-gray-400
            focus:outline-none
            focus:ring-2
            focus:ring-inset
            focus:ring-green-600
            sm:text-sm sm:leading-6
            ${error ? 'ring-red-600 focus:ring-red-600' : ''}
            ${field.disabled ? 'bg-gray-100' : ''}
            `}
          placeholder={field.placeholder ? field.placeholder : label}
          {...field}
        />
      </div>
      {error && <div className="text-sm text-red-500">{error}</div>}
    </div>
  )
}
