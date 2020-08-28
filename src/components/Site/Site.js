import React from 'react';
import Search from 'components/Search/Search';
import './site.scss';

const Site = () => {
    return (
        <div className="site">
            <div className="site-hd"></div>
            <div className="site-bd">
                <Search />
            </div>
            <div className="site-ft"></div>
        </div>
    );
};

export default Site;
