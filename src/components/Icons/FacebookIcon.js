import React from 'react';
import './icons.scss';

const TwitterIcon = () => {
    return (
        <div className="icon twitterIcon">
            <div className="inner">
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2">
                    <path
                        d="M25.73.434a5.84 5.84 0 015.837 5.837V25.73a5.84 5.84 0 01-5.838 5.837h-3.81v-12.06h4.032l.609-4.702h-4.642v-2.999c0-1.358.365-2.27 2.331-2.27l2.473-.02V5.318c-.426-.06-1.906-.183-3.608-.183-3.588 0-6.06 2.189-6.06 6.202v3.466H13v4.702h4.054v12.06H6.271a5.84 5.84 0 01-5.838-5.837V6.27A5.84 5.84 0 016.271.434h19.458z"
                        fillRule="nonzero"
                    />
                </svg>
            </div>
        </div>
    );
};

export default TwitterIcon;
