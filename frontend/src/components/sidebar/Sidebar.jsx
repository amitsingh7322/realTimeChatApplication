import React from 'react'

import Conversations from "./Conversations";
import SignoutButton from "./SignoutButton";
import SearchInput from "./SearchInput";
import MyProfile from './MyProfile';


const Sidebar = () => {
	return (
		
		<div className='border-r border-slate-500 flex flex-col'>
		<MyProfile />
		<div className='border-r border-slate-500 p-4 flex flex-col'>
	
			<SearchInput />
				<div className='divider px-3 p-4 my-0'></div>
			<Conversations />
			<SignoutButton />	
			</div>
		</div>
	);
};
export default Sidebar;