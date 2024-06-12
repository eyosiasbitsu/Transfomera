"use client";

import { User } from "@/Types/User";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userT") as string);    
    setUser(storedUser);
  }, []);

  useEffect(() => {
    if (user) {
      if (user.role === "Admin") {
        router.push("/admin");
      } else {
        router.push("/technician");
      }
    } else {
      router.push("/signin");
    }
  }, [user, router]);

  return null; // or a loading indicator if needed
}

export default HomePage;
