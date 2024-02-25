import React from 'react'

import Conversations from "./Conversations";
import SignoutButton from "./SignoutButton";
import SearchInput from "./SearchInput";

const Sidebar = () => {
	return (
		<div className='border-r border-slate-500 p-4 flex flex-col'>
			<SearchInput />
			<div className='divider px-3'></div>
			<Conversations />
			<SignoutButton />
		</div>
	);
};
export default Sidebar;