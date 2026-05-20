import React, { Component } from 'react';

import TabsNavItem from './TabsNavItem';

interface TabsNavProps {
    onClick: (index: number) => (event: React.MouseEvent) => void;
    selected: number;
    tabs: React.ReactElement<{ label: string; icon?: React.ReactNode }>[];
    showIconsHorz?: boolean;
}

class TabsNav extends Component<TabsNavProps> {
    buildNav() {
        const navItems = this.props.tabs.map((tab, index) => {
            const label = tab.props.label;

            return (
                <li key={'tabNav_' + index}>
                    <TabsNavItem
                        icon={this.props.showIconsHorz ? tab.props.icon : null}
                        index={index}
                        label={label}
                        onClick={this.props.onClick}
                        selected={this.props.selected}
                    />
                </li>
            );
        });

        return navItems;
    }

    render() {
        return (
            <ol className="tabs__nav" role="tablist">
                {this.buildNav()}
            </ol>
        );
    }
}

export default TabsNav;
