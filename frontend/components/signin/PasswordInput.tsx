import React, { useState } from "react";
import { MdLockOutline } from "react-icons/md";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const PasswordInput: React.FC<{
  inputTitle: string;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}> = ({ inputTitle, password, setPassword }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="my-8">
      <label htmlFor={inputTitle}>{inputTitle}</label>
      <div className="relative mt-2">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          <MdLockOutline />
        </div>
        <input
          id={inputTitle}
          type={showPassword ? "text" : "password"}
          onChange={handleInputChange}
          placeholder="Enter your password"
          className="pr-10 w-full border-gray-300 border focus:outline-none mt-2 bg-otpInputColor  text-gray-900 text-sm ps-10 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-4"
          value={password}
          required
        />
        <span
          className="absolute inset-y-0 right-0 flex items-center pr-6 hover:cursor-pointer"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
        </span>
      </div>
    </div>
  );
};

export default PasswordInput;
