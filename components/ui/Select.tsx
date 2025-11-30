import { SelectHTMLAttributes, forwardRef } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className = "", id, ...props }, ref) => {
    return (
      <div>
        {label && (
          <label
            className="block text-sm font-bold leading-6 mb-2 text-[#1a4231]"
            htmlFor={id}
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={id}
          className={`block w-full rounded-lg border-0 py-2.5 px-3 bg-[#f6f8f7] ring-1 ring-inset ring-[#eaf0ee] focus:ring-2 focus:ring-inset focus:ring-[#1a4231] transition-shadow ${className}`}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
