import React, { Component } from 'react';

import TabIcon from './TabIcon';

function camelCase(str: string) {
    return str
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase())
        .replace(/^[A-Z]/, c => c.toLowerCase());
}

interface TabPanelProps {
    children: React.ReactNode;
    icon?: React.ReactNode;
    label: string;
    selected?: number;
    index?: number;
}

class TabPanel extends Component<TabPanelProps> {
    static defaultProps = {
        icon: <TabIcon />,
    };

    constructor(props: TabPanelProps) {
        super(props);
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

export default TabPanel;
