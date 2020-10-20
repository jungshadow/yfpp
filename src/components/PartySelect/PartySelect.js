// Import dependencies
import React from 'react';

import PartySelectOptions from './PartySelectOptions';
import './partySelect.scss';

/**
 * Party Select Component
 *
 * @class PartySelect
 * @extends React.Component
 */
class PartySelect extends React.Component {
    onSelectHandler = () => {
        this.props.handleOnSelect(this.refs.partySelect.value);
    };

    /**
     * Renders party select component
     *
     * @method render
     * @return {object} search component markup
     */
    render() {
        const partyList = this.props.primaryParties;

        if (!partyList.length) {
            return null;
        }
        const partyFullName = {
            REP: 'Republican',
            DEM: 'Democrat',
            LIB: 'Libertarian'
        };

        const primaryParties = partyList.map((party, index) => {
            let partyName = party;

            if (partyFullName[party]) {
                partyName = partyFullName[party];
            }

            return (
                <PartySelectOptions
                    key={index}
                    value={party}
                    label={partyName}
                />
            );
        });

        return (
            <form action="">
                <select
                    className="partySelect"
                    name="partyFilter"
                    onChange={this.props.onSelect}
                >
                    <PartySelectOptions key="all" value="all" label="All" />
                    {primaryParties}
                </select>
            </form>
        );
    }
}

export default PartySelect;
