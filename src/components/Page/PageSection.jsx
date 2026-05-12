import React from 'react';
import PropTypes from 'prop-types';

const PageSection = ({children}) => {
    return <section className="page__section">{children}</section>;
};

PageSection.propTypes = {children: PropTypes.node};

export default PageSection;
