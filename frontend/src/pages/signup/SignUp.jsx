import React, { useState } from 'react'

import GenderCheckbox from "./GenderCheckbox";
import { Link } from 'react-router-dom';
import useSignup from '../../hooks/useSignup';

const SignUp = () => {

	const [inputs, setInputs] = useState({
		fullName :'',
		userName : '',
		password : '',
		confirmPassword : '',
		gender : ''
	})
	const {loading, signup} = useSignup();
	const handleChechboxChange =(gender)=>{
		setInputs({...inputs, gender});
	}
const handleSubmit = async (e)=>{
	e.preventDefault();
	// console.log(inputs)
	await signup(inputs);

}
	return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="h-full p-6 w-full bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Signup to<span className="text-gray-500"> ChatFriends</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter Full Name"
              className="w-full input input-bordered  h-10"
              value={inputs.fullName}
              onChange={(e) =>
                setInputs({ ...inputs, fullName: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label p-2 ">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              className="w-full input input-bordered h-10"
              value={inputs.userName}
              onChange={(e) =>
                setInputs({ ...inputs, userName: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full input input-bordered h-10"
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
            />
          </div>

          <GenderCheckbox
            onCheckboxChange={handleChechboxChange}
            selectedGender={inputs.gender}
          />

          <div>
            <button
              className="btn btn-block btn-sm mt-2 border border-slate-700"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign up"
              )}
            </button>
          </div>

          <Link
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
            to="/signin"
          >
            Already have an account?
          </Link>
        </form>
      </div>
    </div>
  );
};
export default SignUp;

// const SignUp = () => {
//   return (
//     <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
// <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
// <h1 className="text-3xl fo  nt-semibold text-center text-gray-300">
//           Signup
//           <span className="text-blue-500"> YourChatApp</span>
//         </h1>
//         <form>
//         <div>
//             <label className="label p-2">
//             <span className="text-base label-text"> Fullname</span>
//             </label>
//             <input
// 							type='text'
// 							placeholder='Enter fullname'
// 							className='w-full input input-bordered h-10'
// 						/>
//           </div>
//           <div>
//             <label className="label p-2">
//             <span className="text-base label-text"> Username</span>
//             </label>
//             <input
// 							type='text'
// 							placeholder='Enter username'
// 							className='w-full input input-bordered h-10'
// 						/>
//           </div>
//         </form>
// </div>
//     </div>
//   )
// }

// export default SignUp