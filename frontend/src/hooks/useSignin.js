import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext';

const useSignin = () => {
    const [loading, setLoading] = useState(false)
     const {setAuthUser}= useAuthContext()
    
    const signin = async(userName,password)=>{
        const success = handleInputErrors({userName,password})
        if(!success) return;
    setLoading(true)
        try {
            const res= await fetch('https://chatfreinds.onrender.com/api/auth/signin',{
                method: "post",
                credentials: "include",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({userName,password})
    
            })
    const data = await res.json();
    console.log(data)
    if(data.error){
        throw new Error(data.error);
    }
    //local-storage context
    localStorage.setItem("user", JSON.stringify(data));
    setAuthUser(data);
        } catch (error) {
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }
    return{loading, signin};
    };

    export default useSignin;

    function handleInputErrors({userName,password}){
        if(!userName || !password){
            toast.error('Please enter your username and password')
            return false;   
        }
        return true;
    }