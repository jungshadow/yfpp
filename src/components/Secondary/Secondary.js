import React, {useContext, useRef, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {AppContext} from 'appReducer';
import MainNav from 'components/MainNav/MainNav';
import ElectionTitle from 'components/ElectionTitle/ElectionTitle';

import './secondary.scss';
import useScrollPosition from 'hooks/useScrollPosition';

const Secondary = ({getRef}) => {
    const [isSticky, setIsSticky] = useState(false);
    const [initialHeaderScrollPos, setInitialHeaderScrollPos] = useState(0);
    const {electionInfo} = useContext(AppContext);
    const secondaryRef = useRef(null);
    let initialHeaderScrollPosRef = useRef();
    let isStickyRef = useRef();
    const siteRef = getRef();

    initialHeaderScrollPosRef.current = initialHeaderScrollPos;
    isStickyRef.current = isSticky;

    useEffect(() => {
        setInitialHeaderScrollPos(secondaryRef.current.getBoundingClientRect());
    }, [secondaryRef]);

    // had to go with an effect here to set these properties for the sticky header
    // because the list items were rerendering when the header stickyness changed
    useEffect(() => {
        if (isSticky) {
            if (siteRef) {
                siteRef.current.classList.add('site--headerIsSticky');
                siteRef.current.style.paddingTop = `${initialHeaderScrollPos.height}px`;
            }
        }

        if (!isSticky) {
            if (siteRef) {
                siteRef.current.classList.remove('site--headerIsSticky');
                siteRef.current.style = null;
            }
        }
    }, [isSticky, siteRef, initialHeaderScrollPos.height]);

    const handleOnScroll = (currentScrollTop) => {
        if (currentScrollTop >= initialHeaderScrollPosRef.current.bottom) {
            if (isStickyRef.current) {
                return;
            }
            setIsSticky(true);
        } else if (
            currentScrollTop < initialHeaderScrollPosRef.current.top - initialHeaderScrollPosRef.current.height < 0
                ? 0
                : initialHeaderScrollPosRef.current.top - initialHeaderScrollPosRef.current.height
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

Secondary.propTypes = {getRef: PropTypes.func};

export default Secondary;
