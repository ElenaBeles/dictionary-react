import cn from 'classnames';

interface Props {
	data: {
		maxPage: number;
		currentPage: number;
	};
	changeCurrentPage: (v: number) => void;
	className?: string;
}

export const PaginationControls = ({data, changeCurrentPage, className}: Props) => {
	const { currentPage, maxPage } = data;
	const pages = [...new Array(maxPage)].map((_, index)=> (index + 1));

	return (
		<section className='flex flex-wrap'>
			{
				pages.map(page =>
					<button
						onClick={() => changeCurrentPage(page)}
						className={cn(
							'flex-shrink-0 border-2 rounded-lg h-10 w-10 text-center',
							currentPage === page ? 'bg-gray-300' : 'bg-white'
						)}
						disabled={currentPage === page}
						key={page}
					>
						{page}
					</button>
				)
			}
		</section>
	);
};