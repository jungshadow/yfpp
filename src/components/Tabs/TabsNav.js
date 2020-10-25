import React, {Component} from 'react';
import PropTypes from 'prop-types';

import TabsNavItem from './TabsNavItem';

/**
 * Tabs sub-component responsible for rendering horizontal tab navigation
 * @param {Object} props
 * @returns {JSX}
 */
class TabsNav extends Component {

    buildNav() {
        const navItems = this
            .props
            .tabs
            .map((tab, index) => {
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

TabsNav.propTypes = {
    onClick: PropTypes.func.isRequired,
    selected: PropTypes.number.isRequired,
    tabs: PropTypes.arrayOf(PropTypes.object),
    showIconsHorz: PropTypes.bool,
};

TabsNav.defaultProps = {
    showIconsHorz: false,
};
export default TabsNav;
