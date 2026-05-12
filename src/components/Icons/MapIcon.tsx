import React from 'react';
import './icons.scss';

const TwitterIcon = () => {
    return (
        <div className="icon twitterIcon">
            <div className="inner">
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2">
                    <path
                        d="M21.17 10.83A5.18 5.18 0 0016 5.662a5.18 5.18 0 00-5.169 5.17A5.18 5.18 0 0016.001 16a5.18 5.18 0 005.169-5.17zm5.17 0c0 1.232-.142 2.504-.668 3.615l-7.35 15.63c-.424.889-1.353 1.433-2.323 1.433-.969 0-1.898-.546-2.301-1.433l-7.37-15.63c-.525-1.11-.667-2.383-.667-3.614A10.332 10.332 0 0115.999.492a10.332 10.332 0 0110.339 10.339h.001z"
                        fillRule="nonzero"
                    />
                </svg>
            </div>
        </div>
    );
};

export default TwitterIcon;
