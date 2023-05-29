import {ChangeEvent} from 'react';
import cn from 'classnames';

interface Props {
	value: boolean;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void,
	label: string;
	className?: string;
}

export const Checkbox = ({value, onChange, label, className, ...rest}: Props) => {
	return (
		<label className={cn('flex items-center', className)}>
			<input
				{...rest}
				type='checkbox'
				checked={value}
				onChange={v => onChange(v)}
				className='opacity-0 absolute h-6 w-6'
			/>
			<div className={cn(
				value ? 'bg-blue-400' : 'bg-white',
				'rounded-md w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2'
			)
			}/>
			<span>{label}</span>
		</label>
	);
};