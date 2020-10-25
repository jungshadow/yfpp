import { useEffect } from 'react';

const useOutsideClick = (ref, callback) => {
    const handleClick = e => {
        if (ref.current && !ref.current.contains(e.target)) {
            callback(ref, 'click');
        }
    };

    const handleEscKey = e => {
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
