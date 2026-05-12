import { useEffect, type RefObject } from 'react';

const useOutsideClick = (ref: RefObject<HTMLElement | null>, callback: (ref: RefObject<HTMLElement | null>, trigger: string) => void): void => {
    const handleClick = (e: MouseEvent) => {
        if (ref.current && !ref.current.contains(e.target as Node)) {
            callback(ref, 'click');
        }
    };

    const handleEscKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            callback(ref, 'esc');
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClick);
        document.addEventListener('keydown', handleEscKey);

        return () => {
            document.removeEventListener('click', handleClick);
            document.removeEventListener('keydown', handleEscKey);
        };
    });
};

export default useOutsideClick;
