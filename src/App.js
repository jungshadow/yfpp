// Import dependencies
import $ from 'jquery';
import React from 'react';

import Search from 'components/Search';
import ErrorMessage from 'components/ErrorMessage';
import PollingPlaceResults from 'components/PollingPlaceResults';
import EarlyVoteSiteResults from 'components/EarlyVoteSiteResults';
import DropOffLocationResults from 'components/DropOffLocationResults';
import Modal from 'components/Modal';
import SiteTitle from 'components/SiteTitle';
import Footer from 'components/Footer';
import PrivacyPolicy from 'components/PrivacyPolicy';
import Bios from 'components/Bios';
import FuckOff from 'components/FuckOff';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import moment from 'moment';
import SocialLinks from 'components/SocialLinks';
import Results from 'components/Results';

// active classname
const ACTIVE_CLASS = 'isActive';

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
            pollingLocationsIndex: 0,
            earlyVoteSites: [],
            earlyVoteSitesIndex: 0,
            dropOffLocations: [],
            dropOffLocationsIndex: 0,
            contests: [],
            isActive: false,
            isError: false,
            showPrivacyPolicy: false,
            showModal: false,
            filterBy: 'All',
            primaryParties: [],
            representatives: [],
            offices: [],
        };

        this.activeMsgClassName = 'hasMsg';
        this.activeModalClassName = 'hasModal';
        this.activeFuckOffClassName = 'isFuckOff';
    }

    /**
     * Sets state with results from search
     *
     * @method updateElectionResults
     * @param  {object} data object returned from API
     */
    updateElectionResults = (data) => {
        const leoInfo = (data.state && data.state[0] && data.state[0].local_jurisdiction && data.state[0].local_jurisdiction.electionAdministrationBody) || {};
        const seoInfo = (data.state && data.state[0] && data.state[0].electionAdministrationBody) || {};
        const normalizedAddress = data.normalizedInput || {};
        const electionInfo = data.election || {};
        const pollingLocations = data.pollingLocations || [];
        const earlyVoteSites = data.earlyVoteSites || [];
        const dropOffLocations = data.dropOffLocations || [];
        const contests = data.contests || [];
        let partyList = [];

        let isActive = false;
        let isError = false;

        if (contests.length > 0 || pollingLocations.length > 0 || earlyVoteSites.length > 0 || dropOffLocations.length > 0) {
            Object.keys(contests).forEach(function(key) {
                if (contests[key].primaryParty && contests[key].primaryParty !== '' && partyList.indexOf(contests[key].primaryParty) === -1) {
                    return partyList.push(contests[key].primaryParty);
                }
                return false;
            });

            isActive = true;
            isError = false;
        } else {
            isActive = false;
            isError = true;
        }

        // TODO: I'd rather not filter sites by when they're open here, but
        // I'm going to for expediency
        // Early vote sites _should_ be the only sites that we need to worry
        // about being closed
        var i = earlyVoteSites.length;
        while (i--) {
            if (!earlyVoteSites[i].endDate || moment().isAfter(moment(earlyVoteSites[i].endDate), 'day')) {
                earlyVoteSites.splice(i, 1);
            }
        }

        this.setState({
            leoInfo: leoInfo,
            seoInfo: seoInfo,
            normalizedAddress: normalizedAddress,
            electionInfo: electionInfo,
            pollingLocations: pollingLocations,
            pollingLocationsIndex: 0,
            earlyVoteSites: earlyVoteSites,
            earlyVoteSitesIndex: 0,
            dropOffLocations: dropOffLocations,
            dropOffLocationsIndex: 0,
            contests: contests,
            primaryParties: partyList,
            isActive: isActive,
            isError: isError,
            isFuckOff: false,
        });
    };

    /**
     * API error response handler
     * sets isError state to true
     *
     * @method onErrorHandler
     */
    onErrorHandler = () => {
        this.setState({
            isError: true,
        });
    };

    /**
     * API error removal handler
     * sets isError state to false
     *
     * @method onErrorRemoveHandler
     */
    onErrorRemoveHandler = () => {
        this.setState({
            isError: false,
        });
    };

    /**
     * Fuck Off handler
     * sets isFuckOff state to true
     *
     * @method onFuckOffHandler
     */
    onFuckOffHandler = () => {
        this.setState({
            isFuckOff: true,
        });

        document.getElementsByTagName('body')[0].classList.add(this.activeFuckOffClassName);
    };

    /**
     * Fuck Off Close handler
     * sets isFuckOff state to false
     *
     * @method onFuckOffCloseHandler
     */
    onFuckOffCloseHandler = () => {
        this.setState({
            isFuckOff: false,
        });

        document.getElementsByTagName('body')[0].classList.remove(this.activeFuckOffClassName);
    };

    /**
     * Privacy Policy link click handler
     * sets showPrivacyPolicy state to true
     *
     * @method onPrivacyClickHandler
     */
    onPrivacyClickHandler = () => {
        this.setState({
            showPrivacyPolicy: true,
        });

        document.getElementsByTagName('body')[0].classList.add(this.activeMsgClassName);
    };

    /**
     * Privacy Policy close link click handler
     * sets showPrivacyPolicy state to false
     *
     * @method onPrivacyCloseHandler
     */
    onPrivacyCloseHandler = () => {
        this.setState({
            showPrivacyPolicy: false,
        });

        // add active modal classname to body when modal is open
        // so that we can prevent scrolling behind modal
        document.getElementsByTagName('body')[0].classList.remove(this.activeModalClassName);
    };

    /**
     * Modal link click handler
     * sets showPrivacyPolicy state to true
     *
     * @method onPrivacyClickHandler
     */
    onModalClickHandler = () => {
        // if there's a visible error message, let's hide it
        if (this.state.isError) {
            this.onErrorRemoveHandler();
        }
        // update showModal state to trigger modal
        this.setState({
            showModal: true,
        });

        // add active modal classname to body when modal is open
        // so that we can prevent scrolling behind modal
        document.getElementsByTagName('body')[0].classList.add(this.activeModalClassName);
    };

    /**
     * Modal close link click handler
     * sets showModal state to false
     *
     * @method onModalCloseHandler
     */
    onModalCloseHandler = () => {
        this.setState({
            showModal: false,
        });

        document.getElementsByTagName('body')[0].classList.remove(this.activeModalClassName);
    };

    /**
     * Sets state with latest filter text
     *
     * @method updateFilterText
     * @param  {string} user input text
     */
    updateFilterText = (textString) => {
        this.setState({
            filterBy: textString,
        });
    };

    /**
     * Renders Error Message component
     *
     * @method renderErrorMessage
     * @return error message markup
     */
    renderErrorMessage = () => {
        return <ErrorMessage leoInfo={this.state.leoInfo} seoInfo={this.state.seoInfo} errorHandlerRemover={this.onErrorRemoveHandler} />;
    };

    /**
     * Renders Privacy Policy component
     *
     * @method renderPrivacyPolicy
     * @return privacy policy markup
     */
    renderPrivacyPolicy = () => {
        return <PrivacyPolicy onPrivacyCloseHandler={this.onPrivacyCloseHandler} />;
    };

    /**
     * Renders Drop Off Location Results data
     *
     * @method renderDropOffLocationResults
     * @param  {string} key unique index
     * @return {object}  DropOffLocationResults component markup
     */
    renderDropOffLocationResults() {
        if (this.state.dropOffLocations.length > 0) {
            return <ul className="vList">{Object.keys(this.state.dropOffLocations).map(this.generateDropOffLocations)}</ul>;
        }
    }

    updateDropOffLocations = () => {
        let currentIndex = this.state.dropOffLocationsIndex,
            newIndex = currentIndex + 10 > this.state.dropOffLocations.length - 1 ? this.state.dropOffLocations.length - 1 : currentIndex + 10;

        this.setState({
            dropOffLocationsIndex: newIndex,
        });
    };

    updateEarlyVoteSites() {
        let currentIndex = this.state.earlyVoteSitesIndex,
            newIndex = currentIndex + 10 > this.state.earlyVoteSites.length - 1 ? this.state.earlyVoteSites.length - 1 : currentIndex + 10;

        this.setState({
            earlyVoteSitesIndex: newIndex,
        });
    }

    updatePollingLocations() {
        let currentIndex = this.state.pollingLocationsIndex,
            newIndex = currentIndex + 10 > this.state.pollingLocations.length - 1 ? this.state.pollingLocations.length - 1 : currentIndex + 10;

        this.setState({
            pollingLocationsIndex: newIndex,
        });
    }

    updateRepresentativesResults = (response) => {
        const { officials, offices } = response;

        this.setState({ representatives: officials, offices, isActive: true });
    };

    /**
     * Renders Early Vote Site Results data
     *
     * @method renderEarlyVoteSiteResults
     * @param  {string} key unique index
     * @return {object}  EarlyVoteSiteResults component markup
     */
    renderEarlyVoteSiteResults() {
        if (this.state.earlyVoteSites.length > 0) {
            return <ul className="vList">{Object.keys(this.state.earlyVoteSites).map(this.generateEarlyVoteSite)}</ul>;
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
            return <ul className="vList">{Object.keys(this.state.pollingLocations).map(this.generatePollingPlace)}</ul>;
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
        return <DropOffLocationResults key={key} dropOffLocations={this.state.dropOffLocations[key]} />;
    }

    /**
     * Generates single polling place entry
     *
     * @method generateEarlyVoteSite
     * @param  {string} key unique index
     * @return {object}  single early vote site result component markup
     */
    generateEarlyVoteSite(key) {
        return <EarlyVoteSiteResults key={key} earlyVoteSites={this.state.earlyVoteSites[key]} />;
    }

    /**
     * Generates single polling place entry
     *
     * @method generatePollingPlace
     * @param  {string} key unique index
     * @return {object}  single polling place result component markup
     */
    generatePollingPlace(key) {
        return <PollingPlaceResults key={key} pollingLocations={this.state.pollingLocations[key]} />;
    }

    scrollToTarget(event) {
        // debugger;
        const $target = $(event.currentTarget.hash);
        $('html, body').animate(
            {
                scrollTop: $target.offset().top,
            },
            500
        );
        return this;
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
                        <SocialLinks />
                    </div>
                    <header className="contentWrap-primary" role="banner">
                        <div className="contentWrap-primary-inner">
                            <div className="wrapper">
                                <div className="group mix-group_narrow">
                                    <div className="group-hd">
                                        <SiteTitle activeClassName={activeClassName} />
                                    </div>
                                    <div className="group-bd">
                                        <Search
                                            updateElectionResults={this.updateElectionResults}
                                            activeClassName={activeClassName}
                                            onErrorHandler={this.onErrorHandler}
                                            onErrorRemoveHandler={this.onErrorRemoveHandler}
                                            onFuckOffHandler={this.onFuckOffHandler}
                                            onFuckOffCloseHandler={this.onFuckOffCloseHandler}
                                            updateRepresentativesResults={this.updateRepresentativesResults}
                                        />
                                        <div className="userContent mix-userContent_md mix-userContent_ctr">
                                            <p>
                                                Not registered to vote? The fuck? <a href="https://register.rockthevote.com/">Fucking do it here!</a>
                                            </p>
                                        </div>
                                    </div>
                                    <CSSTransitionGroup className="group-ft mix-group_absolute" transitionName="fade" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                                        {this.state.isError ? this.renderErrorMessage() : ''}
                                    </CSSTransitionGroup>
                                </div>
                            </div>
                            <div className={'starsNstripes ' + activeClassName}>
                                <span className="starsNstripes-stripeSm" />
                                <span className="starsNstripes-stripe" />
                                <span className="starsNstripes-stripeSm starsNstripes-stripeSm_btm" />
                                <span className="starsNstripes-star">
                                    <i className="icon icon_star-hollow" />
                                </span>
                                <span className="starsNstripes-stripeSm starsNstripes-stripeSm_rgt" />
                                <span className="starsNstripes-stripe starsNstripes-stripe_rgt" />
                                <span className="starsNstripes-stripeSm starsNstripes-stripeSm_rgt starsNstripes-stripeSm_btm" />
                            </div>
                        </div>
                    </header>
                    <main className="contentWrap-secondary" role="main">
                        <Results
                            contests={this.state.contests}
                            dropOffLocations={this.state.dropOffLocations}
                            dropOffLocationsIndex={this.state.dropOffLocationsIndex}
                            earlyVoteSites={this.state.earlyVoteSites}
                            earlyVoteSitesIndex={this.state.earlyVoteSitesIndex}
                            electionInfo={this.state.electionInfo}
                            filterBy={this.state.filterBy}
                            handleOnSelect={this.updateFilterText}
                            handleUpdateDropOffLocations={this.updateDropOffLocations}
                            handleUpdateEarlyVoteSites={this.updateEarlyVoteSites}
                            handleUpdatePollingLocations={this.updatePollingLocations}
                            normalizedAddress={this.state.normalizedAddress}
                            pollingLocations={this.state.pollingLocations}
                            pollingLocationsIndex={this.state.pollingLocationsIndex}
                            primaryParties={this.state.primaryParties}
                            representatives={this.state.representatives}
                            offices={this.state.offices}
                        />
                    </main>
                    <div className="contentWrap-tertiary">
                        <CSSTransitionGroup className="fuckOff" transitionName="slide" transitionEnterTimeout={100} transitionLeaveTimeout={100}>
                            {this.state.isFuckOff ? <FuckOff /> : ''}
                        </CSSTransitionGroup>
                    </div>
                    <a href="#footer" className="contentWrap-anchor js-scrollTo" onClick={this.scrollToTarget}>
                        Who We Are
                    </a>
                </div>
                <Footer onPrivacyClickHandler={this.onPrivacyClickHandler} onModalClickHandler={this.onModalClickHandler} /> {this.state.showPrivacyPolicy ? this.renderPrivacyPolicy() : ''}
                <Modal onModalCloseHandler={this.onModalCloseHandler} showModal={this.state.showModal}>
                    <Bios />
                </Modal>
            </div>
        );
    }
}

export default App;
