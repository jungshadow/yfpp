import React from 'react';
import PropTypes from 'prop-types';
import KitchenSink from 'components/KitchenSink/KitchenSink';
import './fallbackMessage.scss';

const FallbackMessage = ({ message }) => {
    return (
        <div className="fallbackMessage">
            <KitchenSink>{message}</KitchenSink>
        </div>
    );
};

FallbackMessage.propTypes = {
    message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

export default FallbackMessage;
