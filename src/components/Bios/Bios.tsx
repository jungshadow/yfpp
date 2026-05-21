import React, { useState } from 'react';
import Bio from 'components/Bios/Bio';
import type { BioData } from 'components/Bios/Bio';

import biosData from './bios.json';
import './bios.scss';

const bios = biosData as { bios: BioData[] };

const noop = () => {};

const Bios = () => {
    const [isActive, setIsActive] = useState<string | null>(null);

    const activeBios = bios.bios.filter(bio => !bio.isLegacy);
    const legacyBios = bios.bios.filter(bio => bio.isLegacy);

    const handleOnClick = (index: number) => {
        const activeIndex = `active-${index}`;
        if (activeIndex === isActive) {
            setIsActive(null);
        } else {
            setIsActive(activeIndex);
        }
    };

    return (
        <>
            <ul className="bios bios--activeMembers">
                {activeBios.map((bio, index) => (
                    <li className="bios__item" key={bio.firstname.toLowerCase()}>
                        <Bio
                            data={bio}
                            index={index}
                            onClick={() => handleOnClick(index)}
                            isActive={isActive === `active-${index}`}
                        />
                        {isActive === `active-${index}` && (
                            <Bio
                                slug
                                data={bio}
                                onClick={() => handleOnClick(index)}
                                index={index}
                            />
                        )}
                    </li>
                ))}
            </ul>
            <ul className="bios bios--legacyMembers">
                {legacyBios.map((bio, index) => (
                    <li className="bios__item" key={bio.firstname.toLowerCase()}>
                        <Bio data={bio} index={index} onClick={noop} />
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Bios;
