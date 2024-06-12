"use client";

// Sidebar.tsx
import { User } from "@/Types/User";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import roundedLeaf from "@/public/images/Round Leaf.svg";
import sharpLeaf from "@/public/images/Sharp Leaf.svg";
import { usePathname } from "next/navigation";
// import logo from '@/public/images/transformera_logo.png';

const Sidebar: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userT") as string);
    setUser(storedUser);
  }, []);

  const pathName = usePathname();

  return (
    <div className="flex flex-col items-start bg-yellow-200 w-1/4 p-4">
      {/* <Image src={logo} alt="Logo" className="w-10 h-12" /> */}
      <div className="flex gap-16 mb-16">
        <Image src={sharpLeaf} alt="Sharp Leaf" />
        <Image src={roundedLeaf} alt="Rounded Leaf" />
      </div>
      {pathName === "/signin" && (
        <p className="text-3xl font-bold mx-auto">Welcome</p>
      )}
      {pathName !== "/signin" && (
        <>
          <Link
            href={`${user?.role === "Admin" ? "/admin" : "/technician"}`}
            className={`w-full text-start font-semibold my-2 px-4 py-3 rounded-md hover:bg-white hover:text-yellow-400`}
          >
            Home
          </Link>
          <Link
            href={`${
              user?.role === "Admin" ? "/admin/profile" : "/technician/profile"
            }`}
            className={`w-full text-start font-semibold my-2 px-4 py-3 rounded-md hover:bg-white hover:text-yellow-400`}
          >
            My Profile
          </Link>
          <Link
            href="/register"
            className={`w-full text-start font-semibold my-2 px-4 py-3 rounded-md hover:bg-white hover:text-yellow-400`}
          >
            Register a Transformer
          </Link>
        </>
      )}
    </div>
  );
};

export default Sidebar;
