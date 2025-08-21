type InputFieldProps = {
  label: string;
  type?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputField = ({ label, type = "text", value, onChange }: InputFieldProps) => {
  return (
    <div className="mb-3">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="border px-3 py-2 rounded w-full focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default InputField;
