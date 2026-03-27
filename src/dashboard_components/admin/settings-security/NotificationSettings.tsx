import NotificationCheckbox from "./NotificationCheckbox";

interface NotificationItem {
  label: string;
  defaultChecked: boolean;
}

const notifications: NotificationItem[] = [
  { label: "Email notifications for new orders",             defaultChecked: true  },
  { label: "Email notifications for new user registrations", defaultChecked: false },
  { label: "SMS notifications for urgent issues",            defaultChecked: true  },
  { label: "Push notifications for support tickets",         defaultChecked: true  },
];

function NotificationSettings() {
  return (
    <div className="mb-8">
      <h3 className="text-[16px] font-bold text-[#030914] mb-4">
        Notification Settings
      </h3>
      <div className="space-y-4">
        {notifications.map((n: NotificationItem, i: number) => (
          <NotificationCheckbox
            key={i}
            label={n.label}
            defaultChecked={n.defaultChecked}
          />
        ))}
      </div>
    </div>
  );
}
export default NotificationSettings;