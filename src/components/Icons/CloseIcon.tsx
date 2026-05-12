import React from 'react';
import './icons.scss';

const CloseIcon = () => {
    return (
        <div className="icon closeIcon">
            <div className="inner">
                <svg viewBox="0 0 29 29" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2">
                    <path d="M14.5 11.151l9.898-9.899a.712.712 0 011.005 0l2.345 2.345a.712.712 0 010 1.005L17.849 14.5l9.899 9.898a.712.712 0 010 1.005l-2.345 2.345a.712.712 0 01-1.005 0L14.5 17.849l-9.898 9.899a.712.712 0 01-1.005 0l-2.345-2.345a.712.712 0 010-1.005l9.899-9.898-9.899-9.898a.712.712 0 010-1.005l2.345-2.345a.712.712 0 011.005 0l9.898 9.899z" />
                </svg>
            </div>
        </div>
    );
};

export default CloseIcon;
