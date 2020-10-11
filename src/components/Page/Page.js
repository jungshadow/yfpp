import React from 'react';

import Bios from 'components/Bios/Bios';

import './page.scss';
import Logo from 'components/Logo/Logo';
import {Link} from 'react-router-dom';
import IconLink from 'components/IconLink/IconLink';
import {PointingIcon} from 'components/Icons';

const Page = ({title, children}) => {
    return (
        <div className="page">
            <div className="page__hd">
                <div className="page__hdLeft">
                    <IconLink
                        to="/"
                        label="Back"
                        icon={<PointingIcon />}
                        iconPosition="left"
                    />
                </div>
                <div className="page__hdCtr">
                    <Link to="/">
                        <Logo isCompact />
                    </Link>
                </div>
                <div className="page__hdRight"></div>
            </div>
            <h1 className="page__title">{title}</h1>
            <div className="page__description">
                <div className="userContent userContent_reversedSoft">
                    This shit was made by these motherfuckers.
                </div>
            </div>
            <div className="page__content">{children}</div>
        </div>
    );
};

export default Page;
