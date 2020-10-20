import React, {useState} from 'react';
import Bio from 'components/Bios/Bio';

import bios from './bios.json';
import './bios.scss';

const Bios = () => {
    const [isActive, setIsActive] = useState(null);
    const handleOnClick = (index) => {
        index === isActive ? setIsActive(null) : setIsActive(index);
    };
    return (
        <ul className="bios">
            {bios.bios.map((bio, index) => (
                <li className="bios__item" key={bio.firstname.toLowerCase()}>
                    <Bio data={bio} index={index} onClick={handleOnClick} isActive={isActive === index} />
                    {index === isActive && <Bio slug data={bio} onClick={handleOnClick} index={index} />}
                </li>
            ))}
        </ul>
    );
};

export default Bios;
