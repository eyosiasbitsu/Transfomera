// PasswordSecurity.tsx
import React, { useState } from "react";
import PasswordInput from "@/components/auth/signin/PasswordInput";
import Button from "@/components/UI/Button";
import { useResetUserPasswordMutation } from "@/app/GlobalRedux/Features/auth/authAPI";
import { PasswordResetParameter } from "@/Types/User";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

interface PasswordAndSecurityProps {
  userId: string;
}

const PasswordAndSecurity: React.FC<PasswordAndSecurityProps> = ({
  userId,
}) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [errors, setErrors] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    passwordMatch: "",
  });

  const router = useRouter();
  const [resetUserPassword] = useResetUserPasswordMutation();

  const handleUpdate = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (validateForm()) {
      // Submit form data
      setIsUpdating(true);
      const enteredData: PasswordResetParameter = {
        userId: userId, //"60fa1872-e4b2-4f67-8506-d08065903b75", //localStorage.getItem("id") as string,
        oldPassword,
        newPassword,
      };
      const res = await resetUserPassword(enteredData).unwrap();

      toast.success("Password updated successfully");
      setIsUpdating(false);
      router.refresh();
    } else {
      toast.error("Could not update password!");
      console.log("Form validation failed");
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (oldPassword.length === 0) {
      newErrors.oldPassword = "You have not entered your old password!";
      valid = false;
    } else {
      newErrors.oldPassword = "";
    }

    // Password match validation
    if (newPassword.length === 0) {
      newErrors.newPassword = "You have not entered your new password!";
      valid = false;
    } else {
      newErrors.newPassword = "";
    }

    if (confirmPassword.length === 0) {
      newErrors.confirmPassword =
        "You have not entered your confirmation password!";
      valid = false;
    } else {
      newErrors.confirmPassword = "";
    }

    if (newPassword !== confirmPassword) {
      newErrors.passwordMatch = "Passwords do not match!";
      valid = false;
    } else {
      newErrors.passwordMatch = "";
    }

    setErrors(newErrors);
    return valid;
  };

  return (
    <div className="px-2">
      <PasswordInput
        inputTitle="Old Password"
        password={oldPassword}
        setPassword={setOldPassword}
      />
      {errors.oldPassword && (
        <span className="text-red-500">{errors.oldPassword}</span>
      )}
      <PasswordInput
        inputTitle="New Password"
        password={newPassword}
        setPassword={setNewPassword}
      />
      {errors.newPassword && (
        <span className="text-red-500">{errors.newPassword}</span>
      )}

      <PasswordInput
        inputTitle="Confirm Password"
        password={confirmPassword}
        setPassword={setConfirmPassword}
      />
      {errors.confirmPassword && (
        <span className="text-red-500">{errors.confirmPassword}</span>
      )}
      {errors.passwordMatch && (
        <span className="text-red-500">{errors.passwordMatch}</span>
      )}

      <div className="mt-6">
        <Button
          isLoading={isUpdating}
          onClick={handleUpdate}
          message1="Update"
          message2="Updating..."
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default PasswordAndSecurity;
