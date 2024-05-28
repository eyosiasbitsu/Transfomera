"use client";

import React, { useState } from "react";
import TextInputField from "./TextInputField";
import PasswordInput from "./PasswordInput";
import { useLoginUserMutation } from "@/app/GlobalRedux/Features/auth/authAPI";
import { SignInCredential } from "@/Types/Auth";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../UI/Button";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [loginUser, { isLoading, isError, error }] = useLoginUserMutation();
  const router = useRouter();

  const handleLogin = async () => {
    const userCredential: SignInCredential = {
      email,
      password: enteredPassword,
    };
    try {
      const response = await loginUser(userCredential).unwrap();
      localStorage.setItem("tokenT", response.token);
      localStorage.setItem("userT", JSON.stringify(response.userDetail));
      router.push("/technician");
      toast.success("loged in successfully");
    } catch (error) {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="mt-8 mb-20 mx-4">
      <p className="mb-16 text-3xl">Transfomera</p>
      <div className="w-3/4 mx-auto">
        <p className="text-2xl">Sign in</p>
        <TextInputField inputTitle="Email" value={email} setValue={setEmail} />
        <PasswordInput
          inputTitle="Your password"
          password={enteredPassword}
          setPassword={setEnteredPassword}
        />
        <div className="w-1/2">
          <Button
            onClick={handleLogin}
            disabled={
              email.trim().length === 0 || enteredPassword.trim().length === 0
            }
            message1="Sign in"
            message2="Signing in..."
            isLoading={isLoading}
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signin;
