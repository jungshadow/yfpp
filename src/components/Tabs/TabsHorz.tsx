import React, { Fragment } from 'react';

import TabsNav from './TabsNav';

interface TabsHorzProps {
    onClick: (index: number) => (event: React.MouseEvent) => void;
    selected: number;
    tabs: React.ReactNode;
    showIconsHorz?: boolean;
}

const TabsHorz = ({ onClick, selected, tabs, showIconsHorz = false }: TabsHorzProps) => {
    const filteredTabs = (React.Children.toArray(tabs) as React.ReactElement[]).filter(tab => tab);

    return (
        <Fragment>
            {filteredTabs && filteredTabs.length > 1 && (
                <TabsNav
                    onClick={onClick}
                    selected={selected}
                    tabs={filteredTabs as React.ReactElement<{ label: string; icon?: React.ReactNode }>[]}
                    showIconsHorz={showIconsHorz}
                />
            )}
            <div className="tabs__panels">{filteredTabs[selected]}</div>
        </Fragment>
    );
};

export default TabsHorz;
