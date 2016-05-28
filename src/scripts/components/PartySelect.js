// Import dependencies 
import React from 'react';
import ReactDOM from 'react-dom';

import autobind from 'autobind-decorator';

import PartySelectOptions from './PartySelectOptions';

@autobind

/**
 * Party Select Component
 *
 * @class PartySelect
 * @extends React.Component
 */
 class PartySelect extends React.Component {

    onChangeHandler() {

        this.props.updateFilterText(this.refs.partySelect.value);
    }


    /**
     * Renders party select component
     *
     * @method render
     * @return {object} search component markup
     */
     render() {

        const partyList = this.props.primaryParties;
        const primaryParties = [
            <PartySelectOptions key='all' primartyPartyAbbr='all'   primaryPartyName='All' />
        ];

        let i = 0; 

        const partyFullName = {

            REP : 'Republican',
            DEM : 'Democrat',
            LIB : 'Libertarian'
        }


        
        partyList.map(function(party) {                 

                let partyName = party;
                
                if (partyFullName[party]) {
                    
                    partyName = partyFullName[party]
                }

                primaryParties.push(<PartySelectOptions key={i} primaryPartyAbbr={party} primaryPartyName={partyName} />);

                i++;

        });     

            return (
                <form action="">
                    <select name="" id="" ref="partySelect" onChange={this.onChangeHandler}>
                        {primaryParties}
                    </select>
                </form>
                )
        }
     };

     export default PartySelect;