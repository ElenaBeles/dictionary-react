import React from 'react';
import {NavLink} from 'react-router-dom';

export const Header = () => {
	return (
		<header className='h-16 bg-blue-400 p-5'>
			<nav className='flex justify-between'>
				<NavLink
					className='text-white text-base hover:border-b-2 hover:border-b-white'
					to='/'
				>
					WordKeeper
				</NavLink>
				<NavLink
					className='text-white text-base hover:border-b-2 hover:border-b-white'
					to='/starred'
				>
					StarredWords
				</NavLink>
			</nav>
		</header>
	);
};