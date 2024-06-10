"use client"

// Sidebar.tsx
import { User } from "@/Types/User";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Sidebar: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userT") as string);
    setUser(storedUser);
  }, []);

  return (
    <div className="flex flex-col items-start bg-yellow-200 w-1/4 p-4 pt-14">
      <Link
        href={`${user?.role === "Admin" ? "/admin" : "/technician"}`}
        className={`w-full text-start font-semibold my-2 px-4 py-3 rounded-md hover:bg-white hover:text-yellow-400`}
      >
        Home
      </Link>
      <Link
        href={`${user?.role === "Admin" ? "/admin/profile" : "/technician/profile"}`}
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
      
    </div>
  );
};

export default Sidebar;
