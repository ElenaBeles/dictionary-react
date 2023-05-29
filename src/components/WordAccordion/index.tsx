import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import cn from 'classnames';

import {IExtendedWord} from 'models/word.interface';
import {addWord, deleteWord} from 'slices/starredWordsSlice';
import {Icon} from 'components/ui/Icon';
import {useAppSelector} from 'utils/redux-hooks';

interface Props {
	data: IExtendedWord;
}

const WordAccordion = ({data}: Props) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isStarred, setIsStarred] = useState(false);

	const starredDictionary = useAppSelector(state => state.persistedReducer.starredWords);
	const dispatch = useDispatch();

	const handleStarredWord = () => {
		const shortWord = {
			...data,
			defs: [...data.defs, ...data.hiddenDefs]
		};
		dispatch(isStarred ? deleteWord(shortWord) : addWord(shortWord));
	};

	useEffect(() => {
		const wordInDictionary = starredDictionary?.find(word => word.score === data.score);
		setIsStarred(!!wordInDictionary);
	}, [starredDictionary]);

	return (
		<>
			<article className='w-[100%] flex bg-white rounded-2xl p-2'>
				<button
					onClick={() => setIsOpen(prev => !prev)}
					className={cn('mr-4 duration-500', isOpen && 'transform rotate-180')}
				>
					<Icon name='arrow-down' size={16} />
				</button>
				<p className='font-bold'>{data.word}</p>
				<button
					onClick={() => handleStarredWord()}
					className={cn('ml-auto', isStarred && 'text-emerald-400')}
				>
					<Icon name='star' />
				</button>
			</article>
			<div
				style={{transition: 'all 500ms ease-in-out'}}
				className={cn(isOpen ? 'max-h-[1000px] overflow-y-auto' : 'max-h-0', 'flex flex-col gap-2 overflow-hidden')}
			>
				{
					data.defs?.map(def => {
						const [part, definition] = def.split('\t');
						return (
							<div className='flex' key={def}>
								<span className='mr-4 italic font-semibold'>{part}</span>
								<span className='truncate'>{definition}</span>
							</div>
						);
					})
				}
			</div>
		</>
	);
};

export default React.memo(WordAccordion);