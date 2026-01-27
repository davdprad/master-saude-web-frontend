"use client";

import { useEffect, useState } from "react";
import { NotificationButton } from "./NotificationButton";
import { NotificationItem } from "./NotificationItem";

export default function NotificationsDropdown() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(40);

  useEffect(() => {
    const header = document.querySelector("header");
    if (header) setHeaderHeight(header.offsetHeight);
  }, []);

  return (
    <div className="relative">
      <NotificationButton
        onClick={() => setShowNotifications((prev) => !prev)}
        hasUnread
      />

      {/* Overlay */}
      <div
        onClick={() => setShowNotifications(false)}
        className={`
          fixed inset-0 z-10 transition-opacity duration-200
          ${showNotifications ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      />

      {/* Dropdown */}
      <div
        style={{ "--header-h": `${headerHeight}px` } as React.CSSProperties}
        className={`
          fixed left-0 right-0 z-20
          bg-white border shadow-xl
          max-h-[50vh] h-auto flex flex-col rounded-none
          transition-all duration-200 ease-out
          transform

          ${
            showNotifications
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
          }

          top-(--header-h)
          
          rounded-b-lg
          border-gray-200
          border-t-0

          sm:absolute sm:top-full sm:mt-2
          sm:left-auto sm:right-0
          sm:w-80 sm:max-h-96 sm:rounded-lg sm:border-t
        `}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-800">Notificações</h3>
        </div>

        {/* Conteúdo */}
        <div className="overflow-y-auto">
          {[1, 2, 3].map((i) => (
            <NotificationItem
              key={i}
              title={`Notificação ${i}`}
              time="Há 5 minutos"
            />
          ))}
        </div>

        {/* Footer */}
        {/* <div className="p-3 text-center border-t border-gray-200">
          <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
            Ver todas
          </button>
        </div> */}
      </div>
    </div>
  );
}
