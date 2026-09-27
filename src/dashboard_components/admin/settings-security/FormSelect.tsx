interface FormSelectProps {
  label: string;
  options: string[];
  defaultValue?: string;
}

function FormSelect({ label, options, defaultValue }: FormSelectProps) {
  return (
    <div>
      <label className="block text-[13px] text-gray-500 mb-2 ml-1">
        {label}
      </label>
      <select
        defaultValue={defaultValue}
        className="w-full p-4 rounded-lg bg-white border-none shadow-sm text-[15px] focus:ring-1 focus:ring-blue-400 outline-none appearance-none cursor-pointer text-[#1D2433]"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
export default FormSelect;