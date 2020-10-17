import React from 'react';
import PropTypes from 'prop-types';
import './resultMessage.scss';
import KitchenSink from 'components/KitchenSink/KitchenSink';

const ResultMessage = ({children}) => {
    return (
        <div className="resultMessage">
            <KitchenSink>{children}</KitchenSink>
        </div>
    );
};

ResultMessage.propTypes = {children: PropTypes.oneOfType([PropTypes.node, PropTypes.string])};

export default ResultMessage;
