// Import dependencies 
import React from 'react';
import ReactDOM from 'react-dom';




/**
 * PartySelectOptions Component
 *
 * @class PartySelectOptions
 * @extends React.Component
 */
 class PartySelectOptions extends React.Component {



    /**
     * Renders option values for primary party select menu
     *
     * @method render
     * @return {object} PartySelectOptions component markup
     */
     render() {

        const partyName = this.props.primaryPartyName;
        const partyAbbr = this.props.primaryPartyAbbr;

        return (
            <option value={partyAbbr}>{partyName}</option>
            )
     }

    };

    export default PartySelectOptions;