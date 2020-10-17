import React from 'react';
import PropTypes from 'prop-types';

import './kitchenSink.scss';

const KitchenSink = ({children}) => {
    return <div className="kitchenSink">{children}</div>;
};

KitchenSink.propTypes = {children: PropTypes.oneOfType([PropTypes.node, PropTypes.string])};

export default KitchenSink;
