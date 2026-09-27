interface NotificationCheckboxProps {
  label: string;
  defaultChecked?: boolean;
}

function NotificationCheckbox({ label, defaultChecked = false }: NotificationCheckboxProps) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        className="w-5 h-5 rounded border-gray-300 accent-blue-500"
      />
      <span className="text-[14px] text-gray-500 group-hover:text-gray-700">
        {label}
      </span>
    </label>
  );
}
export default NotificationCheckbox;