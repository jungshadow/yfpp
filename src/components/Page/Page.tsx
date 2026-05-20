import React, { useContext } from 'react';
import classnames from 'classnames';

import Logo from 'components/Logo/Logo';
import { Link, useNavigate } from 'react-router-dom';
import IconLink from 'components/IconLink/IconLink';
import { PointingIcon } from 'components/Icons';
import { AppContext } from 'appReducer';
import { getLastResultsPath } from 'helpers/getResultsRoute';

import './page.scss';
import KitchenSink from 'components/KitchenSink/KitchenSink';

interface PageProps {
    title: string;
    children: React.ReactNode;
    isNarrow?: boolean;
}

const Page = ({ title, children, isNarrow }: PageProps) => {
    const navigate = useNavigate();
    const state = useContext(AppContext);
    const backPath = state.isActive ? getLastResultsPath(state) : '/';

    const handleBack = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        navigate(backPath);
    };

    const getPageClassname = () => classnames({ page: true, 'page--isNarrow': isNarrow });

    return (
        <div className={getPageClassname()}>
            <div className="page__hd">
                <div className="page__hdLeft">
                    <IconLink
                        to={backPath}
                        label="Back"
                        icon={<PointingIcon />}
                        iconPosition="before"
                        onClick={handleBack}
                    />
                </div>
                <div className="page__hdCtr">
                    <Link to={backPath} onClick={handleBack}>
                        <Logo isCompact />
                    </Link>
                </div>
                <div className="page__hdRight"></div>
            </div>
            <div className="page__bd">
                <h1 className="page__title">{title}</h1>
                <div className="page__description">
                    <KitchenSink isReversed>This shit was made by these motherfuckers.</KitchenSink>
                </div>
                <div className="page__content">{children}</div>
            </div>
        </div>
    );
};

export default Page;
