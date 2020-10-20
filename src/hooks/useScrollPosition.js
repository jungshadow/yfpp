import {useEffect} from 'react';
import {throttle} from 'lodash';

function useScrollPosition(callback) {
    const container = document.querySelector('.site');

    function handleDocumentScroll() {
        const {scrollTop} = container;

        callback(scrollTop);
    }

    const handleDocumentScrollThrottled = throttle(handleDocumentScroll, 250);

    useEffect(() => {
        if (container) {
            container.addEventListener('scroll', handleDocumentScrollThrottled);
        }

        return () => {
            if (container) {
                container.removeEventListener('scroll', handleDocumentScrollThrottled);
            }
        };
    }, [handleDocumentScrollThrottled, container]);
}

export default useScrollPosition;
