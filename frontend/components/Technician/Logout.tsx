"use client"

import Image from "next/image";
import React from "react";
import logoutIcon from "@/public/images/Technician/logoutIcon.svg";
import { useRouter } from "next/navigation";


const Logout = () => {
    const router = useRouter();
    const handleLogin = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        router.push('/signin');
    }
  return (
    <div onClick={handleLogin} className="flex justify-end items-center gap-2 hover:cursor-pointer">
      <Image src={logoutIcon} alt="Logout Icon" />
      <span className="font-semibold">Log out</span>
    </div>
  );
};

export default Logout;
