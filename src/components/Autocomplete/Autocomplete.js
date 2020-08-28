import React from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import './autocomplete.scss';

const MBX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_API_ACCESS_TOKEN;
const mbxClient = require('@mapbox/mapbox-sdk');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const baseClient = mbxClient({ accessToken: MBX_ACCESS_TOKEN });
const geocodingService = mbxGeocoding(baseClient);

/**
 * Autocomplete Form Component
 *
 * @class Autocomplete
 * @extends React.Component
 */
class Autocomplete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
        };
        this.geocodingClient = {};
        this.searchInputRef = React.createRef();
        this.refsArray = [];
        console.log(debounce);
    }

    logValue() {
        const { value } = this.state;
        console.log(`Last value: ${value}`);
    }

    debouncedGetAutoCompleteAddresses = debounce(async (val) => this.getAutoCompleteAddresses(val), 200);

    getAutoCompleteAddresses = async (value) => {
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
        const matches = response.body.features.map((address) => {
            return {
                location: address.place_name,
                query,
            };
        });

        this.setState({ dataSource: matches });
    };

    handleOnChange = (e) => {
        const val = e.target.value;
        this.debouncedGetAutoCompleteAddresses(val);
        this.props.onSearch(val);
    };

    handleSelectItem = (index) => {
        this.props.onSearch(this.state.dataSource[index].location);
        this.setState({ dataSource: [] }, () => {
            this.logValue();
        });
    };

    handleInputKeyDown = (event) => {
        if (!this.state.dataSource.length) {
            return;
        }
        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault();
                this.refsArray[0].focus();
                break;

            case 'Escape':
                this.handleCloseAutoComplete();
                break;

            default:
                return;
        }
    };

    handleCloseAutoComplete = () => {
        this.setState({ dataSource: [] });
    };

    handleActionKeyDown = (event, index, results) => {
        event.preventDefault();
        switch (event.key) {
            case 'ArrowDown':
                {
                    const nextIndex = index < results.length ? index + 1 : index;
                    if (this.refsArray[nextIndex]) {
                        this.refsArray[nextIndex].focus();
                    }
                }
                break;

            case 'ArrowUp':
                {
                    const nextIndex = index > 0 ? index - 1 : index;
                    if (this.refsArray[nextIndex]) {
                        this.refsArray[nextIndex].focus();
                    }
                }
                break;

            case 'Enter':
                this.handleSelectItem(index);
                break;

            case 'Escape':
                this.handleCloseAutoComplete();
                break;

            default:
                this.searchInputRef.current.focus();
        }
    };

    getHighlightedMatches = (locationData) => {
        const { location, query } = locationData;
        const term = new RegExp(query.join('|'), 'gi');
        const newStr = location.replace(new RegExp(term, 'gi'), (match) => `<b>${match}</b>`);

        return { __html: newStr };
    };

    render() {
        const { dataSource } = this.state;

        return (
            <div className="autocomplete">
                <input
                    className="searchForm-input"
                    id="searchFormInput"
                    name="searchFormInput"
                    onChange={this.handleOnChange}
                    onBlur={this.handleCloseAutoComplete}
                    onKeyDown={this.handleInputKeyDown}
                    placeholder={this.props.placeholder}
                    ref={this.searchInputRef}
                    type="search"
                    value={this.props.value}
                />

                {dataSource.length > 0 && (
                    <ul className="autocomplete__list">
                        {dataSource.map((item, index, results) => (
                            <li key={`autocomplete${index}`} className="autocomplete__listItem">
                                <button
                                    className="autocomplete__action"
                                    dangerouslySetInnerHTML={this.getHighlightedMatches(item)}
                                    id={`autocomplete${index}`}
                                    onClick={() => this.handleSelectItem(index)}
                                    onKeyDown={(e) => this.handleActionKeyDown(e, index, results)}
                                    ref={(ref) => (this.refsArray[index] = ref)}
                                    type="button"
                                ></button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    }
}

Autocomplete.propTypes = {
    placeholder: PropTypes.string.isRequired,
    onSearch: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Autocomplete;
