// Sidebar.tsx
import React from "react";

const Sidebar: React.FC = () => {
  return (
    <div className="flex flex-col items-start bg-yellow-200 w-1/4 p-4 pt-14">
      <button
        className={`w-full text-start  my-2 px-4 py-3 rounded-md text-placeholder-color hover:bg-otpInputColor`}
      >
        Edit Profile
      </button>
      <button
        className={`w-full text-start  my-2 px-4 py-3 rounded-md text-placeholder-color hover:bg-otpInputColor`}
      >
        Notifications
      </button>
      <button
        className={`w-full text-start my-2 px-4 py-3 rounded-md text-placeholder-color hover:bg-otpInputColor`}
      >
        Password and Security
      </button>
    </div>
  );
};

export default Sidebar;
