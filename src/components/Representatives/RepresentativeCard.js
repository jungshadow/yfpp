import React from 'react';
import helpers from 'helpers';

import avatar from 'images/avatar.jpg';
import './representativeCard.scss';

const Representative = ({ data }) => {
    const { name, party, office, urls, photoUrl, channels } = data;

    const repClass = `representativeCard representativeCard--${helpers.slugify(party)}`;

    function getImgUrl(photoUrl) {
        return photoUrl ? photoUrl : avatar;
    }
    return (
        <li>
            <div className={repClass}>
                <div className="representativeCard__img" style={{ backgroundImage: `url(${getImgUrl(photoUrl)})` }}></div>
                <div className="representativeCard__details">
                    <div className="representativeCard__detailsParty">{party}</div>
                    <h3 className="representativeCard__detailsName">{name}</h3>
                    <div className="representativeCard__detailsOffice">{office}</div>
                </div>
            </div>
        </li>
    );
};

Representative.propTypes = {};

export default Representative;
