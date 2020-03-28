import React from 'react';
import PropTypes from 'prop-types';
import helpers from '../../helpers';

import avatar from '../../images/avatar.jpg';
import './Representative.scss';

const Representative = props => {
    const { name, party, office, urls, photoUrl, channels } = props.details;

    const repClass = `rep rep_${helpers.slugify(party)}`;

    function getImgUrl(photoUrl) {
        return photoUrl ? photoUrl : avatar;
    }
    return (
        <li>
            <div className={repClass}>
                <div className="rep-img">
                    <img src={getImgUrl(photoUrl)} alt="" />
                </div>
                <div className="rep-details">
                    <div className="rep-details-name">
                        <h3 className="hdg hdg_3">{name}</h3>
                    </div>
                    <div className="rep-details-party">{party}</div>
                    <div className="rep-details-office">{office}</div>
                </div>
            </div>
        </li>
    );
};

Representative.propTypes = {};

export default Representative;
