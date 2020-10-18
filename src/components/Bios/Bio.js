import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import {motion} from 'framer-motion';
import classnames from 'classnames';

import './bio.scss';
import {CloseIcon, LinkedInIcon} from 'components/Icons';
import useOutsideClick from 'hooks/useOutsideClick';
import IconLink from 'components/IconLink/IconLink';

const Bio = ({data, isActive, onClick, index, slug}) => {
    const bioRef = useRef();
    useOutsideClick(bioRef, handleClickBio);

    const openSpring = {type: 'spring', stiffness: 200, damping: 30};
    const closeSpring = {type: 'spring', stiffness: 300, damping: 35};

    function handleClickBio(ref) {
        // we only want to call the callback if the handler that fired is attached to an element that is active
        // TODO: I'm not crazy about using  the DOM as the source of truth here, but it works for now.
        if (ref.current.classList.contains('bio--isActive')) {
            onClick(index);
        }
    }

    function getBioClassName() {
        return classnames({
            bio: true,
            'bio--isActive': isActive,
            'bio--isSlug': slug
        });
    }

    return (
        <motion.div
            className={getBioClassName()}
            ref={bioRef}
            onClick={() => onClick(index)}
            key={data.firstname}
            layoutTransition={isActive ? openSpring : closeSpring}
            layout
        >
            {isActive && (
                <button className="bio__closeBtn" type="button" onClick={() => onClick(index)}>
                    <span className="isVisuallyHidden">close</span>
                    <span className="bio__closeBtnIcon">
                        <CloseIcon />
                    </span>
                </button>
            )}
            <motion.div className="bio__img" layout>
                <img src={data.image} alt={data.firstname + ' ' + data.lastname + ' head shot'} />
            </motion.div>

            <motion.div className="bio__heading" layout>
                <h4 className="bio__name">
                    {data.firstname}{' '}
                    {isActive && data.nickname && <span className="bio__nickName">{'"' + data.nickname + '"'}</span>}{' '}
                    {data.lastname}
                </h4>
                {isActive && <div className="bio__title">{data.title}</div>}
            </motion.div>
            <motion.div layout style={{width: '100%'}}>
                <div className="bio__social">
                    <ul className="bio__socialLinks">
                        <li className="bio__socialLink">
                            <a
                                className="twitter-follow-button"
                                target="_blank"
                                rel="noopener noreferrer"
                                href={data.twitter}
                                data-show-count="false"
                            >
                                {data.twitter}
                            </a>
                        </li>
                        {isActive && (
                            <li className="bio__socialLink">
                                <IconLink
                                    href={data.linkedIn}
                                    icon={<LinkedInIcon />}
                                    iconPosition="before"
                                    label="Connect"
                                    size="small"
                                />
                            </li>
                        )}
                    </ul>
                </div>
            </motion.div>
            {isActive && (
                <motion.div className="bio__bd" key={`bio_bd_${data.firstname}`} layout>
                    <div className="userContent userContent_reversedSoft">
                        <p dangerouslySetInnerHTML={{__html: data.description}} />
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
};

Bio.propTypes = {
    data: PropTypes.object,
    isActive: PropTypes.bool,
    onClick: PropTypes.func,
    index: PropTypes.number,
    slug: PropTypes.bool
};

export default Bio;
