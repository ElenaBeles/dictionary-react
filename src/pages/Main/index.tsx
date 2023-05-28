import React, {useCallback, useEffect, useState} from 'react';
import {useQuery} from 'react-query';

import {IExtendedWord} from 'models/word.interface';
import { useDebounce } from 'utils/useDebounce';
import {alphabetSort} from 'utils/sort';
import {MIDDLE_DELAY} from 'constants/delays';
import {PART_OF_SPEECH_OPTIONS} from 'constants/filters';

import {getWords} from 'queries/wordsAPI';
import {Layout} from 'components/Layout';
import {Input} from 'components/ui/Input';
import {Checkbox} from 'components/ui/Checkbox';
import WordAccordion from 'components/WordAccordion';

export const Main = () => {
	const [search, setSearch] = useState<string | null>(null);
	const [words, setWords] = useState<IExtendedWord[]>([]);
	const [currentFilter, setCurrentFilter] = useState<string | null>(null);

	const { debounce } = useDebounce();

	const { data, isLoading } = useQuery(['search', search], getWords,
		{
			retry: 0,
			refetchOnWindowFocus: false,
			enabled: !!search
		});

	const handleSearch = useCallback(debounce((inputVal: string) => setSearch(inputVal), MIDDLE_DELAY), []);

	useEffect(() => {
		if(!Array.isArray(data)) {
			return;
		}

		const shortData: IExtendedWord[] = data
			.slice(0,9)
			.map(word => {
				const filterDefs: string[] = [];
				const hiddenDefs: string[] = [];

				word.defs?.forEach(def => {
					const [part, definition] = def.split('\t');

					if(part === currentFilter || !currentFilter) {
						filterDefs.push(def);
					} else {
						hiddenDefs.push(def);
					}
				});

				return {
					...word,
					defs: filterDefs,
					hiddenDefs
				};
			})
			.filter(word => word.defs?.length > 0);

		setWords(alphabetSort(shortData));
	}, [data, currentFilter]);

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
					words?.map(word =>
						<WordAccordion key={word.word} data={word}/>
					)
				}
			</section>
		</Layout>
	);
};