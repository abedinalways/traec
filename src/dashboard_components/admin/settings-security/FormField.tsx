interface FormFieldProps {
  label: string;
  type?: "text" | "email" | "password" | "tel" | "url";
  defaultValue?: string;
  placeholder?: string;
}

function FormField({ label, type = "text", defaultValue, placeholder }: FormFieldProps) {
  return (
    <div>
      <label className="block text-[13px] text-gray-500 mb-2 ml-1">
        {label}
      </label>
      <input
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full p-4 rounded-lg bg-white border-none shadow-sm text-[15px] focus:ring-1 focus:ring-blue-400 outline-none text-[#1D2433]"
      />
    </div>
  );
}
export default FormField;