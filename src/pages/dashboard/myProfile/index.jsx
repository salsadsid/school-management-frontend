import React from "react";
import { useSelector } from "react-redux";

export const MyProfile = () => {
  const { user_info } = useSelector((state) => state.auth);
  return (
    <div className="flex items-center gap-2">
      Hello, {user_info?.email ? user_info?.email : user_info?.name}
      <span className="text-gray-800 inline-block py-1 px-2 rounded bg-green-300">
        {user_info?.role}
      </span>
    </div>
  );
};

export default MyProfile;
