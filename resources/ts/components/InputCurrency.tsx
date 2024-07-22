import helper from "@/utils/helper";
import React from "react";
import { InputHTMLAttributes } from "react";

type InputCurrencyProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  externalClass?: string;
  decimalPlaces?: number;
  onChangeVal?: (item: number) => void;
  focus?: boolean;
  error?: string;
};

export const InputCurrency: React.FC<InputCurrencyProps> = ({
  label,
  error,
  decimalPlaces,
  onChangeVal,
  externalClass,
  ...field
}) => {
  const decPlaces = typeof decimalPlaces === "number" ? decimalPlaces : 2;
  const handleNumberChange = (e: any) => {
    const value = "0".repeat(decPlaces + 1) + e.target.value.replace(/[^0-9]/g, "");
    const val =
      value.substring(0, value.length - decPlaces) +
      "." +
      value.substring(value.length - decPlaces);
    typeof onChangeVal === "function" && onChangeVal(parseFloat(val));
  };

  return (
    <div className={externalClass}>
      <label className="block text-gray-700 text-sm font-semibold mb-1">{label}</label>
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
      ${error ? "ring-red-600 focus:ring-red-600" : ""}
      ${field.disabled ? "bg-gray-100" : ""}
      `}
          value={helper.formatNumber(field.value as string, decPlaces)}
          onChange={handleNumberChange}
          placeholder={field.placeholder ? field.placeholder : label}
          type="text"
        />
      </div>
      {error && <div className="text-sm text-red-500">{error}</div>}
    </div>
  );
};
