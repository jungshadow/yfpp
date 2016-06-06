// Import dependencies 
import React from 'react';
import ReactDOM from 'react-dom';
import autobind from 'autobind-decorator';

import Search from './Search';
import ErrorMessage from './ErrorMessage';
import PollingPlaceResults from './PollingPlaceResults';
import ContestResults from './ContestResults';
import PartySelect from './PartySelect';
import SiteTitle from './SiteTitle';
import Tabs from './Tabs';
import TabPanel from './TabPanel';

// active classname
const ACTIVE_CLASS = 'isActive';

@autobind

/**
 * Outer component for YFPP application
 * 
 * @class App
 * @extends React.Component
 * 
 */
class App extends React.Component {

    /**
     * Sets initial state 
     * @constructor
     */
    constructor() {
        super();

        // sets initial state with empty results arrays
        // that will be dynamically populated from search results
        this.state = {
            pollingLocations: [],
            earlyVoteSites: [],
            contests: [],
            isActive: false,
            isError: false,
            filterBy: 'all',
            primaryParties: []
        };
    };

    /**
     * Sets state with results from search 
     *
     * @method updateResults
     * @param  {object} data object returned from API
     */
    updateResults(data) {
    	const pollingLocations = data.pollingLocations || [];
    	const earlyVoteSites = data.earlyVoteSites || [];
        const contests = data.contests || [];
        const partyList = [];
	   
        if(contests.length > 0) {

            this.setState({ 
                isActive: false,
                isError: false });

            Object.keys(contests).map(function(key) {    

                if(contests[key].primaryParty && contests[key].primaryParty !== '' && partyList.indexOf(contests[key].primaryParty) === -1) {
                    partyList.push(contests[key].primaryParty);
                }
            });
        }

        this.setState({
            pollingLocations: pollingLocations,
            earlyVoteSites: earlyVoteSites,
            contests: contests,
            primaryParties: partyList,
            isActive: true
        });
    }

    onErrorHandler() {
        
        this.setState({
            isError: true
        })
    }

    /**
     * Sets state with latest filter text 
     *
     * @method updateFilterText
     * @param  {string} user input text
     */
    updateFilterText(textString) {
        this.setState({
            filterBy: textString
        });

    };

    renderErrorMessage() {
        console.log('balls');
        return (<ErrorMessage />);
    }

    /**
     * Renders Polling Place Results data
     *
     * @method renderPollingPlaceResults
     * @param  {string} key unique index
     * @return {bject}  PollinPlaceResults component markup
     */
    renderPollingPlaceResults(key) {
        return <PollingPlaceResults key={key} pollingLocations={this.state.pollingLocations[key]}  />
    };

    /**
     * Renders Contest Results data
     *
     * @method renderContestResults
     * @param  {string} key unique index
     * @return {object}  PollinPlaceResults component markup
     */
    renderContestResults(key) {
        const currentContest = this.state.contests[key];

        if (currentContest.primaryParty && this.state.filterBy === currentContest.primaryParty) {
            return <ContestResults key={key} filterBy={this.state.filterBy} currentContest={currentContest} />;
        } else if (!currentContest.primaryParty || this.state.filterBy === 'all' || currentContest.primaryParty == '') {
            return <ContestResults key={key} filterBy={this.state.filterBy} currentContest={currentContest} />;
        }
    }

    /**
     * Renders party select form
     *
     * @method render
     * @return {object} PartySelect component markup
     */
    renderPartySelect() {
        if (this.state.primaryParties) {
            return <PartySelect primaryParties={this.state.primaryParties} updateFilterText={this.updateFilterText}/>
        }
    }

    /**
     * Renders application to the DOM
     *
     * @method render
     * @return {object} App component markup
     */
    render() {
        // sets active classname
        var activeClassName = this.state.isActive === true ? ACTIVE_CLASS : '';
        
        return (
<div>
    <ul className="hList">
         <li>
             <a href="" className="actionLink actionLink_twitter mix-actionLink_lrg"></a>
         </li>
         <li>
             <a href="" className="actionLink actionLink_facebook mix-actionLink_lrg"></a>
         </li>
     </ul> 
      <div className={'contentWrap ' + activeClassName}>
        <header className="contentWrap-primary" role="banner">
            <div className="contentWrap-primary-inner">
                <div className="wrapper">
                    <div className="group mix-group_narrow">
                        <div className="group-hd">
                            <SiteTitle activeClassName={activeClassName} />
                        </div>
                        <div className="group-bd">
                            <Search updateResults={this.updateResults} activeClassName={activeClassName} onErrorHandler={this.onErrorHandler} />
                        </div>
                        <div className="group-ft">{ this.state.isError ? this.renderErrorMessage() : '' }</div>
                    </div>
                </div>
                <div className={'starsNstripes '  + activeClassName}>
                    <span className="starsNstripes-stripeSm"></span>
                    <span className="starsNstripes-stripe"></span>
                    <span className="starsNstripes-stripeSm starsNstripes-stripeSm_btm"></span>
                    <span className="starsNstripes-star"><i className="icon icon_star-hollow"></i></span>
                    <span className="starsNstripes-stripeSm starsNstripes-stripeSm_rgt"></span>
                    <span className="starsNstripes-stripe starsNstripes-stripe_rgt"></span>
                    <span className="starsNstripes-stripeSm starsNstripes-stripeSm_rgt starsNstripes-stripeSm_btm"></span>
                </div>
            </div>
        </header>
        
        <main className="contentWrap-secondary" role="main">
            
            <div className="wrapper mix-wrapper_bleed">
                <Tabs>
                    <TabPanel label="Fucking Polling Place">
                        <ul className="vList">
                            {Object.keys(this.state.pollingLocations).map(this.renderPollingPlaceResults)}
                        </ul>
                    </TabPanel>
                    <TabPanel label="On Your Fucking Ballot">
                        <div className="group">
                                                {(() => {
                
                                if(this.state.primaryParties.length > 0) {
                                    
                                    return (
                                        <div className="group-item">
                                            {this.renderPartySelect()}
                                        </div>
                                    );
                                }
                                })()}
                            {(() => {
                                if(this.state.contests.length > 0) {
                                    
                                    return (
                                        <div className="group-item">
                                            <ul className="vList">
                                                {Object.keys(this.state.contests).map(this.renderContestResults)}
                                            </ul>
                                        </div>
                                    );
                            }
                            })()}
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        </main>
        <div className="contentWrap-tertiary"><div className="heroImg"></div></div>
    </div>
</div>
        )

    };

};

export default App;



