import React, {useContext, useRef, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {AppContext} from 'appReducer';
import MainNav from 'components/MainNav/MainNav';
import ElectionTitle from 'components/ElectionTitle/ElectionTitle';

import './secondary.scss';
import useScrollPosition from 'hooks/useScrollPosition';

const Secondary = ({setIsSticky, isSticky}) => {
    const [initialHeaderScrollPos, setInitialHeaderScrollPos] = useState(0);
    const {electionInfo} = useContext(AppContext);
    const secondaryRef = useRef(null);
    let initialHeaderScrollPosRef = useRef();
    let isStickyRef = useRef();

    initialHeaderScrollPosRef.current = initialHeaderScrollPos;
    isStickyRef.current = isSticky;

    useEffect(() => {
        setInitialHeaderScrollPos(secondaryRef.current.getBoundingClientRect());
    }, [secondaryRef]);

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
        <div className={getSecondaryClassname()} ref={secondaryRef}>
            {!isSticky && (
                <div className="secondary__heading">
                    <ElectionTitle electionInfo={electionInfo} />
                </div>
            )}
            <div className="secondary__nav">
                <MainNav />
            </div>
        </div>
    );
};

Secondary.propTypes = {};

export default Secondary;
