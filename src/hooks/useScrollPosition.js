import {useEffect, useState} from 'react';
import {throttle} from 'lodash';

function useScrollPosition(callback) {
    const [, setScrollPosition] = useState(0);
    let previousScrollTop = 0;
    const container = document.querySelector('.site');

    function handleDocumentScroll() {
        const {scrollTop} = container;

        callback(scrollTop);
    }

    const handleDocumentScrollThrottled = throttle(handleDocumentScroll, 250);

    useEffect(() => {
        container.addEventListener('scroll', handleDocumentScrollThrottled);

        return () => container.removeEventListener('scroll', handleDocumentScrollThrottled);
    }, []);
}

export default useScrollPosition;
