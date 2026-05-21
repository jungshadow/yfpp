import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import classnames from 'classnames';

import './bio.scss';
import { CloseIcon, LinkedInIcon } from 'components/Icons';
import useOutsideClick from 'hooks/useOutsideClick';
import IconLink from 'components/IconLink/IconLink';
import KitchenSink from 'components/KitchenSink/KitchenSink';

export interface BioData {
    firstname: string;
    lastname: string;
    nickname?: string;
    title?: string;
    image: string;
    twitter: string;
    linkedIn: string;
    description: string;
    isLegacy?: boolean;
    legacyText?: string;
}

interface BioProps {
    data: BioData;
    isActive?: boolean;
    onClick: (index: number) => void;
    index: number;
    slug?: boolean;
}

const Bio = ({ data, isActive, onClick, index, slug }: BioProps) => {
    const bioRef = useRef<HTMLDivElement>(null);
    useOutsideClick(bioRef, handleClickBio);

    function handleClickBio(ref: React.RefObject<HTMLElement | null>) {
        if (ref.current?.classList.contains('bio--isActive')) {
            onClick(index);
        }
    }

    function getBioClassName() {
        return classnames({
            bio: true,
            'bio--isActive': isActive,
            'bio--isSlug': slug,
        });
    }

    return (
        <motion.div
            className={getBioClassName()}
            ref={bioRef}
            onClick={() => onClick(index)}
            key={data.firstname}
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
                <div className="inner">
                    <img
                        src={data.image}
                        alt={data.firstname + ' ' + data.lastname + ' head shot'}
                    />
                </div>
            </motion.div>

            <motion.div className="bio__heading" layout>
                <h4 className="bio__name">
                    {data.firstname}{' '}
                    {isActive && data.nickname && (
                        <span className="bio__nickName">{'"' + data.nickname + '"'}</span>
                    )}{' '}
                    {data.lastname}
                </h4>
                {isActive && <div className="bio__title">{data.title}</div>}
            </motion.div>
            {data.isLegacy && !isActive && (
                <motion.div className="bio__legacyText">
                    <KitchenSink isReversed>
                        <p>{data.legacyText}</p>
                    </KitchenSink>
                </motion.div>
            )}
            <motion.div layout style={{ width: '100%' }}>
                <div className="bio__social">
                    {!data.isLegacy && (
                        <ul className="bio__socialLinks">
                            <li className="bio__socialLink">
                                <IconLink
                                    href={data.linkedIn}
                                    icon={<LinkedInIcon />}
                                    iconPosition="before"
                                    label="Connect"
                                    size="small"
                                />
                            </li>
                        </ul>
                    )}
                </div>
            </motion.div>
            {isActive && (
                <motion.div className="bio__bd" key={`bio_bd_${data.firstname}`} layout>
                    <KitchenSink isReversed>
                        <p dangerouslySetInnerHTML={{ __html: data.description }} />
                    </KitchenSink>
                </motion.div>
            )}
        </motion.div>
    );
};

export default Bio;
