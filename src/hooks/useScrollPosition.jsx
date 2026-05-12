import { useEffect, useRef, useCallback } from 'react';

function useThrottledCallback(fn, delay) {
    const lastRun = useRef(0);
    const timeoutRef = useRef(null);
    const fnRef = useRef(fn);
    fnRef.current = fn;

    const throttled = useCallback((...args) => {
        const now = Date.now();
        const remaining = delay - (now - lastRun.current);
        if (remaining <= 0) {
            lastRun.current = now;
            fnRef.current(...args);
        } else if (!timeoutRef.current) {
            timeoutRef.current = setTimeout(() => {
                lastRun.current = Date.now();
                timeoutRef.current = null;
                fnRef.current(...args);
            }, remaining);
        }
    }, [delay]);

    useEffect(() => () => clearTimeout(timeoutRef.current), []);

    return throttled;
}

function useScrollPosition(callback) {
    const handleScroll = useThrottledCallback(() => {
        const container = document.querySelector('.site');
        if (container) {
            callback(container.scrollTop);
        }
    }, 250);

    useEffect(() => {
        const container = document.querySelector('.site');
        if (container) {
            container.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, [handleScroll]);
}

export default useScrollPosition;
