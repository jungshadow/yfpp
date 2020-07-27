// Import dependencies
import React from 'react';

import CSSTransitionGroup from 'react-addons-css-transition-group';

/**
 * Tabs Component
 *
 * @class Tabs
 * @extends React.Component
 */
class Tabs extends React.Component {
    /**
     * Sets initial state
     * @constructor
     */
    constructor() {
        super();

        this.state = {
            activeTab: 0,
        };
    }

    onClick(index) {
        this.setState({
            activeTab: index,
        });
    }

    renderTabsNav = () => {
        function labels(child, index) {
            let activeClass = this.state.activeTab === index ? 'isActive' : '';

            return (
                <li className="tabs-nav-item" key={index}>
                    <button className={'tabs-nav-item-btn ' + activeClass} onClick={this.onClick.bind(this, index)}>
                        {child.props.label}
                    </button>
                </li>
            );
        }
        const filteredChildren = this.props.children.filter((child) => child);

        return <ul className="tabs-nav">{filteredChildren.map(labels.bind(this))}</ul>;
    };

    renderTabPanel = () => {
        return (
            <div className="tabs-panel" key={this.state.activeTab}>
                {this.props.children[this.state.activeTab]}
            </div>
        );
    };
    /**
     * Renders Tab component
     *
     * @method render
     * @return {object} site title component markup
     */
    render() {
        return (
            <CSSTransitionGroup component="div" className="tabs" transitionName="fade" transitionAppear={true} transitionAppearTimeout={500} transitionLeaveTimeout={200} transitionEnterTimeout={500}>
                {this.props.children && this.renderTabsNav()}
                {this.props.children && this.renderTabPanel()}
            </CSSTransitionGroup>
        );
    }
}

export default Tabs;
