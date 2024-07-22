import React, { ChangeEvent, InputHTMLAttributes, ReactNode } from "react";

type RadioInputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
  externalClass?: string;
  items: { label: string | ReactNode; value: number; }[]
};

export const RadioInput = ({ items, error, externalClass, value, ...field }: RadioInputProps) => {
  return (
    <div className={externalClass}>
      <fieldset className="grid md:grid-cols-3 gap-3 flex-wrap">
        {items.map((item, index) => (
          <div key={`${index}`} className="flex items-center sm:justify-center">
            <input checked={item.value == value} {...field} id={`radio-${index}-${item.value}-${item.label}`} type="radio" value={item.value} className="cursor-pointer w-4 h-4 border-gray-300 focus:ring-2 focus:ring-green-500" />
            <label htmlFor={`radio-${index}-${item.value}-${item.label}`} className="cursor-pointer block ms-2 text-sm font-medium text-gray-900">
              {item.label}
            </label>
          </div>
        ))}
      </fieldset>
      {error && <div className="text-sm text-red-500">{error}</div>}
    </div>
  )
}
