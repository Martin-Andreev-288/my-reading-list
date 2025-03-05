type InputFieldProps = {
  label: string;
  type?: string;
  value: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function BookInputField({
  label,
  type = "text",
  value,
  required = false,
  onChange,
}: InputFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        {label} {required && "*"}
      </label>
      <input
        className="w-full p-2 border rounded"
        type={type}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}

export default BookInputField;
