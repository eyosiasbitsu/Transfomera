"use client";

import React, { useState } from "react";
import TextInputField from "./TextInputField";
import PasswordInput from "./PasswordInput";
import { useLoginUserMutation } from "@/app/GlobalRedux/Features/auth/authApi";
import { SignInCredential } from "@/Types/Auth";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.userDetail));
      router.push("/");
      toast.success("loged in successfully");
    } catch (error) {
      toast.error("Invalid credentials");
    }
  };

  if(isLoading){
    return <p>Signing in...</p>
  }

  return (
    <div className="mb-8">
      <p className="mb-16 text-3xl">Transfomera</p>
      <div className="w-3/4 mx-auto">
        <p className="text-2xl">Sign in</p>
        <TextInputField inputTitle="Email" value={email} setValue={setEmail} />
        <PasswordInput
          inputTitle="Your password"
          password={enteredPassword}
          setPassword={setEnteredPassword}
        />
        <button
          className="bg-yellow-200 disabled:bg-gray-400 disabled:text-white text-black px-20 py-3 rounded-3xl"
          onClick={handleLogin}
          disabled={email.trim().length === 0 || enteredPassword.trim().length === 0}
        >
          Sign in
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signin;
