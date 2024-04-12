import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from 'react-hot-toast'

const useSignout = () => {
  const [loading, setLoading] = useState(false);
  const {setAuthUser}= useAuthContext()

const signout = async () => {
  setLoading(true);
  try {
    const res = await fetch("api/auth/signout", {
      method: "post",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);
    if (data.error) {
      throw new Error(data.error);
    }
    //clean local storage
    localStorage.removeItem("user");
    setAuthUser(null);
  } catch (error) {
    toast.error(error.message)
  } finally {
    setLoading(false);
  }
}
return {loading, signout};
};
export default useSignout;
