import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import classnames from 'classnames';

import './bio.scss';

const Bio = ({ data, isActive, onClick, index, slug }) => {
    const openSpring = { type: 'spring', stiffness: 200, damping: 30 };
    const closeSpring = { type: 'spring', stiffness: 300, damping: 35 };

    const getBioClassName = () => {
        return classnames({ bio: true, 'bio--isActive': isActive, 'bio--isSlug': slug });
    };
    return (
        <motion.div className={getBioClassName()} onClick={() => onClick(index)} key={data.firstname} layoutTransition={isActive ? openSpring : closeSpring} layout>
            <div className="bio__img">
                <img src={data.image} alt={data.firstname + ' ' + data.lastname + ' head shot'} />
            </div>

            <div className="bio__heading">
                <h4 className="bio__name">
                    {data.firstname} {isActive && data.nickname && <span className="bio__nickName">{'"' + data.nickname + '"'}</span>} {data.lastname}
                </h4>
                {isActive && <div className="bio__title">{data.title}</div>}
            </div>

            <div className="bio__social">
                <ul className="bio__socialLinks">
                    <li>
                        <a className="bio__socialLink" target="_blank" rel="noopener noreferrer" href={data.twitter} data-show-count="false">
                            {data.twitter}
                        </a>
                    </li>
                    {isActive && (
                        <li>
                            <a href={data.linkedIn} className="bio__socialLink">
                                <span className="iconLink-txt">connect</span>
                            </a>
                        </li>
                    )}
                </ul>
            </div>
            {isActive && (
                <motion.div className="bio__bd">
                    <div className="userContent userContent_reversedSoft">
                        <p dangerouslySetInnerHTML={{ __html: data.description }} />
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
};

Bio.propTypes = {};

export default Bio;
