import React from 'react';
import {TwitterIcon, FacebookIcon} from 'components/Icons';

import './socialLinks.scss';

SocialLinks.propTypes = {};

function SocialLinks() {
    return (
        <ul className="socialLinks">
            <li>
                <a
                    href="https://twitter.com/fnpollingplace"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="socialLinks__link socialLinks__link--twitter"
                >
                    <TwitterIcon />
                    <span className="isVisuallyHidden">Twitter</span>
                </a>
            </li>
            <li>
                <a
                    href="https://www.facebook.com/Your-Fucking-Polling-Place-120373578023062"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="socialLinks__link socialLinks__link--facebook"
                >
                    <FacebookIcon />
                    <span className="isVisuallyHidden">Facebook</span>
                </a>
            </li>
        </ul>
    );
}

export default SocialLinks;
