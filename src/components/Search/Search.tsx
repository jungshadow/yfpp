// Import dependencies
import React, { useState, useContext } from 'react';
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
import type { ElectionInfo } from 'types/index';

function Search() {
    const dispatch = useContext(DispatchContext);
    const { isActive, searchToggleIsOpen, elections } = useContext(AppContext);
    const [searchValue, setsearchValue] = useState('');
    const windowSize = useWindowSize();

    const handleOnSearch = (val: string) => {
        setsearchValue(val);
    };

    const fetchData = async (e?: React.FormEvent | null, searchVal?: string) => {
        const searchQuery = searchVal ? searchVal : searchValue;
        if (e) {
            e.preventDefault();
        }
        const relevantElections = getRelevantElections(searchQuery);
        const electionId = getElectionId(relevantElections);

        const [locations, representatives] = await Promise.all([
            getLocations(searchQuery, electionId),
            getRepresentatives(searchQuery),
        ]);

        // TODO let's maybe move this outta here into a function
        if (locations?.error) {
            analytics.failure(locations.error);
            dispatch({
                type: 'SET_ERROR',
                error: { locations: locations.error as { message: string } },
            });
        } else if (locations) {
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

        if (representatives?.error) {
            analytics.failure(representatives.error);
            dispatch({
                type: 'SET_ERROR',
                error: { representatives: representatives.error as { message: string } },
            });
        } else if (representatives) {
            analytics.success(representatives);
            dispatch({
                type: 'UPDATE_REPRESENTATIVES_RESULTS',
                data: representatives,
            });
        }

        console.log(locations, representatives);
    };

    const getRelevantElections = (searchValue: string): ElectionInfo[] | undefined => {
        if (!elections.length) {
            return;
        }
        let usersState: string | null | undefined = null;
        const searchValueSegments = searchValue
            .replace(/,|[0-9]|United States/gi, '')
            .split(' ')
            .filter(segment => segment !== '')
            .slice(-2);

        if (searchValueSegments[1] && searchValueSegments[1].length > 2) {
            let matchedStates = Object.values(statesMap).filter(state =>
                state
                    .toLowerCase()
                    .includes(searchValueSegments[1].toLowerCase())
            );
            if (matchedStates && matchedStates.length > 1) {
                matchedStates = Object.values(statesMap).filter(state =>
                    state
                        .toLowerCase()
                        .includes(
                            `${searchValueSegments[0].toLowerCase()} ${searchValueSegments[1].toLowerCase()}`
                        )
                );
            }
            usersState = Object.keys(statesMap).find(state => {
                return statesMap[state] === matchedStates[0];
            });
        } else if (
            searchValueSegments[1] &&
            searchValueSegments[1].length === 2
        ) {
            usersState = searchValueSegments[1].toUpperCase();
        }

        const relevantElections = elections.filter(election => {
            const ocdId = election.ocdDivisionId || '';
            const stateSegment = ocdId
                .split('/')
                .find(segment => segment.includes('state:'));

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

    const getElectionId = (relevantElections?: ElectionInfo[]): string | undefined => {
        if (relevantElections && relevantElections.length > 1) {
            relevantElections.sort(
                (a, b) => new Date(a.electionDay).getTime() - new Date(b.electionDay).getTime()
            );
            return relevantElections[0].id;
        } else if (relevantElections && relevantElections.length === 1) {
            return relevantElections[0].id;
        }
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

export default Search;
