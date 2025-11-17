import { TextareaHTMLAttributes, forwardRef } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = "", id, ...props }, ref) => {
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
        <textarea
          ref={ref}
          id={id}
          className={`block w-full rounded-lg border-0 py-2.5 px-3 bg-[#f6f8f7] ring-1 ring-inset ring-[#eaf0ee] focus:ring-2 focus:ring-inset focus:ring-[#1a4231] placeholder:text-[#5f8676] transition-shadow ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
