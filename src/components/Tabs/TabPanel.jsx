import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TabIcon from './TabIcon';

function camelCase(str) {
    return str
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase())
        .replace(/^[A-Z]/, c => c.toLowerCase());
}

class TabPanel extends Component {
    constructor(props) {
        super();
        this.props = props;
    }

    render() {
        const isSelected = this.props.selected === this.props.index;
        const panelClassName = isSelected
            ? 'tabs__panel tabs__panel--isActive'
            : 'tabs__panel';

        const panelID = camelCase(this.props.label);

        return (
            <div
                className={panelClassName}
                id={panelID}
                role="tabpanel"
                tabIndex={isSelected ? 0 : -1}
                aria-hidden={!isSelected}
            >
                <div className="tabs__panelContent">{this.props.children}</div>
            </div>
        );
    }
}

TabPanel.propTypes = {
    children: PropTypes.node.isRequired,
    icon: PropTypes.object,
    label: PropTypes.string.isRequired,
};

TabPanel.defaultProps = {
    icon: <TabIcon />,
};

export default TabPanel;
