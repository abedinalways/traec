
interface policy{
  label: string;
  checked: boolean;
}


function PolicyCheckbox({ label, checked }: policy) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <input
        type="checkbox"
        defaultChecked={checked}
        className="w-4 h-4 rounded border-gray-300 accent-blue-500"
      />
      <span className="text-[13px] text-gray-500 group-hover:text-gray-700">{label}</span>
    </label>
  );
}

export default PolicyCheckbox;