import React, { Component } from 'react';
import ContestResults from './ContestResults';

class ContestsList extends Component {
    renderContestsList() {
        return <ul className="vList">{Object.keys(this.props.contests).map(this.generateContestResult)}</ul>;
    }

    /**
     * Generates single contest result entry
     *
     * @method generateContestResult
     * @param  {string} key unique index
     * @return {object} single contest result component markup
     */
    generateContestResult = key => {
        const currentContest = this.props.contests[key];

        // if the current contest has a primaryParty property
        // and the selected filter is equal to that primaryParty
        // return the contest result
        if (currentContest.primaryParty && this.props.filterBy === currentContest.primaryParty) {
            return <ContestResults key={key} filterBy={this.props.filterBy} currentContest={currentContest} />;

            // else if the currentContest does not have primaryParty
            // or the primaryParty is empty
            // or the current selected filter is set to all
            // return the contest result
        } else if (!currentContest.primaryParty || this.props.filterBy === 'All' || currentContest.primaryParty === '') {
            return <ContestResults key={key} filterBy={this.props.filterBy} currentContest={currentContest} />;
        }
    };

    render() {
        return <div className="group-item">{this.props.contests && this.props.contests.length ? this.renderContestsList() : null}</div>;
    }
}

export default ContestsList;
