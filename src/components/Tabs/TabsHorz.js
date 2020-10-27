import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import TabsNav from './TabsNav';

const TabsHorz = ({ onClick, selected, tabs, showIconsHorz }) => {
    // stripping out anything falsey from this array
    const filteredTabs = tabs.filter(tab => tab);

    return (
        <Fragment>
            {filteredTabs && filteredTabs.length > 1 && (
                <TabsNav
                    onClick={onClick}
                    selected={selected}
                    tabs={filteredTabs}
                    showIconsHorz={showIconsHorz}
                />
            )}
            <div className="tabs__panels">{filteredTabs[selected]}</div>
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
