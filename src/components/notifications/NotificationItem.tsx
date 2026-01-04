interface NotificationItemProps {
  title: string;
  time: string;
  onClick?: () => void;
}

export function NotificationItem({
  title,
  time,
  onClick,
}: NotificationItemProps) {
  return (
    <div
      onClick={onClick}
      className="
        p-4 cursor-pointer
        border-b border-gray-100
        hover:bg-gray-50
        transition-colors
      "
    >
      <p className="text-sm font-medium text-gray-800">{title}</p>
      <p className="text-xs text-gray-500 mt-1">{time}</p>
    </div>
  );
}
