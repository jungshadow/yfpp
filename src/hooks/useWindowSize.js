import { useState, useEffect } from 'react';
import { debounce } from 'lodash';

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        const handleResize = debounce(() => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }, 200);

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
};

export default useWindowSize;
