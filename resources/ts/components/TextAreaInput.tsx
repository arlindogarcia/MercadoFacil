import React, { InputHTMLAttributes } from "react";

type TextAreaInputProps = InputHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
};

export const TextAreaInput = ({ label, error, ...field }: TextAreaInputProps) => {
  return (
    <div className="col-span-full">
      <label className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div className="mt-2">
        <textarea
          rows={3}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
          {...field}
        />
      </div>
      {error && <div className="text-sm text-red-500">{error}</div>}
    </div>
  )
}
