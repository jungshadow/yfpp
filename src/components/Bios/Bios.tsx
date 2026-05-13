import React, { useState, useEffect } from 'react';
import Bio from 'components/Bios/Bio';

import biosData from './bios.json';
import './bios.scss';

const bios = biosData as { bios: Array<{ firstname: string; lastname: string; nickname?: string; title?: string; image: string; twitter: string; linkedIn: string; description: string }> };

const Bios = () => {
    const [isActive, setIsActive] = useState<number | null>(null);

    // on mount reload the twitter widget
    useEffect(() => {
        if (!(window as unknown as { twttr?: { widgets: { load: () => void } } }).twttr) {
            return;
        }
        (window as unknown as { twttr: { widgets: { load: () => void } } }).twttr.widgets.load();
    }, []);

    const handleOnClick = (index: number) => {
        if (index === isActive) {
            setIsActive(null);
        } else {
            setIsActive(index);
        }
    };
    return (
        <ul className="bios">
            {bios.bios.map((bio, index) => (
                <li className="bios__item" key={bio.firstname.toLowerCase()}>
                    <Bio
                        data={bio}
                        index={index}
                        onClick={handleOnClick}
                        isActive={isActive === index}
                    />
                    {index === isActive && (
                        <Bio
                            slug
                            data={bio}
                            onClick={handleOnClick}
                            index={index}
                        />
                    )}
                </li>
            ))}
        </ul>
    );
};

export default Bios;
