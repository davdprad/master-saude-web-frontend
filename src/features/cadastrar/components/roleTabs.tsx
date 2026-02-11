import { Role } from "@/src/types/auth";
import type { RoleOption } from "../types";
import type { LucideIcon } from "lucide-react";

export function RoleTabs({
  roles,
  role,
  onChange,
  roleIcons,
}: {
  roles: RoleOption[];
  role: Role;
  onChange: (r: Role) => void;
  roleIcons: Record<Role, LucideIcon>;
}) {
  return (
    <nav className="mb-6 flex p-1.5 bg-white rounded-2xl ring-1 ring-black/10">
      {roles.map((item) => {
        const Icon = roleIcons[item.value];
        const isActive = role === item.value;
        return (
          <button
            type="button"
            key={item.value}
            onClick={() => onChange(item.value)}
            className={[
              "flex flex-1 items-center justify-center gap-2 py-3 text-sm transition-all duration-300 rounded-xl",
              isActive
                ? "bg-indigo-600 text-white ring-1 ring-black/10 shadow-[0_0_15px_5px_rgba(99,102,241,0.4)] font-semibold"
                : "text-slate-500 hover:bg-slate-100 font-medium",
            ].join(" ")}
          >
            <Icon
              size={isActive ? 19 : 18}
              className={isActive ? "text-white" : "text-slate-500"}
            />
            {item.label}
          </button>
        );
      })}
    </nav>
  );
}
