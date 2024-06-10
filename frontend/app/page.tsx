import { User } from "@/Types/User";
import AdminHome from "@/components/Admin/Home/AdminHome";
import TechnicianHome from "@/components/Technician/Home/TechnicianHome";
import Signin from "@/components/auth/signin/Signin";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userT") as string);
    setUser(storedUser);
  }, []);

  if (user && user.role === "Admin") {
    return <AdminHome />;
  } else if (user) {
    return <TechnicianHome />;
  }

  return <Signin />;
}
