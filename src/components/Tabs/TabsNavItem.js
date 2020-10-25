import React from 'react';
import PropTypes from 'prop-types';
import CamelCase from 'lodash/camelCase';

// helper function to dynamically build classnames
function getClassNames(selected, currentIndex) {
    return selected === currentIndex
        ? 'tabsNavLink tabsNavLink--isActive'
        : 'tabsNavLink';
}

const TabsNavItem = props => {
    const { label, icon, selected, index, onClick } = props;
    const elemID = CamelCase(label);
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

TabsNavItem.propTypes = {
    index: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    selected: PropTypes.number.isRequired,
};

export default TabsNavItem;
