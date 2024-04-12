import React from 'react'
import {BiLogOut} from  'react-icons/bi'
import useSignout from '../../hooks/useSignout'
const SignoutButton = () => {
const {loading,signout}=  useSignout()
  return (
    <div className='flex items-center px-4 py-2'>
    {!loading ? (
      <>
        <BiLogOut className='w-6 h-6 text-white cursor-pointer' onClick={signout} />
        <span className='ml-2 text-white cursor-pointer' onClick={signout}>Sign out</span>
      </>
    ) : (
      <span className='loading loading-spinner'></span>
    )}
  </div>
  
  
  )
}

export default SignoutButton

