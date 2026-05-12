import React from 'react';

function camelCase(str: string) {
    return str
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase())
        .replace(/^[A-Z]/, c => c.toLowerCase());
}

// helper function to dynamically build classnames
function getClassNames(selected: number, currentIndex: number) {
    return selected === currentIndex
        ? 'tabsNavLink tabsNavLink--isActive'
        : 'tabsNavLink';
}

interface TabsNavItemProps {
    label: string;
    icon?: React.ReactNode;
    selected: number;
    index: number;
    onClick: (index: number) => (event: React.MouseEvent) => void;
}

const TabsNavItem = (props: TabsNavItemProps) => {
    const { label, icon, selected, index, onClick } = props;
    const elemID = camelCase(label);
    const isSelected = selected === index;

    return (
        <a
            className={getClassNames(selected, index)}
            href={`#${elemID}`}
            onClick={onClick(index)}
            role={'tab'}
            aria-controls={elemID}
            aria-selected={isSelected}
            aria-expanded={isSelected}
            tabIndex={isSelected ? 0 : -1}
        >
            {label}
            {icon ? <span className="tabsNavLink__icon">{icon}</span> : null}
        </a>
    );
};

export default TabsNavItem;
