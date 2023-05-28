import React, {useCallback, useEffect, useState} from 'react';
import {useQuery} from 'react-query';

import {IExtendedWord} from 'models/word.interface';
import { useDebounce } from 'utils/useDebounce';
import {alphabetSort} from 'utils/sort';
import {filterWordsByParams} from 'utils/filterWords';
import {NullableString} from 'utils/types';
import {MIDDLE_DELAY} from 'constants/delays';
import {PART_OF_SPEECH_OPTIONS} from 'constants/filters';

import {getWords} from 'queries/wordsAPI';
import {Layout} from 'components/Layout';
import {Input} from 'components/ui/Input';
import {Checkbox} from 'components/ui/Checkbox';
import WordAccordion from 'components/WordAccordion';
import {PaginationControls} from '../../components/ui/PaginationControls';

const MAX_PAGE_ITEMS = 10;

export const Main = () => {
	const [search, setSearch] = useState<NullableString>('free');
	const [partFilter, setPartFilter] = useState<NullableString>(null);
	const [words, setWords] = useState<IExtendedWord[]>([]);

	const [pageFilter, setPageFilter] = useState({
		currentPage: 1,
		maxPage: 10
	});

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
		setPageFilter({
			maxPage: Math.ceil(data.length / MAX_PAGE_ITEMS),
			currentPage: 1
		});
		handleChangeWords();
	}, [data, partFilter]);


	useEffect(() => {
		handleChangeWords();
	}, [pageFilter]);

	const handleChangeWords = () => {
		if (!data) {
			return;
		}

		const startPageIndex = (pageFilter.currentPage - 1) * MAX_PAGE_ITEMS + 1;
		const endPageIndex = pageFilter.currentPage * MAX_PAGE_ITEMS - 1;

		const currentPageData = data.slice(startPageIndex, endPageIndex);
		const sortedData = alphabetSort(filterWordsByParams(currentPageData, search, partFilter));
		setWords(sortedData);
	};

	return (
		<Layout className='flex gap-20 items-start'>
			<aside className='max-w-2xl bg-gray-300 p-5 rounded-2xl'>
				<Input  onChange={v => handleSearch(v)}/>
				{
					PART_OF_SPEECH_OPTIONS.map((filter, index) =>
						<Checkbox
							label={filter.label}
							value={filter.value === partFilter}
							onChange={v =>
								setPartFilter(v.target.checked ? filter.value : null)
							}
							className='mt-4'
							key={index}
						/>
					)
				}
			</aside>
			<section className='flex flex-col gap-2 w-[100%] min-w-0'>
				{
					pageFilter.maxPage > 2 &&
					<PaginationControls data={pageFilter} changeCurrentPage={page => {
						setPageFilter(prev => ({
							...prev,
							currentPage: page
						}));
					}}/>
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