// import React from "react";
// import { useAuthContext } from "../../context/AuthContext";


// const MyProfile = () => {
//     const {authUser} = useAuthContext();
//   return (
//     <div className='flex gap-2 items-center bg-slate-500 px-4 py-2 mb-2'>
// <div className={`avatar online`} >
// 					<div className='w-12 rounded-full'>
// 						<img
// 							src={authUser.profilePicture}
// 							alt='user avatar'
// 						/>
// 					</div>
// 				</div>

//                 <div className='flex'>
// 					<div className='flex gap-3 justify-between'>
// 						<p className='font-bold text-gray-200'>{authUser.fullName}</p>
// 					</div>
// 				</div>
// 			</div>
//   )
// }

// export default MyProfile


import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from "../../context/AuthContext";

const MyProfile = () => {
  const { authUser } = useAuthContext();
console.log("authuser",authUser);
  return (
    <Link to="/profile" className="cursor-pointer">
      <div className='flex gap-2 items-center bg-slate-500 px-4 py-2 mb-2'>
        <div className={`avatar online`}>
          <div className='w-12 rounded-full'>
            <img
              src={authUser.profilePicture}
              alt='user avatar'
            />
          </div>
        </div>
        <div className='flex'>
          <div className='flex gap-3 justify-between'>
            <p className='font-bold text-gray-200'>{authUser.fullName}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MyProfile;


            