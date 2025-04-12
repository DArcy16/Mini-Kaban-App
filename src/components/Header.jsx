/** @format */

import React from "react";
import { CgGoogleTasks } from "react-icons/cg";


const Header = () => {
	return (
		<div className="flex items-center py-4 px-6 gap-3 bg-white shadow-md font-bold text-gray-800">
			<CgGoogleTasks className="size-7" />
			<h1 className="text-center text-lg md:text-xl  ">Mini Kaban App</h1>
		</div>
	);
};

export default Header;
