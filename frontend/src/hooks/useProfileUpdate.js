import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useUserManagement = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
  
    const updateUserInfo = async ({ fullName, userName }) => {
      const success = handleInputErrors({
        fullName,
        userName,
      });
      console.log("userName", userName, fullName)
      if (!success) return;
      setLoading(true);
      try {
        const res = await fetch("/api/users/updateuserinfo", {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName: fullName,
            userName: userName,
          }),
        });
        const data = await res.json();
        console.log("dataaaaa",data);
        if (data.error) {
          throw new Error(data.error);
        }
        return data.message;
        // Update local storage and context with updated user info if needed
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    const updatePassword = async ({ oldPassword, newPassword }) => {
        const success = handlePasswordInputErrors({
            oldPassword,
            newPassword,
          });
          if (!success) return;
      setLoading(true);
      try {
        const res = await fetch("/api/users/updatepassword", {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
           new_password: newPassword,
           old_password: oldPassword,
          }),
        });
        const data = await res.json();
        console.log(data);
        if (data.error) {
          throw new Error(data.error);
        }
        return data.message;
        // Handle success or update local storage and context as needed
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    return { loading, updateUserInfo, updatePassword };
  };
  
  export default useUserManagement;
  

function handleInputErrors({
    fullName,
    userName,
  }) {
    if (!fullName && !userName) {
      toast.error("All fields are required");
      return false;
    }
    return true;
  }
  
  function handlePasswordInputErrors({
    oldPassword,
    newPassword,
  }) {
    if (!oldPassword || !newPassword) {
      toast.error("Please enter both old password and new password");
      return false;
    }
    if (newPassword.length < 6) {
        toast.error("Password cannot be less than 6 characters");
        return false;
      }
      if (newPassword === oldPassword) {
        toast.error("Old password and new password can't be the same");
        return false;
      }
    return true;
  }