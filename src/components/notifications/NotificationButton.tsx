import { Bell } from "lucide-react";
import { Button } from "../ui/Button";

interface NotificationButtonProps {
  hasUnread?: boolean;
  onClick?: () => void;
}

export function NotificationButton({
  hasUnread = false,
  onClick,
}: NotificationButtonProps) {
  return (
    <div className="relative">
      <Button
        icon={Bell}
        onClick={onClick}
        aria-label="Notificações"
        className="p-3"
      />

      {hasUnread && (
        <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500" />
      )}
    </div>
  );
}
