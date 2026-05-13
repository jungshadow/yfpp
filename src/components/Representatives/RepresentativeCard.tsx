import helpers from 'helpers';

import avatar from 'images/avatar.jpg';
import './representativeCard.scss';
import {DemocratIcon, RepublicanIcon} from 'components/Icons';

interface RepresentativeProps {
    data?: {
        name: string;
        party?: string;
        office?: string;
        urls?: string[];
        photoUrl?: string;
        channels?: Array<{ type: string; id: string }>;
    };
}

const Representative = ({data}: RepresentativeProps) => {
    const {name, party, office, urls: _urls, photoUrl, channels: _channels} = data || {} as NonNullable<RepresentativeProps['data']>;
    const imgHttpsRegex = /^https:/i;
    const congressImgRegex = /^http:\/\/bioguide\.congress\.gov\/bioguide\//i;

    const getRepClass = (party?: string) => {
        let partySlug = party;

        if (party && party.toLowerCase().includes('republican')) {
            partySlug = 'republican';
        }
        if (party && party.toLowerCase().includes('democrat')) {
            partySlug = 'democrat';
        }
        return `representativeCard representativeCard--${helpers.slugify(partySlug || '')}`;
    };

    function getImgUrl(photoUrl?: string) {
        if (photoUrl) {
            if(imgHttpsRegex.test(photoUrl)){
                return photoUrl;
            } else {
                if(congressImgRegex.test(photoUrl)) {
                    return photoUrl.replace(congressImgRegex,
                        'https://bioguideretro.congress.gov/Static_Files/data/');
                } else {
                    return photoUrl;
                }
            }
        } else {
            return avatar;
        }
    }

    function renderPartyIcon(party?: string) {
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
            <div className="representativeCard__img" style={{backgroundImage: `url(${getImgUrl(photoUrl)})`}}></div>
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

Representative.propTypes = {} as Record<string, never>;

export default Representative;
