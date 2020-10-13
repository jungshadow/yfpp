import React from 'react';
import './icons.scss';

const PointingIconRight = ({style}) => {
    return (
        <div className="icon pointingIconRight">
            <div className="inner">
                <svg
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    strokeLinejoin="round"
                    strokeMiterlimit="2"
                >
                    <path d="M17.071 29.326c-1.964 0-3.839-.572-5.66-1.232-1.09-.393-2.857-1.054-3.982-1.054H2.286A2.279 2.279 0 010 24.754V13.326a2.279 2.279 0 012.286-2.286h5.143c.857 0 2.071-1.536 2.589-2.125.643-.732 1.25-1.464 1.786-2.304 1.035-1.66 1.803-4.714 4.196-4.714 2.839 0 5.143 1.572 5.143 4.572 0 .75-.107 1.589-.393 2.285h6.679c2.464 0 4.571 2.09 4.571 4.554 0 2.5-2.071 4.589-4.571 4.589h-3.018a5.913 5.913 0 01-.661 2.125c.036.25.054.518.054.768 0 1.143-.375 2.286-1.09 3.179l.018.089c.018 3.411-2.375 5.268-5.661 5.268zm.072-2.286c1.982 0 3.286-.875 3.286-2.982 0-.339-.018-.679-.072-1 .75-.411 1.161-1.429 1.161-2.25a2.48 2.48 0 00-.322-1.232c.608-.572.947-1.286.947-2.125 0-.59-.268-1.375-.625-1.84h5.911c1.232 0 2.285-1.053 2.285-2.285 0-1.215-1.089-2.286-2.285-2.286H17.143c0-1.125 1.714-2.286 1.714-4.571 0-1.715-1.339-2.286-2.857-2.286-.482 0-1.375 2.018-1.589 2.428-.215.411-.429.822-.679 1.215-.589.946-1.268 1.768-2 2.589-1.143 1.304-2.411 2.911-4.303 2.911h-.572v11.428h.572c3.125 0 6.16 2.286 9.714 2.286zM3.429 24.754a1.15 1.15 0 001.142-1.143 1.15 1.15 0 00-1.142-1.142 1.15 1.15 0 00-1.143 1.142c0 .625.518 1.143 1.143 1.143z" />
                </svg>
            </div>
        </div>
    );
};

export default PointingIconRight;
