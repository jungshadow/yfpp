import React from 'react';
import {Link} from 'react-router-dom';

import './siteInfo.scss';

const SiteInfo = () => {
    return (
        <div className="siteInfo">
            <div className="siteInfo__fbShit">
                <div
                    className="fb-like"
                    data-href="http://yourfuckingpollingplace.com/"
                    data-send="false"
                    data-layout="box_count"
                    data-width="50"
                    data-show-faces="true"
                    data-colorscheme="light"
                >
                    {' '}
                </div>
            </div>
            <div className="siteInfo__bd">
                <div className="userContent userContent_reversedSofter mix-userContent_md mix-userContent_ctr">
                    <p>
                        Hey fuckface, read the fucking
                        <Link to="/privacy-policy"> privacy policy</Link>.
                    </p>
                    <p>
                        Data via the{' '}
                        <a
                            href="https://developers.google.com/civic-information/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Google Civic Information API
                        </a>
                        . Use of this site also binds you to the{' '}
                        <a
                            href="https://www.google.com/intl/en/policies/terms/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Google Terms of Use
                        </a>
                        .
                    </p>
                    <p>
                        Data from states that do not provide direct feeds only include addresses with registered voters
                    </p>
                    <p>
                        Election officials sometimes revise data in the last few days before an election. Check back on
                        Election Day for the latest information.
                    </p>
                </div>
            </div>
        </div>
    );
};

SiteInfo.propTypes = {};

export default SiteInfo;
