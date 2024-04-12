import React from 'react'

import Conversations from "./Conversations";
import SignoutButton from "./SignoutButton";
import SearchInput from "./SearchInput";
import MyProfile from './MyProfile';

const Sidebar = () => {
	return (
		<div className='border-r border-slate-500 flex flex-col'>
			<MyProfile />
			
			<SearchInput />
				<div className='divider px-3 p-4 my-0'></div>
			<Conversations />
			
			<SignoutButton />
		</div>
		
	);
};
export default Sidebar;