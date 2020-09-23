// Import dependencies
import React from 'react';

/**
 * PartySelectOptions Component
 *
 * @class PartySelectOptions
 * @extends React.Component
 */
function PartySelectOptions({ value, label }) {
    return <option value={value}>{label}</option>;
}

export default PartySelectOptions;
