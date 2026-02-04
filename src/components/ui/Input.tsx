import { useId } from "react";
import { twMerge } from "tailwind-merge";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  classNameForLabel?: string;
};

export function Input({
  label,
  error,
  className = "",
  classNameForLabel = "",
  id,
  ...props
}: InputProps) {
  const inputId = id ?? useId();
  const describedBy = error ? `${inputId}-error` : undefined;

  return (
    <div className="w-full">
      {label ? (
        <label
          htmlFor={inputId}
          className={twMerge(
            "mb-2 block text-sm font-medium text-gray-700",
            classNameForLabel,
          )}
        >
          {label}
        </label>
      ) : null}

      <input
        id={inputId}
        aria-invalid={!!error}
        aria-describedby={describedBy}
        className={twMerge(
          "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition",
          "focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/15",
          error
            ? "border-red-300 focus:border-red-500 focus:ring-red-500/15"
            : "",
          className,
        )}
        {...props}
      />

      {error ? (
        <p id={describedBy} className="mt-2 text-xs font-medium text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
