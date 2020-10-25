import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { noop } from './helpers';

import TabsHorz from './TabsHorz';

import './tabs.scss';

/**
 * Tabbed UI component
 * Individual tabs are created by wrapping content in <TabPanel>
 * Tab navigation is dynamically generated based on a label prop passed into each <TabPanel>
 * The first tab is selected by default, but can be overriden by adding a selected prop
 * with the index of the desired tab
 * @class Tabs
 * @returns {JSX}
 */
class Tabs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: this.props.defaultSelected,
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.selected !== this.state.selected) {
            this.props.onTabChange(this.state.selected);
        }
    }

    handleNavClick = index => {
        return event => {
            event.preventDefault();

            this.setState(prevState => {
                return { selected: index };
            });
        };
    };

    render() {
        return (
            <div className="tabs">
                <TabsHorz
                    onClick={this.handleNavClick}
                    selected={this.state.selected}
                    tabs={this.props.children}
                    showIconsHorz={this.props.showIconsHorz}
                />
            </div>
        );
    }
}

Tabs.propTypes = {
    children: PropTypes.node.isRequired,
    defaultSelected: PropTypes.number,
    onTabChange: PropTypes.func,
};

Tabs.defaultProps = {
    defaultSelected: 0,
    onTabChange: noop,
};

export default Tabs;
