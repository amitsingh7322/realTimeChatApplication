import React, { useState } from "react";
import { Link } from "react-router-dom";
import useSignin from "../../hooks/useSignin";

const SignIn = () => {
  const [userName, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const {loading, signin} = useSignin();

  const handleSubmit = async (e)=>{
    e.preventDefault();
    // console.log(inputs)
    await signin(userName,password);
  }

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="h-full p-6 w-full bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign in to
          <span className="text-gray-700"> ChatFriends</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
            <span className="text-base label-text"> Username</span>
            </label>
            <input
							type='text'
							placeholder='Enter username'
							className='w-full input input-bordered h-10'
              value={userName}
              onChange={(e) =>
                setUsername( e.target.value)
              }
						/>
          </div>
          <div>
          <label className="label p-2">
            <span className="text-base label-text password"> Password</span>
            </label>
            <input
							type='text'
							placeholder='Enter password'
							className='w-full input input-bordered h-10'
              value={password}
              onChange={(e) =>
                setPassword( e.target.value)
              }
						/>
          </div>
         
          <div>
          <button className='btn btn-block btn-sm mt-2'
          disabled={loading}
          >
							 {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign in"
              )}
						</button>
            <Link to='/signup' className='text-sm  hover:underline hover:text-blue-600 mt-2 inline-block'>
						{"Don't"} have an account?
					</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
