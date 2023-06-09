import React, {useCallback, useEffect, useState} from 'react';

import {IExtendedWord, IWord} from 'models/word.interface';
import {useDebounce} from 'utils/useDebounce';
import {useAppDispatch, useAppSelector} from 'utils/redux-hooks';
import {filterWordsByParams} from 'utils/filterWords';
import {NullableString} from 'utils/types';
import {MIDDLE_DELAY} from 'constants/delays';
import {PART_OF_SPEECH_OPTIONS} from 'constants/filters';
import {changeStarredList} from 'slices/starredWordsSlice';

import {Layout} from 'components/Layout';
import {Input} from 'components/ui/Input';
import {Checkbox} from 'components/ui/Checkbox';
import {WordsDaDList} from 'components/WordsDaDList';

export const Starred = () => {
	const [words, setWords] = useState<IExtendedWord[]>([]);
	const [search, setSearch] = useState<NullableString>(null);
	const [currentFilter, setCurrentFilter] = useState<NullableString>(null);

	const storeState = useAppSelector(state => state.persistedReducer.starredWords) as IWord[];
	const { debounce } = useDebounce();

	const handleSearch = useCallback(debounce((inputVal: string) => setSearch(inputVal), MIDDLE_DELAY), []);

	useEffect(() => {
		if(!Array.isArray(storeState)) {
			return;
		}
		setWords(filterWordsByParams(storeState, search, currentFilter));
	}, [storeState, currentFilter, search]);

	const dispatch = useAppDispatch();

	return (
		<Layout className='flex gap-20 items-start'>
			<aside className='max-w-2xl bg-gray-300 p-5 rounded-2xl'>
				<Input  onChange={v => handleSearch(v)}/>
				{
					PART_OF_SPEECH_OPTIONS.map((filter, index) =>
						<Checkbox
							label={filter.label}
							value={filter.value === currentFilter}
							onChange={v =>
								setCurrentFilter(v.target.checked ? filter.value : null)
							}
							className='mt-4'
							key={index}
						/>
					)
				}
			</aside>
			<section className='flex flex-col gap-2 w-[100%] min-w-0'>
				{
					words.length === 0 && <span className='text-gray-600'>The list is currently empty</span>
				}
				<WordsDaDList
					data={words}
					setData={v => dispatch(changeStarredList(v))}
				/>
			</section>
		</Layout>
	);
};