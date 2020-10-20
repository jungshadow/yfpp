import React from 'react';
import PropTypes from 'prop-types';

const FallbackMessage = ({message}) => {
    return <div className="fallbackMessage">{message}</div>;
};

FallbackMessage.propTypes = {message: PropTypes.string};

export default FallbackMessage;
