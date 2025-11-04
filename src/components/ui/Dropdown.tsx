import React from "react";

type OptionItem = string | { label: string; value: string };

interface DropdownProps {
  id?: string;
  label?: string;
  options: OptionItem[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  id,
  label,
  options,
  value = "",
  onChange,
  placeholder = "Select an option",
  className = "",
  required = false,
  disabled = false,
}) => {
  const normalized = options.map((o) =>
    typeof o === "string" ? { label: o, value: o } : o
  );

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-600 mb-2"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          disabled={disabled}
          className={`appearance-none w-full bg-white border ${
            disabled
              ? "border-gray-100 bg-gray-50 text-gray-400"
              : "border-gray-200"
          } rounded-lg px-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-500 transition-colors shadow-sm`}
        >
          <option value="">{placeholder}</option>
          {normalized.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 10l5 5 5-5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default Dropdown;
