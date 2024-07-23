import React, { InputHTMLAttributes, useRef } from "react";

type CheckInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  onChangeVal: (value: number) => void;
};

export const CheckInput = ({ label, error, children, onChangeVal, ...field }: CheckInputProps) => {
  const inputRef = useRef(null);

  return (
    <div className="relative flex">
      <div className="flex h-4 items-center">
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-green-500 focus:ring-green-500"
          ref={inputRef}
          onChange={(event) => {
            onChangeVal(event.target.checked ? 1 : 0 as any);
          }}    
          
          {...field}
        />
      </div>
      <div className="text-sm leading-6">
        <label onClick={() => inputRef.current?.click()} className="text-gray-700 text-sm font-semibold">
          {label}
        </label>
      </div>
      {error && <div className="text-sm text-red-500">{error}</div>}
    </div>
  )
}
