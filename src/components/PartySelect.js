// Import dependencies
import React from 'react';

import PartySelectOptions from './PartySelectOptions';

/**
 * Party Select Component
 *
 * @class PartySelect
 * @extends React.Component
 */
class PartySelect extends React.Component {
    onChangeHandler = () => {
        this.props.updateFilterText(this.refs.partySelect.value);
    };

    /**
     * Renders party select component
     *
     * @method render
     * @return {object} search component markup
     */
    render() {
        const partyList = this.props.primaryParties;

        const partyFullName = {
            REP: 'Republican',
            DEM: 'Democrat',
            LIB: 'Libertarian',
        };

        const primaryParties = partyList.map((party, index) => {
            let partyName = party;

            if (partyFullName[party]) {
                partyName = partyFullName[party];
            }

            return <PartySelectOptions key={index} primaryPartyAbbr={party} primaryPartyName={partyName} />;
        });

        return (
            <form action="">
                <select className="formSelect" name="" ref="partySelect" onChange={this.onChangeHandler}>
                    <PartySelectOptions key="all" primartyPartyAbbr="all" primaryPartyName="All" />
                    {primaryParties}
                </select>
            </form>
        );
    }
}

export default PartySelect;
