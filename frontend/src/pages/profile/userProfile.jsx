// import React, { useState,useEffect } from 'react';
// //import { useHistory } from 'react-router-dom';
// import { useAuthContext } from './../../context/AuthContext'; // Import your authentication context
// //import { updateUserProfile, updateUserPassword } from 'your-api'; // Import functions to update profile and password

// const ProfilePage = () => {
//   //const history = useHistory();
//   //const { authUser } = useAuthContext(); // Get the logged-in user from the authentication context
//   const [authUser, setUser] = useState( useAuthContext);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [newPassword, setNewPassword] = useState('');
//   const [oldPassword, setOldPassword] = useState('');
//   const [error, setError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//     // Update user state when authUser prop changes
//     useEffect(() => {
//         setUser(authUser);
//       }, [authUser]);
//   const handleInputChange = (e, field) => {
//     setUser({ ...authUser, [field]: e.target.value });
//   };
//   const handleUpdateProfile = async () => {
//     // Implement update profile logic here
//     try {
//     //   await updateUserProfile(user.id, { /* Updated profile data */ });
//     //   setSuccessMessage('Profile updated successfully');
//     //setIsEditMode(false);
//     } catch (error) {
//       setError('Failed to update profile');
//     }
//   };

//   const handleUpdatePassword = async () => {
//     // Implement update password logic here
//     try {
//     //   await updateUserPassword(oldPassword, newPassword);
//     //   setSuccessMessage('Password updated successfully');
//     //   setOldPassword('');
//     //   setNewPassword('');
//     } catch (error) {
//       setError('Failed to update password');
//     }
//   };

//   return (
//     <div className="container mx-auto p-8">
//       <h1 className="text-3xl font-bold mb-4">My Profile</h1>
//       {error && <div className="text-red-500 mb-4">{error}</div>}
//       {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
//       {/* <div className="mb-4">
//         <label className="block mb-2">Username</label>
//         <input type="email" value={authUser.userName} className="form-input w-full" disabled onChange={(e) => setUser({...authUser, userName: e.target.value})}/>
//       </div>
//       <div className="mb-4">
//         <label className="block mb-2">Full Name</label>
//         <input type="text" value={authUser.fullName} className="form-input w-full" disbaled onChange={(e) => setUser({...authUser, fullName: e.target.value})} />
//       </div>
//       <button className="btn btn-primary mb-4" onClick={handleUpdateProfile}>Update Profile</button> */}
//       <div>
//       <div className="mb-4">
//         <label className="block mb-2">Username</label>
//         <input 
//           type="email" 
//           value={authUser.userName} 
//           className="form-input w-full" 
//           disabled={!isEditMode}
//           onChange={(e) => handleInputChange(e, 'userName')}
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block mb-2">Full Name</label>
//         <input 
//           type="text" 
//           value={authUser.fullName} 
//           className="form-input w-full" 
//           disabled={!isEditMode}
//           onChange={(e) => handleInputChange(e, 'fullName')}
//         />
//       </div>
//       {isEditMode ? (
//         <button className="btn btn-primary mb-4" onClick={handleUpdateProfile}>Update Profile</button>
//       ) : (
//         <button className="btn btn-secondary mb-4" onClick={() => setIsEditMode(true)}>Edit Profile</button>
//       )}
//     </div>
//       <div className="mb-4">
//         <label className="block mb-2">Old Password</label>
//         <input type="password" value={oldPassword} className="form-input w-full" onChange={(e) => setOldPassword(e.target.value)} />
//       </div>
//       <div className="mb-4">
//         <label className="block mb-2">New Password</label>
//         <input type="password" value={newPassword} className="form-input w-full" onChange={(e) => setNewPassword(e.target.value)} />
//       </div>
//       <button className="btn btn-primary" onClick={handleUpdatePassword}>Update Password</button>
//     </div>
//   );
// };

// export default ProfilePage;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from "react-hot-toast";
import { useAuthContext } from './../../context/AuthContext';
import useUserManagement from '../../hooks/useProfileUpdate';

const ProfilePage = () => {
  const { authUser } = useAuthContext();
  const [user, setUser] = useState(authUser);
  const [isEditMode, setIsEditMode] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
const {loading,updatePassword,updateUserInfo}= useUserManagement()
  useEffect(() => {
    setUser(authUser);
  }, [authUser]);

  const handleInputChange = (e, field) => {
    setUser({ ...user, [field]: e.target.value });
  };

  const handleUpdateProfile = async () => {
    try {
    const success =  await updateUserInfo({
        fullName: user.fullName,
        userName: user.userName,
      });
      console.log("sucess",success);
      if(success){
        toast.success(success);
      }
      
      setIsEditMode(false);
    } catch (error) {
      setError('Failed to update profile');
    }
  };

  const handleUpdatePassword = async () => {
    try {
    const success=  await updatePassword({
        oldPassword,
        newPassword,
      });
      if(success){
        toast.success(success);
      }
      setOldPassword('');
      setNewPassword('');
    } catch (error) {
      setError('Failed to update password');
    }
  };

  return (
<div className='flex sm:h-[500px] md:h-[600px] rounded-lg overflow-y-scroll bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30 p-8 flex-col w-full md:w-3/4 lg:w-1/2 xl:w-1/3'>

    <h1 className="text-3xl font-bold mb-4 text-center text-black">My Profile</h1>
    {error && <div className="text-red-500 mb-4">{error}</div>}
    {/* {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>} */}

    <div className="mb-4">
      <label className="block mb-2 text-white">Username</label>
      <input 
        type="email" 
        value={user.userName} 
        className="form-input w-full bg-gray-200 text-gray-900 p-2 rounded-md" 
        disabled={!isEditMode}
        onChange={(e) => handleInputChange(e, 'userName')}
      />
    </div>

    <div className="mb-4">
      <label className="block mb-2 text-white">Full Name</label>
      <input 
        type="text" 
        value={user.fullName} 
        className="form-input w-full bg-gray-200 text-gray-900 p-2 rounded-md" 
        disabled={!isEditMode}
        onChange={(e) => handleInputChange(e, 'fullName')}
      />
    </div>

    <div className="flex justify-between">
      {isEditMode ? (
        <button className="btn btn-primary bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md" onClick={handleUpdateProfile}>Update Profile</button>
      ) : (
        <button className="btn btn-secondary bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md" onClick={() => {setIsEditMode(true)} }>Edit Profile</button>
      )}
 </div>
      <div className="flex flex-col">
        <label className="block mb-2 text-white">Old Password</label>
        <input 
          type="password" 
          value={oldPassword} 
          className="form-input bg-gray-200 text-gray-900 p-2 rounded-md mb-4" 
          onChange={(e) => setOldPassword(e.target.value)} 
        />
        <label className="block mb-2 text-white">New Password</label>
        <input 
          type="password" 
          value={newPassword} 
          className="form-input bg-gray-200 text-gray-900 p-2 rounded-md mb-4" 
          onChange={(e) => setNewPassword(e.target.value)} 
        />

<div className="flex ">
  <button className="btn btn-primary bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md" onClick={handleUpdatePassword}>Update Password</button>

</div>
<div className='mt-4'>
  <Link to="/" className="cursor-pointer text-black-40 text-center hover:text-blue-700 block font-semibold text-lg">Return to Home</Link>
</div>

</div>
   

   
  </div>
  );
};

export default ProfilePage;
