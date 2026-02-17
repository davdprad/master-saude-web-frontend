"use client";

import { RoleLoginConfig } from "@/src/types/auth";
import Image from "next/image";
import { ICONS } from "../constants";

export function LeftPanel({ config }: { config: RoleLoginConfig }) {
  const Icon = ICONS[config.left.icon];

  return (
    <div className="relative hidden lg:flex overflow-hidden shadow-2xl">
      <div className="absolute inset-0 bg-linear-to-br from-indigo-600 to-indigo-800" />

      <div className="relative z-10 flex flex-col justify-between p-10 text-white">
        <Image
          src={config.logos.white}
          alt="Logo"
          className="rounded-lg h-12 w-min"
        />

        <div className="max-w-lg">
          <div className="flex gap-3 mb-6">
            <div className="h-12 w-12 rounded-2xl bg-white/15 grid place-items-center ring-1 ring-white/20">
              <Icon />
            </div>
            <div>
              <p className="text-lg font-semibold leading-tight">
                {config.left.productName}
              </p>
              <p className="text-white/80 text-sm">{config.left.tagline}</p>
            </div>
          </div>

          <h1 className="text-4xl font-bold tracking-tight">
            {config.left.welcomeTitle}
          </h1>
          <p className="mt-4 text-white/85 leading-relaxed">
            {config.left.welcomeText}
          </p>
        </div>

        <p className="text-xs text-white/70">
          © {new Date().getFullYear()} {config.left.productName} • Todos os
          direitos reservados
        </p>
      </div>
    </div>
  );
}
