import { useRef, useEffect } from 'react';

export const useDebounce = () => {
	const timeout = useRef<ReturnType<typeof setTimeout> | undefined>();

	const debounce = (func: Function, wait: number) => (...args: any) => {
		clearTimeout(timeout.current);
		timeout.current = setTimeout(() => func(...args), wait);
	};

	useEffect(() => {
		return () => {
			if (!timeout.current) return;
			clearTimeout(timeout.current);
		};
	}, []);

	return {debounce};
};