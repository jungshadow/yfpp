import { useEffect, useRef, useCallback } from 'react';

function useThrottledCallback<T extends (...args: unknown[]) => void>(fn: T, delay: number): (...args: Parameters<T>) => void {
    const lastRun = useRef(0);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const fnRef = useRef(fn);
    fnRef.current = fn;

    const throttled = useCallback((...args: Parameters<T>) => {
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

    useEffect(() => () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }, []);

    return throttled;
}

function useScrollPosition(callback: (scrollTop: number) => void): void {
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
