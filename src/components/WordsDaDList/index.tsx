import React, { DragEvent, useRef } from 'react';

import {IExtendedWord} from 'models/word.interface';
import WordAccordion from 'components/WordAccordion';

interface Props {
	data: IExtendedWord[];
	setData: (items: IExtendedWord[]) => void;
	className?: string;
}

export const WordsDaDList = ({data, setData, className, ...rest}: Props) => {
	const dragItem = useRef();
	const dragOverItem = useRef();

	const dragStart = (e: DragEvent, position: number) => {
		// @ts-ignore
		dragItem.current = position;
	};

	const dragEnter = (e: DragEvent, position: number) => {
		// @ts-ignore
		dragOverItem.current = position;
	};

	const drop = () => {
		const copydataItems = [...data];
		const dragItemContent = copydataItems[dragItem.current!];
		copydataItems.splice(dragItem.current!, 1);
		copydataItems.splice(dragOverItem.current!, 0, dragItemContent);

		// @ts-ignore
		dragItem.current = null;
		// @ts-ignore
		dragOverItem.current = null;

		setData(copydataItems);
	};

	return (
		<>
			{
				data && 
				data.map((detail, index) => (
					<div
						{...rest}
						onDragStart={(e) => dragStart(e, index)}
						onDragEnter={(e) => dragEnter(e, index)}
						onDragEnd={drop}
						key={index}
						className={className}
					>
						<WordAccordion key={detail.word} data={detail} />
					</div>
				))}
		</>
	);
};