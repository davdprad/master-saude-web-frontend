"use client";

import { Eye, EyeOff } from "lucide-react";
import { useId, useMemo, useState } from "react";
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
  type = "text",
  id,
  autoComplete,
  ...props
}: InputProps) {
  const inputId = id ?? useId();
  const describedBy = error ? `${inputId}-error` : undefined;

  const isPassword = type === "password";
  const [showPassword, setShowPassword] = useState(false);

  const finalType = useMemo(() => {
    if (!isPassword) return type;
    return showPassword ? "text" : "password";
  }, [isPassword, showPassword, type]);

  return (
    <div className="w-full">
      {/* desativa o "olho" nativo do navegador (Edge/IE legacy) */}
      {isPassword ? (
        <style>{`
          input::-ms-reveal,
          input::-ms-clear {
            display: none;
          }
        `}</style>
      ) : null}

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

      <div className="relative">
        <input
          id={inputId}
          type={finalType}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          autoComplete={
            autoComplete ?? (isPassword ? "new-password" : undefined)
          }
          className={twMerge(
            "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition",
            "focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/15",
            error
              ? "border-red-300 focus:border-red-500 focus:ring-red-500/15"
              : "",
            isPassword ? "pr-12" : "",
            className,
          )}
          {...props}
        />

        {isPassword ? (
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            aria-pressed={showPassword}
            className={twMerge(
              "absolute inset-y-0 right-2 my-auto flex h-9 w-9 items-center justify-center",
              "rounded-lg text-gray-700",
              "hover:bg-gray-100",
            )}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        ) : null}
      </div>

      {error ? (
        <p id={describedBy} className="mt-2 text-xs font-medium text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
