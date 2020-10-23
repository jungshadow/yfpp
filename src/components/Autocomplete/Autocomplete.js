import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import classnames from 'classnames';
import './autocomplete.scss';
import useOutsideClick from 'hooks/useOutsideClick';

const MBX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_API_ACCESS_TOKEN;
const mbxClient = require('@mapbox/mapbox-sdk');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const baseClient = mbxClient({ accessToken: MBX_ACCESS_TOKEN });
const geocodingService = mbxGeocoding(baseClient);

const Autocomplete = ({ isActive, onSubmit, onSearch, placeholder, value }) => {
    const [dataSource, setDataSource] = useState([]);
    const refsArray = [];
    const searchInputRef = React.createRef();
    useOutsideClick(searchInputRef, handleCloseAutoComplete);

    const getAutoCompleteClassNames = () => {
        return classnames({
            autocomplete: true,
            'autocomplete--hasSearchVal': isActive,
        });
    };

    const logValue = () => {
        console.log(`Last value: ${value}`);
    };

    const debouncedGetAutoCompleteAddresses = debounce(
        async val => getAutoCompleteAddresses(val),
        200
    );

    const getAutoCompleteAddresses = async value => {
        const searchQuery = value;
        if (!searchQuery) {
            return;
        }

        const response = await geocodingService
            .forwardGeocode({
                query: searchQuery,
                limit: 5,
                types: ['address'],
                countries: ['US'],
            })
            .send();

        const query = response.body.query;
        const matches = response.body.features.map(address => {
            return {
                location: address.place_name,
                query,
            };
        });

        setDataSource(matches);
    };

    const handleOnChange = e => {
        const val = e.target.value;
        debouncedGetAutoCompleteAddresses(val);
        onSearch(val);
    };

    const handleSelectItem = index => {
        onSearch(dataSource[index].location);
        setDataSource([]);
        logValue();
        onSubmit(null, dataSource[index].location);
    };

    const handleInputKeyDown = event => {
        if (!dataSource.length) {
            return;
        }
        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault();
                refsArray[0].focus();
                break;

            case 'Escape':
                handleCloseAutoComplete();
                break;
            case 'Enter':
                handleCloseAutoComplete();
                onSubmit(event);
                break;

            default:
                return;
        }
    };

    function handleCloseAutoComplete() {
        setDataSource([]);
    }

    const handleActionKeyDown = (event, index, results) => {
        event.preventDefault();

        switch (event.key) {
            case 'ArrowDown':
                {
                    const nextIndex =
                        index < results.length ? index + 1 : index;
                    if (refsArray[nextIndex]) {
                        refsArray[nextIndex].focus();
                    }
                }
                break;

            case 'ArrowUp':
                {
                    const nextIndex = index > 0 ? index - 1 : index;
                    if (refsArray[nextIndex]) {
                        refsArray[nextIndex].focus();
                    }
                }
                break;

            case 'Enter':
                handleSelectItem(index);
                handleCloseAutoComplete();
                searchInputRef.current.focus();
                break;

            case 'Escape':
                handleCloseAutoComplete();
                break;

            default:
                searchInputRef.current.focus();
        }
    };

    const getHighlightedMatches = locationData => {
        const { location, query } = locationData;
        const term = new RegExp(query.join('|'), 'gi');
        const newStr = location.replace(
            new RegExp(term, 'gi'),
            match => `<b>${match}</b>`
        );

        return { __html: newStr };
    };

    return (
        <div className={getAutoCompleteClassNames()}>
            <input
                className="autocomplete__input"
                id="searchFormInput"
                name="searchFormInput"
                onChange={handleOnChange}
                // onBlur={handleCloseAutoComplete}
                onKeyDown={handleInputKeyDown}
                placeholder={placeholder}
                ref={searchInputRef}
                type="search"
                value={value}
            />

            {dataSource.length > 0 && (
                <ul className="autocomplete__list">
                    {dataSource.map((item, index, results) => (
                        <li
                            key={`autocomplete${index}`}
                            className="autocomplete__listItem"
                        >
                            <button
                                className="autocomplete__action"
                                dangerouslySetInnerHTML={getHighlightedMatches(
                                    item
                                )}
                                id={`autocomplete${index}`}
                                onClick={() => handleSelectItem(index)}
                                onKeyDown={e =>
                                    handleActionKeyDown(e, index, results)
                                }
                                ref={ref => (refsArray[index] = ref)}
                                type="button"
                            ></button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

Autocomplete.propTypes = {
    placeholder: PropTypes.string.isRequired,
    onSearch: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Autocomplete;
