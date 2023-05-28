import React, {useCallback, useEffect, useState} from 'react';

import {IExtendedWord, IWord} from 'models/word.interface';
import {useDebounce} from 'utils/useDebounce';
import {alphabetSort} from 'utils/sort';
import {useAppSelector} from 'utils/redux-hooks';
import {MIDDLE_DELAY} from 'constants/delays';
import {PART_OF_SPEECH_OPTIONS} from 'constants/filters';

import {Layout} from 'components/Layout';
import {Input} from 'components/ui/Input';
import {Checkbox} from 'components/ui/Checkbox';
import WordAccordion from 'components/WordAccordion';

export const Starred = () => {
	const [search, setSearch] = useState<string | null>(null);
	const [words, setWords] = useState<IExtendedWord[]>([]);
	const [currentFilter, setCurrentFilter] = useState<string | null>(null);

	const data = useAppSelector(state => state.persistedReducer.starredWords) as IWord[];

	const { debounce } = useDebounce();

	const handleSearch = useCallback(debounce((inputVal: string) => setSearch(inputVal), MIDDLE_DELAY), []);

	useEffect(() => {
		if(!Array.isArray(data)) {
			return;
		}
		const shortData = data
			.filter(detail => detail.word.startsWith(search ?? ''))
			.map(detail => {
				const filterDefs: string[] = [];
				const hiddenDefs: string[] = [];

				detail.defs?.forEach(def => {
					const [part, definition] = def.split('\t');

					if(part === currentFilter || !currentFilter) {
						filterDefs.push(def);
					} else {
						hiddenDefs.push(def);
					}
				});

				return {
					...detail,
					defs: filterDefs,
					hiddenDefs
				};
			})
			.filter(word => word.defs?.length > 0);

		setWords(alphabetSort(shortData));
	}, [data, currentFilter, search]);

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
				{
					words?.map(word =>
						<WordAccordion key={word.word} data={word}/>
					)
				}
			</section>
		</Layout>
	);
};