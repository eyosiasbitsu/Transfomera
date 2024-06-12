"use client"

import { User } from "@/Types/User";
import AdminHome from "@/components/Admin/Home/AdminHome";
import TechnicianHome from "@/components/Technician/Home/TechnicianHome";
import Signin from "@/components/auth/signin/Signin";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userT") as string);
    setUser(storedUser);
  }, []);

  if (user && user.role === "Admin") {
    return <AdminHome />;
  } else if (user) {
    return <TechnicianHome/>;
  }

  router.push("/signin");
}
