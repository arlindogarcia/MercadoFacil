import React, { InputHTMLAttributes } from "react";

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  externalClass?: string;
  inputSize?: "md" | "xs";
};

export const TextInput = ({
  label,
  error,
  externalClass,
  inputSize = "md",
  ...field
}: TextInputProps) => {
  const sizes = {
    md: "py-2 px-3 rounded-md",
    xs: "py-0.5 px-1.5 text-xs rounded",
  };

  const sizesTop = {
    md: "mt-1",
    xs: "",
  };

  return (
    <div className={externalClass}>
      <label className={`block text-gray-700 text-sm font-semibold ${sizesTop[inputSize]}`}>
        {label}
      </label>
      <div className={sizesTop[inputSize]}>
        <input
          className={`
            block
            w-full
            ${sizes[inputSize]}
            
            border-0
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
            ${error ? "ring-red-600 focus:ring-red-600" : ""}
            ${field.disabled ? "bg-gray-100" : ""}
            `}
          placeholder={field.placeholder ? field.placeholder : label}
          {...field}
        />
      </div>
      {error && <div className="text-sm text-red-500">{error}</div>}
    </div>
  );
};
