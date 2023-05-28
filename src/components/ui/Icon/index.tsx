interface Props {
	name: string;
	size?: number;
	className?: string;
}

export const Icon = (props: Props) => {
	const {className, name, size = 24} = props;

	return (
		<svg
			className={className}
			version='1.1'
			xmlns='http://www.w3.org/2000/svg'
			style={{
				fill: 'currentColor',
				width: `${size}px`,
				height: `${size}px`,
			}}
		>
			<use xlinkHref={`/sprite.svg#${name}`}/>
		</svg>
	);
};