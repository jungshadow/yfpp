import React from 'react';

SocialLinks.propTypes = {};

function SocialLinks() {
    return (
        <div className="wrapper">
            <ul className="hList">
                <li>
                    <a href="https://twitter.com/fnpollingplace" target="_blank" rel="noopener noreferrer" className="actionLink actionLink_twitter mix-actionLink_lrg mix-actionLink_twitter">
                        <span className="isVisuallyHidden">Twitter</span>
                    </a>
                </li>
                <li>
                    <a
                        href="https://www.facebook.com/Your-Fucking-Polling-Place-120373578023062"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="actionLink actionLink_facebook mix-actionLink_lrg mix-actionLink_facebook"
                    >
                        <span className="isVisuallyHidden">Facebook</span>
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default SocialLinks;
