import { HiInformationCircle } from "react-icons/hi";

type InputFieldProps = {
  label: string;
  placeholder?: string;
  type?: string;
  value?: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  tooltip?: string;
};

function BookInputField({
  label,
  placeholder,
  type = "text",
  value,
  required = false,
  onChange,
  tooltip,
}: InputFieldProps) {
  return (
    <div>
      <div className="flex items-center gap-1 mb-1 relative group">
        <label className="block text-sm font-medium">
          {label} {required && "*"}
        </label>
        {tooltip && (
          <>
            <HiInformationCircle className="h-4 w-4 text-gray-400 hover:text-gray-500 cursor-help" />
            <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out bottom-full left-0 mb-2 px-3 py-2 text-sm text-gray-100 bg-gray-800 rounded-lg shadow-lg max-w-xs">
              {tooltip}
            </div>
          </>
        )}
      </div>
      <input
        className="w-full p-2 border rounded"
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}

export default BookInputField;
