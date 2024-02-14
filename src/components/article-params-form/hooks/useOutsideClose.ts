import { useEffect } from 'react';

const doc = document;

type UseOutsideClose = {
	isOpen: boolean;
	onChange: (newValue: boolean) => void;
	rootRef: React.RefObject<HTMLElement>;
};

export const useOutsideClose = ({
	isOpen,
	rootRef,
	onChange,
}: UseOutsideClose) => {
	useEffect(() => {
		const handleClickAside = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !rootRef.current?.contains(target) && document.body.contains(target)) {
				onChange?.(false);
			}
		};

		window.addEventListener('click', handleClickAside);

		return () => {
			window.removeEventListener('click', handleClickAside);
		};
	}, [onChange, isOpen]);
};
