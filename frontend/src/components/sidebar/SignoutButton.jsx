import React from 'react'
import {BiLogOut} from  'react-icons/bi'
const SignoutButton = () => {
  return (
    <div className='flex items-center'>
    <BiLogOut className="w-6 h-6 text-white cursor-pointer" />
    <span className="text-white ml-2 cursor-pointer">Signout</span>
  </div>
  
  )
}

export default SignoutButton