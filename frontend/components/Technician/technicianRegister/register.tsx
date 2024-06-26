"use client";
import { useRegisterUserMutation } from "@/app/GlobalRedux/Features/auth/authApi";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Button from "@/components/UI/Button";
import ChatBot from "../Home/ChatBot";

const RegisterTechnician = () => {
  const [name, setName] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [signup, { isLoading }] = useRegisterUserMutation();
  const router = useRouter();

  const [view, setView] = useState<boolean>(false);

  const handleView = () => {
    setView(!view);
  };

  const handleSubmit = async () => {
    if (name && role && password && email) {
      try {
        const result = await signup({
          fullname: name,
          role,
          password,
          email,
        });

        toast.success("Technician registered successfully!");
        router.push("/home");
      } catch (error) {
        toast.error("Error registering technician!");
      }
    } else {
      console.log("error");
    }
  };

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);
  const handleRole = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setRole(e.target.value);
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);
  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) =>
    setConfirmPassword(e.target.value);
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  return (
    <div className="flex">
      <div className="flex flex-col gap-4 py-20 px-10 w-[70%]">
        <h1 className="text-2xl font-bold">Register a Technicain</h1>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            className="p-3 rounded-xl focus:outline-none border-slate-200 border-2 bg-gray-50"
            onChange={(e) => handleName(e)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            className="p-3 rounded-xl focus:outline-none border-slate-200 border-2 bg-gray-50"
            value={role}
            onChange={handleRole}
          >
            <option value="" disabled>
              Select role
            </option>
            <option value="Admin">Admin</option>
            <option value="Technician">Technician</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="flex justify-between">
            <h1>Password</h1>
            <button className="flex items-center gap-1" onClick={handleView}>
              {view ? <FaRegEyeSlash /> : <FaRegEye />}
              {view ? <h1>Hide</h1> : <h1>Show</h1>}
            </button>
          </label>
          <input
            id="password"
            type={view ? "text" : "password"}
            className="p-3 rounded-xl focus:outline-none border-slate-200 border-2 bg-gray-50"
            onChange={(e) => handlePassword(e)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="confirmpassword">Confirm Password</label>
          <input
            type="password"
            id="confirmpassword"
            className="p-3 rounded-xl border-slate-200 focus:outline-none border-2 bg-gray-50"
            onChange={(e) => handleConfirmPassword(e)}
          />
          <span className="text-sm text-red-500">
            {" "}
            {password !== confirmPassword && confirmPassword.length > 0
              ? "not correct"
              : ""}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            className="p-3 rounded-xl focus:outline-none border-slate-200 border-2 bg-gray-50"
            onChange={(e) => handleEmail(e)}
          />
        </div>

        <div className="w-1/3 mt-4">
          <Button
            onClick={handleSubmit}
            disabled={email.trim().length === 0 || name.trim().length === 0}
            message1="Create Account"
            message2="Creating account..."
            isLoading={isLoading}
          />
        </div>
        <ToastContainer />
      </div>
      <div className="w-[30%] bg-[#F6F2DD] flex flex-col items-center gap-4 pb-20 mt-20">
        <ChatBot />
      </div>
    </div>
  );
};

export default RegisterTechnician;
