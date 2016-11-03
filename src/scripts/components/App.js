// Import dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import autobind from 'autobind-decorator';

import Search from './Search';
import ErrorMessage from './ErrorMessage';
import ErrorReportForm from './ErrorReportForm';
import PollingPlaceResults from './PollingPlaceResults';
import EarlyVoteSiteResults from './EarlyVoteSiteResults';
import DropOffLocationResults from './DropOffLocationResults';
import ContestResults from './ContestResults';
import Modal from './Modal';
import PartySelect from './PartySelect';
import SiteTitle from './SiteTitle';
import ElectionTitle from './ElectionTitle';
import Tabs from './Tabs';
import TabPanel from './TabPanel';
import Footer from './Footer';
import PrivacyPolicy from './PrivacyPolicy';
import Bios from './Bios';
import CSSTransitionGroup from 'react-addons-css-transition-group';

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
            leoInfo: {},
            seoInfo: {},
            normalizedAddress: {},
            electionInfo: {},
            pollingLocations: [],
            earlyVoteSites: [],
            earlyVoteSiteIndex: 0,
            dropOffLocations: [],
            contests: [],
            isActive: false,
            isError: false,
            showPrivacyPolicy: false,
            showModal: false,
            filterBy: 'All',
            primaryParties: []
        };

        this.activeMsgClassName = 'hasMsg';
        this.activeModalClassName = 'hasModal';
    };

    /**
     * Sets state with results from search
     *
     * @method updateResults
     * @param  {object} data object returned from API
     */
    updateResults(data) {
        const leoInfo = (
            data.state && data.state[0] && data.state[0].local_jurisdiction && data.state[0].local_jurisdiction.electionAdministrationBody) || {};
        const seoInfo = (
            data.state && data.state[0] && data.state[0].electionAdministrationBody) || {};
        const normalizedAddress = data.normalizedInput || {};
        const electionInfo = data.election || {};
        const pollingLocations = data.pollingLocations || [];
        const earlyVoteSites = data.earlyVoteSites || [];
        const dropOffLocations = data.dropOffLocations || [];
        const contests = data.contests || [];
        const partyList = [];

        let isActive = false;
        let isError = false;

        if (contests.length > 0 || pollingLocations.length > 0) {
            if (contests.length > 0) {
                Object.keys(contests).map(function(key) {
                    if (contests[key].primaryParty && contests[key].primaryParty !== '' && partyList.indexOf(contests[key].primaryParty) === -1) {
                        partyList.push(contests[key].primaryParty);
                    }
                });
            }

            isActive = true;
            isError = false;
        } else {
            isActive = false;
            isError = true;
        }

        this.setState({
            leoInfo: leoInfo,
            seoInfo: seoInfo,
            normalizedAddress: normalizedAddress,
            electionInfo: electionInfo,
            pollingLocations: pollingLocations,
            earlyVoteSites: earlyVoteSites,
            earlyVoteSiteIndex: 0,
            dropOffLocations: dropOffLocations,
            contests: contests,
            primaryParties: partyList,
            isActive: isActive,
            isError: isError
        });
    }

    /**
     * API error response handler
     * sets isError state to true
     *
     * @method onErrorHandler
     */
    onErrorHandler() {
        this.setState({
            isError: true
        })
    }

    /**
     * API error removal handler
     * sets isError state to false
     *
     * @method onErrorRemoveHandler
     */
    onErrorRemoveHandler() {
        this.setState({
            isError: false
        })
    }

    /**
     * Privacy Policy link click handler
     * sets showPrivacyPolicy state to true
     *
     * @method onPrivacyClickHandler
     */
    onPrivacyClickHandler() {
        this.setState({
            showPrivacyPolicy: true
        });

        document.getElementsByTagName('body')[0].classList.add(this.activeMsgClassName);
    }

    /**
     * Privacy Policy close link click handler
     * sets showPrivacyPolicy state to false
     *
     * @method onPrivacyCloseHandler
     */
    onPrivacyCloseHandler() {
        this.setState({
            showPrivacyPolicy: false
        });

        // add active modal classname to body when modal is open
        // so that we can prevent scrolling behind modal
        document.getElementsByTagName('body')[0].classList.remove(this.activeModalClassName);
    }

    /**
     * Modal link click handler
     * sets showPrivacyPolicy state to true
     *
     * @method onPrivacyClickHandler
     */
    onModalClickHandler() {
        // if there's a visible error message, let's hide it
        if (this.state.isError) {
            this.onErrorRemoveHandler();
        }
        // update showModal state to trigger modal
        this.setState({
            showModal: true
        });

        // add active modal classname to body when modal is open
        // so that we can prevent scrolling behind modal
        document.getElementsByTagName('body')[0].classList.add(this.activeModalClassName);
    }

    /**
     * Modal close link click handler
     * sets showModal state to false
     *
     * @method onModalCloseHandler
     */
    onModalCloseHandler() {
        this.setState({
            showModal: false
        });

        document.getElementsByTagName('body')[0].classList.remove(this.activeModalClassName);
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

    /**
     * Renders Error Message component
     *
     * @method renderErrorMessage
     * @return error message markup
     */
    renderErrorMessage() {
        return (<ErrorMessage leoInfo={this.state.leoInfo} seoInfo={this.state.seoInfo} errorHandlerRemover={this.onErrorRemoveHandler} />);
    }

    /**
     * Renders Privacy Policy component
     *
     * @method renderPrivacyPolicy
     * @return privacy policy markup
     */
    renderPrivacyPolicy() {
        return (<PrivacyPolicy onPrivacyCloseHandler={this.onPrivacyCloseHandler} />);
    }

    /**
     * Renders Early Vote Site Results data
     *
     * @method renderEarlyVoteSiteResults
     * @param  {string} key unique index
     * @return {object}  EarlyVoteSiteResults component markup
     */
    renderDropOffLocationResults() {
        if (this.state.dropOffLocations.length > 0) {
            return (
                <ul className="vList">
                    {
                        Object.keys(
                            this.state.dropOffLocations
                        ).map(this.generateDropOffLocations)
                    }
                </ul>
            )
        }
    }

    updateEarlyVoteSites() {
        let currentIndex = this.state.earlyVoteSiteIndex,
            newIndex = currentIndex + 10 > this.state.earlyVoteSites.length-1 ? this.state.earlyVoteSites.length-1 : currentIndex + 10;

        this.setState({
            earlyVoteSiteIndex: newIndex
        });
    }

    /**
     * Renders Early Vote Site Results data
     *
     * @method renderEarlyVoteSiteResults
     * @param  {string} key unique index
     * @return {object}  EarlyVoteSiteResults component markup
     */
    renderEarlyVoteSiteResults() {
        if (this.state.earlyVoteSites.length > 0) {
            return (
                <ul className="vList">
                    {
                        Object.keys(
                            this.state.earlyVoteSites
                        ).map(this.generateEarlyVoteSite)
                    }
                </ul>
            )
        }
    }

    /**
     * Renders Polling Place Results data
     *
     * @method renderPollingPlaceResults
     * @param  {string} key unique index
     * @return {object}  PollinPlaceResults component markup
     */
    renderPollingPlaceResults() {
        if (this.state.pollingLocations.length > 0) {
            return (
                <ul className="vList">
                    {
                        Object.keys(
                            this.state.pollingLocations
                        ).map(this.generatePollingPlace)
                    }
                </ul>
            )
        }
    }

    /**
     * Generates single polling place entry
     *
     * @method generateDropOffLocations
     * @param  {string} key unique index
     * @return {object}  single drop off location result component markup
     */
    generateDropOffLocations(key) {
        return <DropOffLocationResults
            key={key}
            dropOffLocations={this.state.dropOffLocations[key]} />;
    }

    /**
     * Generates single polling place entry
     *
     * @method generateEarlyVoteSite
     * @param  {string} key unique index
     * @return {object}  single early vote site result component markup
     */
    generateEarlyVoteSite(key) {
        return <EarlyVoteSiteResults
            key={key}
            earlyVoteSites={this.state.earlyVoteSites[key]} />;
    }

    /**
     * Generates single polling place entry
     *
     * @method generatePollingPlace
     * @param  {string} key unique index
     * @return {object}  single polling place result component markup
     */
    generatePollingPlace(key) {
        return <PollingPlaceResults
            key={key}
            pollingLocations={this.state.pollingLocations[key]} />;
    }

    /**
     * Renders Content Results Data
     *
     * @method renderContestResults
     * @return {object} markup for contest results container and list items
     */
    renderContestResults() {
        if (this.state.contests.length > 0) {
            return (
                <div className="group-item">
                    <ul className="vList">
                       {Object.keys(this.state.contests).map(this.generateContestResult)}
                    </ul>
                </div>
            )
        }
    }

    /**
     * Generates single contest result entry
     *
     * @method generateContestResult
     * @param  {string} key unique index
     * @return {object} single contest result component markup
     */
    generateContestResult(key) {
        const currentContest = this.state.contests[key];

        // if the current contest has a primaryParty property
        // and the selected filter is equal to that primaryParty
        // return the contest result
        if (currentContest.primaryParty && this.state.filterBy === currentContest.primaryParty) {
            return <ContestResults key={key} filterBy={this.state.filterBy} currentContest={currentContest} />;

            // else if the currentContest does not have primaryParty
            // or the primaryParty is empty
            // or the current selected filter is set to all
            // return the contest result
        } else if (!currentContest.primaryParty || this.state.filterBy === 'All' || currentContest.primaryParty == '') {
            return <ContestResults key={key} filterBy={this.state.filterBy} currentContest={currentContest} />;
        }
    }

    /**
     * Renders party select form
     *
     * @method renderPartySelect
     * @return {object} PartySelect component markup container and option list
     */
    renderPartySelect() {

        if (this.state.primaryParties.length > 0) {
            return (
                <div className="group-item">
                    <PartySelect primaryParties={this.state.primaryParties} updateFilterText={this.updateFilterText}/>
                </div>
            )
        }
    }

    /**
     * Renders application to the DOM
     *
     * @method render
     * @return {object} App component markup
     */
    render() {
        // sets active classnames
        const activeClassName = this.state.isActive === true ? ACTIVE_CLASS : '';

        return (
            <div className="site">
                <div className={'contentWrap ' + activeClassName}>
                    <div className="contentWrap-ancillary">
                        <div className="wrapper">
                            <ul className="hList">
                                <li>
                                    <a href="http://twitter.com/fnpollingplace" target="_blank" className="actionLink actionLink_twitter mix-actionLink_lrg mix-actionLink_twitter"></a>
                                </li>
                                <li>
                                    <a href="http://www.facebook.com/Your-Fucking-Polling-Place-120373578023062" target="_blank" className="actionLink actionLink_facebook mix-actionLink_lrg mix-actionLink_facebook"></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <header className="contentWrap-primary" role="banner">
                        <div className="contentWrap-primary-inner">
                            <div className="wrapper">
                                <div className="group mix-group_narrow">
                                    <div className="group-hd">
                                        <SiteTitle activeClassName={activeClassName} />
                                    </div>
                                    <div className="group-bd">
                                        <Search updateResults={this.updateResults} activeClassName={activeClassName} onErrorHandler={this.onErrorHandler} onErrorRemoveHandler={this.onErrorRemoveHandler} />
                                    </div>
                                    <CSSTransitionGroup
                                        className="group-ft mix-group_absolute"
                                        transitionName="fade"
                                        transitionEnterTimeout={500}
                                        transitionLeaveTimeout={300}>

                                        {this.state.isError ? this.renderErrorMessage() : ''}

                                    </CSSTransitionGroup>
                                </div>
                            </div>
                            <div className={ 'starsNstripes ' + activeClassName}>
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
                            <ElectionTitle electionInfo={this.state.electionInfo} />
                            <Tabs>
                                <TabPanel label="Fucking Polling Place" normalizedAddress={this.state.normalizedAddress} electionInfo={this.state.electionInfo}>
                                    <EarlyVoteSiteResults
                                        earlyVoteSites={this.state.earlyVoteSites}
                                        index={this.state.earlyVoteSiteIndex}
                                        handleChange={this.updateEarlyVoteSites} />
                                    {this.renderDropOffLocationResults()}
                                    {this.renderPollingPlaceResults()}
                                </TabPanel>
                                <TabPanel label="On Your Fucking Ballot" normalizedAddress={this.state.normalizedAddress} electionInfo={this.state.electionInfo}>
                                    <div className="group">
                                        {this.renderPartySelect()}
                                        {this.renderContestResults()}
                                    </div>
                                </TabPanel>
                            </Tabs>
                        </div>
                    </main>
                    <div className="contentWrap-tertiary"></div>
                </div>
                <Footer onPrivacyClickHandler={this.onPrivacyClickHandler} onModalClickHandler={this.onModalClickHandler} />
                    { this.state.showPrivacyPolicy ? this.renderPrivacyPolicy() : '' }
                <Modal onModalCloseHandler={this.onModalCloseHandler} showModal={this.state.showModal} >
                    <Bios />
                </Modal>
            </div>
        )
    };
};

export default App;
