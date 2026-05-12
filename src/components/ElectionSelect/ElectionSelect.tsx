import React, {useContext} from 'react';

import {AppContext, DispatchContext} from 'appReducer';
import getLocations from 'requests/getLocations';
import type { CivicApiResponse } from 'types/index';

import analytics from 'analytics';
import ElectionSelectOptions from './ElectionSelectOptions';
import './electionSelect.scss';

const ElectionSelect = () => {
    const {relevantElections, searchQuery, electionInfo} = useContext(AppContext);
    const dispatch = useContext(DispatchContext);

    const handleOnChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        const locations = await getLocations(searchQuery ?? '', selectedValue);
        if (locations) {
            updateLocations(locations);
        }
    };

    const updateLocations = (locations: CivicApiResponse) => {
        if (locations.error) {
            analytics.failure(locations.error);
            dispatch({type: 'SET_ERROR', error: {locations: locations.error as { message: string }}});
        } else {
            analytics.success(locations);
            dispatch({
                type: 'UPDATE_SEARCH_RESULTS',
                data: {...locations, relevantElections, searchQuery: searchQuery ?? ''}
            });
        }
    };

    if (!relevantElections || relevantElections.length === 1) {
        return null;
    }

    return (
        <form action="">
            <select className="electionSelect" name="electionSelect" onChange={handleOnChange} value={electionInfo.id}>
                {relevantElections.map((election, index) => (
                    <ElectionSelectOptions
                        key={index}
                        selected={election.id === electionInfo.id}
                        value={election.id}
                        label={election.name}
                    />
                ))}
            </select>
        </form>
    );
};

export default ElectionSelect;
