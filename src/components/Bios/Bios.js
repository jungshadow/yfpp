import React, { useState, useEffect } from 'react';
import Bio from 'components/Bios/Bio';

import bios from './bios.json';
import './bios.scss';

const Bios = () => {
    const [isActive, setIsActive] = useState(null);

    // split bios into 2 arrays, active and legacy based on isLegacy property
    const activeBios = bios.bios.filter(bio => !bio.isLegacy);
    const legacyBios = bios.bios.filter(bio => bio.isLegacy);

    // on mount reload the twitter widget
    useEffect(() => {
        if (!window.twtter) {
            return;
        }
        window.twttr.widgets.load();
    }, []);

    const handleOnClick = (index, type) => {
        if (type === 'legacy') {
            return;
        }
        const activeIndex = `${type}-${index}`;
        activeIndex === isActive ? setIsActive(null) : setIsActive(activeIndex);
    };

    return (
        <>
            <ul className="bios bios--activeMembers">
                {activeBios.map((bio, index) => (
                    <li
                        className="bios__item"
                        key={bio.firstname.toLowerCase()}
                    >
                        <Bio
                            data={bio}
                            index={`biosActive-${index}`}
                            onClick={() => handleOnClick(index, 'active')}
                            isActive={isActive === `active-${index}`}
                        />
                        {isActive === `active-${index}` && (
                            <Bio
                                slug
                                data={bio}
                                onClick={() => handleOnClick(index, 'active')}
                                index={`biosActive-${index}`}
                            />
                        )}
                    </li>
                ))}
            </ul>
            <ul className="bios bios--legacyMembers">
                {legacyBios.map((bio, index) => (
                    <li
                        className="bios__item"
                        key={bio.firstname.toLowerCase()}
                    >
                        <Bio
                            data={bio}
                            isLegacy
                            index={`biosLegacy-${index}`}
                            onClick={() => handleOnClick(index, 'legacy')}
                            isActive={isActive === `legacy-${index}`}
                        />
                        {isActive === `legacy-${index}` && (
                            <Bio
                                slug
                                data={bio}
                                onClick={() => handleOnClick(index, 'legacy')}
                                index={`biosLegacy-${index}`}
                            />
                        )}
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Bios;
