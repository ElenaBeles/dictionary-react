import {ReactNode} from 'react';
import cn from 'classnames';

import {Header} from 'components/Header';

interface Props {
	children?: ReactNode;
	className?: string;
}

export const Layout = ({children, className, ...rest}: Props) => {
	return (
		<div className='bg-gray-200 min-h-screen'>
			<Header />
			<main
				{...rest}
				className={cn('mx-auto py-10 max-w-4xl', className)}
			>
				{children}
			</main>
		</div>
	);
};