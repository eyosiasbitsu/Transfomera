import React, {ChangeEvent} from "react";
interface TextInputFieldProps {
  inputTitle: string;
  placeHolder?: string;
  value: string;
  setValue: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
}

const TextInputField: React.FC<TextInputFieldProps> = ({inputTitle, placeHolder, value, setValue, disabled, required}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <div className="my-8">
      <label htmlFor={inputTitle}> {inputTitle}
      {required && <span className="text-red-600">*</span>}
       </label>
      <input
        type="text"
        data-testid={inputTitle}
        id={inputTitle}
        className="mt-2 bg-otpInputColor border-gray-300 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
        placeholder={placeHolder}
        required = {required}
        onChange={handleChange}
        value={value}
        disabled={disabled}
      />
    </div>
  );
};

export default TextInputField;
