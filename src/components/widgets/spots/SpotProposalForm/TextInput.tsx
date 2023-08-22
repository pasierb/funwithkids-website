import { useState, useEffect, HTMLAttributes } from 'react';

type InputSize = 'sm' | 'md' | 'lg';

interface TextInputProps extends HTMLAttributes<HTMLInputElement> {
  label: string;
  inputName: string;
  size: 'sm' | 'md' | 'lg';
  inputType?: 'text' | 'number';
  required?: boolean;
  inputClassName?: string;
}

const sizeCssClass: { [key: InputSize]: string } = {
  sm: 'sm:col-span-3',
  md: 'sm:col-span-4',
  lg: 'sm:col-span-5',
};

export function TextInput({
  label,
  inputName,
  inputClassName,
  size,
  inputType = 'text',
  required = false,
  children,
  ...rest
}: TextInputProps) {
  const [id] = useState<string>(() => `${inputName}-${Math.random().toString(36).substring(2, 9)}`);

  return (
    <div className={sizeCssClass[size]}>
      <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="mt-2">
        <input
          type={inputType}
          name={inputName}
          required={required}
          id={id}
          className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
            inputClassName && ''
          }`}
          {...rest}
        />
      </div>
      {children}
    </div>
  );
}
