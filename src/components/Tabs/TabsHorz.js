import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import TabsNav from './TabsNav';

const TabsHorz = ({ onClick, selected, tabs, showIconsHorz }) => {
    return (
        <Fragment>
            <TabsNav
                onClick={onClick}
                selected={selected}
                tabs={tabs}
                showIconsHorz={showIconsHorz}
            />
            <div className="tabs__panels">{tabs[selected]}</div>
        </Fragment>
    );
};

TabsHorz.propTypes = {
    onClick: PropTypes.func.isRequired,
    selected: PropTypes.number.isRequired,
    tabs: PropTypes.node.isRequired,
    showIconsHorz: PropTypes.bool,
};

TabsHorz.defaultProps = {
    showIconsHorz: false,
};

export default TabsHorz;
