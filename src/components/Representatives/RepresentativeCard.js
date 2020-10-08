import React from 'react';
import helpers from 'helpers';

import avatar from 'images/avatar.jpg';
import './representativeCard.scss';
import { DemocratIcon, RepublicanIcon } from 'components/Icons';

const Representative = ({ data }) => {
    const { name, party, office, urls, photoUrl, channels } = data;

    const getRepClass = (party) => {
        let partySlug = party;

        if (party && party.toLowerCase().includes('republican')) {
            partySlug = 'republican';
        }
        if (party && party.toLowerCase().includes('democrat')) {
            partySlug = 'democrat';
        }
        return `representativeCard representativeCard--${helpers.slugify(partySlug)}`;
    };

    function getImgUrl(photoUrl) {
        return photoUrl ? photoUrl : avatar;
    }

    function renderPartyIcon(party) {
        if (party && party.toLowerCase().includes('republican')) {
            return (
                <span className="representativeCard__partyIcon">
                    <RepublicanIcon />
                </span>
            );
        }

        if (party && party.toLowerCase().includes('democrat')) {
            return (
                <span className="representativeCard__partyIcon">
                    <DemocratIcon />
                </span>
            );
        }
    }
    return (
        <div className={getRepClass(party)}>
            <div className="representativeCard__img" style={{ backgroundImage: `url(${getImgUrl(photoUrl)})` }}></div>
            <div className="representativeCard__details">
                <div className="representativeCard__detailsParty">
                    {renderPartyIcon(party)}
                    {party}
                </div>
                <h3 className="representativeCard__detailsName">{name}</h3>
                <div className="representativeCard__detailsOffice">{office}</div>
            </div>
        </div>
    );
};

Representative.propTypes = {};

export default Representative;
