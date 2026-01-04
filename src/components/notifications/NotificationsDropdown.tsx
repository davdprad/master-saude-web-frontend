"use client";

import { useState } from "react";
import { NotificationButton } from "./NotificationButton";
import { NotificationItem } from "./NotificationItem";

export default function NotificationsDropdown() {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="relative">
      <NotificationButton
        onClick={() => setShowNotifications(!showNotifications)}
        hasUnread={true}
      />

      {/* Dropdown de notificações */}
      {showNotifications && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowNotifications(false)}
          />
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-20">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-800">Notificações</h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {[1, 2, 3].map((i) => (
                <NotificationItem
                  key={i}
                  title={`Notificação ${i}`}
                  time={"Há 5 minutos"}
                />
              ))}
            </div>
            <div className="p-3 text-center border-t border-gray-200">
              <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                Ver todas
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
