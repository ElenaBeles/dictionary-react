import React, {useState} from 'react';
import {IWord} from 'pages/Main';
import {Icon} from '../Icon';
import cn from 'classnames';

interface Props {
	data: IWord;
}

export const WordAccordion = ({data}: Props) => {
	const [isOpen, setIsOpen] = useState(true);

	const [isStarred, setIsStarred] = useState(false);
	
	return (
		<>
			<article className='w-[100%] flex bg-white rounded-2xl p-2'>

				<button
					onClick={() => setIsOpen(prev => !prev)}
					className={cn('mr-4 duration-500', isOpen && 'transform rotate-180')}
				>
					<Icon name='arrow-down' size={16}/>
				</button>

				<p className='font-bold'>{data.word}</p>

				<button
					onClick={() => setIsStarred(prev => !prev)}
					className={cn('ml-auto', isStarred && 'text-emerald-400')}
				>
					<Icon name='star' />
				</button>
			</article>
			{
				isOpen &&
				<div>
					{
						data.defs?.map(def => {
							const [part, definition] = def.split('\t');

							return (
								<div key={Math.random()}>
									<span className='mr-4 italic font-semibold'>{part}</span>
									<span>{definition}</span>
								</div>
							);
						})
					}
				</div>
			}
		</>
	);
};