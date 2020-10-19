import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './kitchenSink.scss';

const KitchenSink = ({children, isReversed, isCentered}) => {
    const getKitchenSinkClassnames = () => {
        return classnames({
            kitchenSink: true,
            'kitchenSink--reversed': isReversed,
            'kitchenSink--centered': isCentered
        });
    };
    return <div className={getKitchenSinkClassnames()}>{children}</div>;
};

KitchenSink.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
};

export default KitchenSink;
