import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {useQuery} from 'react-query';

import {Layout} from 'components/Layout';
import {Input} from 'components/ui/Input';
import {Checkbox} from 'components/ui/Checkbox';
import {WordAccordion} from 'components/ui/WordAccordion';

import { useDebounce } from 'utils/useDebounce';
import {getWords} from 'queries/wordsAPI';

const MIDDLE_DELAY = 500;

const FILTER_OPTIONS = [
	{
		value: 'adj',
		label: 'Adjective'
	},
	{
		value: 'n',
		label: 'Noun'
	},
	{
		value: 'adv',
		label: 'Adverb'
	},
	{
		value: 'v',
		label: 'Verb'
	},
];

export interface IWord {
	word: string;
	defs: string[];
	tags: string[];
	score: string;
}

export const Main = () => {
	const [search, setSearch] = useState<string | null>('fre');
	const [words, setWords] = useState<IWord[]>([]);
	const [currentFilter, setCurrentFilter] = useState<string | null>(null);

	const { debounce } = useDebounce();

	const { data } = useQuery(['search', search], getWords,
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

		const shortData = data
			.slice(0,9)
			.map(word => {
				const filterDef = word.defs?.filter((def: string) => {
					if (!currentFilter) {
						return true;
					}

					const [part, definition] = def.split('\t');
					return part === currentFilter;
				});

				return {
					...word,
					defs: filterDef
				};
			})
			.filter(word => word.defs?.length > 0);

		setWords(shortData);
	}, [data, currentFilter]);

	return (
		<Layout className='flex gap-20 items-start'>
			<aside className='max-w-2xl min-h-[200px] bg-gray-300 p-5 rounded-2xl'>
				<Input  onChange={v => handleSearch(v)}/>
				{
					FILTER_OPTIONS.map((filter, index) =>
						<Checkbox
							label={filter.label}
							value={filter.value === currentFilter}
							onChange={v => setCurrentFilter(v ? filter.value : null)}
							className='mt-4'
							key={index}
						/>
					)
				}
			</aside>
			<section className='w-[100%] flex flex-col gap-2'>
				{
					words?.map(word =>
						<Fragment key={word.score}>
							<WordAccordion data={word}/>
						</Fragment>
					)
				}
			</section>
		</Layout>
	);
};