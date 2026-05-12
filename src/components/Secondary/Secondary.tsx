import React, {useContext, useRef, useState, useEffect} from 'react';
import classnames from 'classnames';

import {AppContext} from 'appReducer';
import MainNav from 'components/MainNav/MainNav';
import ElectionTitle from 'components/ElectionTitle/ElectionTitle';

import './secondary.scss';
import useScrollPosition from 'hooks/useScrollPosition';

interface SecondaryProps {
    getRef: () => React.RefObject<HTMLDivElement | null>;
}

const Secondary = ({getRef}: SecondaryProps) => {
    const [isSticky, setIsSticky] = useState(false);
    const [initialHeaderScrollPos, setInitialHeaderScrollPos] = useState<DOMRect | null>(null);
    const {electionInfo} = useContext(AppContext);
    const secondaryRef = useRef<HTMLDivElement>(null);
    let initialHeaderScrollPosRef = useRef<DOMRect | null>(null);
    let isStickyRef = useRef<boolean>(false);
    const siteRef = getRef();

    initialHeaderScrollPosRef.current = initialHeaderScrollPos;
    isStickyRef.current = isSticky;

    useEffect(() => {
        if (secondaryRef.current) {
            setInitialHeaderScrollPos(secondaryRef.current.getBoundingClientRect());
        }
    }, [secondaryRef]);

    // had to go with an effect here to set these properties for the sticky header
    // because the list items were rerendering when the header stickyness changed
    useEffect(() => {
        if (isSticky) {
            if (siteRef && siteRef.current) {
                siteRef.current.classList.add('site--headerIsSticky');
                siteRef.current.style.paddingTop = `${initialHeaderScrollPos?.height ?? 0}px`;
            }
        }

        if (!isSticky) {
            if (siteRef && siteRef.current) {
                siteRef.current.classList.remove('site--headerIsSticky');
                siteRef.current.style.paddingTop = '';
            }
        }
    }, [isSticky, siteRef, initialHeaderScrollPos?.height]);

    const handleOnScroll = (currentScrollTop: number) => {
        const pos = initialHeaderScrollPosRef.current;
        if (!pos) return;
        if (currentScrollTop >= pos.bottom) {
            if (isStickyRef.current) {
                return;
            }
            setIsSticky(true);
        } else if (
            currentScrollTop < (pos.top - pos.height < 0
                ? 0
                : pos.top - pos.height)
        ) {
            if (!isStickyRef.current) {
                return;
            }
            setIsSticky(false);
        }
    };

    useScrollPosition(handleOnScroll);

    const getSecondaryClassname = () => classnames({secondary: true, 'secondary--isSticky': isSticky});

    return (
        <div className={getSecondaryClassname()}>
            {true && (
                <div className="secondary__heading">
                    <ElectionTitle electionInfo={electionInfo} />
                </div>
            )}
            <div className="secondary__nav" ref={secondaryRef}>
                <MainNav />
            </div>
        </div>
    );
};

Secondary.propTypes = {} as Record<string, never>;

export default Secondary;
