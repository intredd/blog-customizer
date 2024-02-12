import { useEffect } from 'react';

type UseOutsideClose = {
	isOpen: boolean;
	onChange: (newValue: boolean) => void;
	rootRef: React.RefObject<HTMLDivElement>;
};

export const useOutsideClose = ({
	isOpen,
	rootRef,
	onChange,
}: UseOutsideClose) => {
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !rootRef.current?.contains(target)) {
				onChange?.(false);
			}
		};

		window.addEventListener('click', handleClick);

		return () => {
			window.removeEventListener('click', handleClick);
		};
	}, [onChange, isOpen]);
};
