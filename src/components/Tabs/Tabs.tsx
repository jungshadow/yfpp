import React, { Component } from 'react';
import { noop } from './helpers';

import TabsHorz from './TabsHorz';

import './tabs.scss';

interface TabsProps {
    children: React.ReactNode;
    defaultSelected?: number;
    onTabChange?: (selected: number) => void;
    showIconsHorz?: boolean;
}

interface TabsState {
    selected: number;
}

class Tabs extends Component<TabsProps, TabsState> {
    static defaultProps = {
        defaultSelected: 0,
        onTabChange: noop,
    };

    constructor(props: TabsProps) {
        super(props);

        this.state = {
            selected: this.props.defaultSelected ?? 0,
        };
    }

    componentDidUpdate(prevProps: TabsProps, prevState: TabsState) {
        if (prevState.selected !== this.state.selected) {
            this.props.onTabChange?.(this.state.selected);
        }
    }

    handleNavClick = (index: number) => {
        return (event: React.MouseEvent) => {
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

export default Tabs;
