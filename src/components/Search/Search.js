// Import dependencies
import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import analytics from 'analytics';
import Autocomplete from 'components/Autocomplete/Autocomplete';
import { AppContext, DispatchContext } from 'appReducer';
import useWindowSize from 'hooks/useWindowSize';
import SearchIcon from 'components/Icons/SearchIcon';
import CloseIcon from 'components/Icons/CloseIcon';
import './search.scss';
import statesMap from './statesMap';
import getLocations from 'requests/getLocations';
import getRepresentatives from 'requests/getRepresentatives';

/**
 * Search Form Component
 *
 * @class Search
 * @extends React.Component
 */
function Search(props) {
    const dispatch = useContext(DispatchContext);
    const { isActive, searchToggleIsOpen, elections } = useContext(AppContext);
    const [searchValue, setsearchValue] = useState('');
    const windowSize = useWindowSize();

    const handleOnSearch = val => {
        setsearchValue(val);
    };

    const fetchData = async (e, searchVal) => {
        const searchQuery = searchVal ? searchVal : searchValue;
        if (e) {
            e.preventDefault();
        }

        let representatives = await getRepresentatives(searchQuery);

        const relevantElections = getRelevantElections(representatives);
        const electionId = getElectionId(relevantElections);

        let locations = await getLocations(searchQuery, electionId);

        // TODO let's maybe move this outta here into a function
        if (locations.error) {
            analytics.failure(locations.error);
            dispatch({
                type: 'SET_ERROR',
                error: { locations: locations.error },
            });
        } else {
            analytics.success(locations);
            dispatch({
                type: 'UPDATE_SEARCH_RESULTS',
                data: {
                    ...locations,
                    relevantElections,
                    searchQuery: searchQuery,
                },
            });
        }

        if (representatives.error) {
            analytics.failure(representatives.error);
            dispatch({
                type: 'SET_ERROR',
                error: { representatives: representatives.error },
            });
        } else {
            analytics.success(representatives);
            dispatch({
                type: 'UPDATE_REPRESENTATIVES_RESULTS',
                data: representatives,
            });
        }

        console.log(locations, representatives);
        // this.showEasterEgg(searchValue);
    };

    const getRelevantElections = representatives => {
        if (!elections.length) {
            return;
        }

        const usersState = representatives.normalizedInput.state;

        // once we have the user's state figured out, we need to check the current elections and see if there's anything specific to their state in there

        // if (elections.length === 1) {
        //     return elections[0].id;
        // }

        // get rid of all elections that are not in this state and not national
        const relevantElections = elections.filter(election => {
            const stateSegment = election.ocdDivisionId
                .split('/')
                .find(segment => segment.includes('state:'));

            // if there's no state segment, then this is a national election so return it
            if (!stateSegment) {
                return true;
            }
            const electionState = stateSegment.split(':')[1];

            if (usersState && electionState === usersState.toLowerCase()) {
                return true;
            }
            return false;
        });

        return relevantElections;
    };

    const getElectionId = relevantElections => {
        if (relevantElections && relevantElections.length > 1) {
            relevantElections.sort(
                (a, b) => new Date(a.electionDay) - new Date(b.electionDay)
            );
            return relevantElections[0].id;
        } else if (relevantElections && relevantElections.length === 1) {
            return relevantElections[0].id;
        }
    };

    const errorRemove = () => {
        this.props.onErrorRemoveHandler();
    };

    const getSearchClassName = () => {
        return classnames({
            searchForm: true,
            'searchForm--hasSearchVal': isActive,
            'searchForm--isClosed': !searchToggleIsOpen && isActive,
        });
    };

    const shouldShowSearchToggle = isActive && windowSize.width < 768;

    const setsearchToggleIsOpen = () => {
        dispatch({
            type: 'SET_SEARCH_TOGGLE_STATUS',
            status: !searchToggleIsOpen,
        });
    };

    return (
        <form className={getSearchClassName()} action="" onSubmit={fetchData}>
            <div className="searchForm__input">
                <Autocomplete
                    placeholder="EG. 1600 Pennsylvania Ave NW, Washington, DC 20006"
                    onSearch={handleOnSearch}
                    onSubmit={fetchData}
                    onChange={errorRemove}
                    value={searchValue}
                    isActive={isActive}
                />
                <button className="searchForm__submit" type="submit">
                    <span className="searchForm__text">Search</span>
                    <span className="searchForm__icon">
                        <SearchIcon />
                    </span>
                </button>
            </div>
            {shouldShowSearchToggle && (
                <button
                    type="button"
                    className="searchForm__searchToggle"
                    onClick={setsearchToggleIsOpen}
                >
                    <span className="searchForm__icon">
                        {searchToggleIsOpen ? <CloseIcon /> : <SearchIcon />}
                    </span>
                </button>
            )}
        </form>
    );
}

// set up propType validation
Search.propTypes = {
    activeClassName: PropTypes.string,
    onErrorHandler: PropTypes.func,
    onErrorRemoveHandler: PropTypes.func,
    updateResults: PropTypes.func,
};

export default Search;
