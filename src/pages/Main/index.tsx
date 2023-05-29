import React, {useCallback, useEffect, useState} from 'react';
import {useQuery} from 'react-query';

import {IExtendedWord} from 'models/word.interface';
import {PageableInterface} from 'models/pageable.interface';
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
import {PaginationControls} from 'components/ui/PaginationControls';

const MAX_PAGE_ITEMS = 10;

export const Main = () => {
	const [search, setSearch] = useState<NullableString>(null);
	const [partFilter, setPartFilter] = useState<NullableString>(null);
	const [words, setWords] = useState<IExtendedWord[]>([]);

	const [pageFilter, setPageFilter] = useState<PageableInterface>({
		currentPage: 0,
		maxPage: 0
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
		handleChangeWords(true);
	}, [data, partFilter]);


	useEffect(() => {
		if(!pageFilter) {
			return;
		}
		handleChangeWords();
	}, [pageFilter]);

	const handleChangeWords = (withPageCount = false) => {
		if (!data) {
			return;
		}

		const filteredData = alphabetSort(filterWordsByParams(data, search, partFilter));

		if(withPageCount) {
			setPageFilter({
				currentPage: 1,
				maxPage: Math.ceil(filteredData.length / MAX_PAGE_ITEMS),
			});
		}

		const startPageIndex = (pageFilter!.currentPage - 1) * MAX_PAGE_ITEMS + 1;
		const endPageIndex = pageFilter!.currentPage * MAX_PAGE_ITEMS - 1;

		const currentPageData = filteredData.slice(startPageIndex, endPageIndex);
		setWords(currentPageData);
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
					pageFilter &&
					<PaginationControls data={pageFilter} changeCurrentPage={page => {
						setPageFilter(prev => ({
							maxPage: prev?.maxPage ?? 1,
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