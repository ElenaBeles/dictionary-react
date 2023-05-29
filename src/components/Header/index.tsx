import React from 'react';
import {NavLink} from 'react-router-dom';

import {Icon} from 'components/ui/Icon';

export const Header = () => {
	return (
		<header className='h-16 bg-blue-400 p-5'>
			<nav className='flex justify-between'>
				<NavLink
					className='text-white text-base hover:border-b-2 hover:border-b-white'
					to='/'
				>
					Word Keeper
				</NavLink>
				<NavLink
					className='flex text-white text-base hover:border-b-2 hover:border-b-white'
					to='/starred'
				>
					<Icon name='star' className='mr-2' />
					StarredWords
				</NavLink>
			</nav>
		</header>
	);
};