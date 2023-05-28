import cn from 'classnames';

interface Props {
	onChange: (v: string) => void;
	placeholder?: string;
	className?: string;
}

export const Input = ({onChange, placeholder, className, ...rest}: Props) => {
	return (
		<label
			className={cn('block max-w-2xl bg-white py-3 px-6 border-white border-2 rounded-lg', className)}
		>
			<input
				{...rest}
				placeholder={placeholder}
				onChange={v => onChange(v.target.value)}
				className='bg-transparent'
				type='text'
			/>
		</label>
	);
};