import React from 'react';
import PropTypes from 'prop-types';

/**
 * Autocomplete Form Component
 *
 * @class Autocomplete
 * @extends React.Component
 */
class Autocomplete extends React.Component {
    MBX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_API_ACCESS_TOKEN;

    constructor(props) {
        super(props);
        this.state = {
            lastValue: '',
            dataSource: []
        };
        this.geocodingClient = {};
        //this.handleOnChange = e => {};
    }

    logValue() {
        const {lastValue} = this.state;
        console.log(`Last value: ${lastValue}`)
    }

    componentDidMount() {
        if (!this.props.placeholder) {
            throw new Error('Autocomplete requires a placeholder prop');
        }

        if (!(typeof this.props.reference === 'object') || (typeof this.props.reference === null)) {
            throw new Error('Autocomplete requires a ref prop');
        }
    }

    componentDidUpdate() {
        if (!this.props.placeholder) {
            throw new Error('Autocomplete requires a placeholder prop');
        }

        if (!(typeof this.props.reference === 'object') || (typeof this.props.reference === null)) {
            throw new Error('Autocomplete requires a ref prop');
        }
    }

    forwardGeocode(value) {
        const mbxClient = require('@mapbox/mapbox-sdk');
        const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');

        const baseClient = mbxClient({ accessToken: this.MBX_ACCESS_TOKEN });
        const geocodingService = mbxGeocoding(baseClient);

        const searchQuery = value;

        let placeNames = [];

        geocodingService.forwardGeocode({
            query: searchQuery,
            limit: 5,
            types: ['address'],
            countries: ['US']
        })
        .send()
        .then(response => {
            const match = response.body;
            const features = match.features;

            features.forEach((item, i) => {
                console.log(item);
                placeNames.push(item.place_name);
            });

            this.setState({ dataSource: placeNames });
        });
    };

    handleOnChange = e => {
        const val = e.target.value;
        const geocodeResults = this.forwardGeocode.bind(this)(val);

        const eventType = this.state.dataSource.find(
            item => item === val) && this.state.lastValue.length < (
                val.length - 1) ? 'onSelect' : 'onSearch';
        this.props[eventType] && this.props[eventType](val);

        this.setState({ lastValue: val }, () => { this.logValue() });
    }

    render() {
        return (
            <>
                <input
                    autoComplete='off'
                    list="autocomplete-list"
                    id="list"
                    name="list"
                    placeholder={this.props.placeholder}
                    onChange={this.handleOnChange}
                    className="searchForm-input"
                    type="search"
                    ref={this.props.reference}
                />

                <datalist id="autocomplete-list">
                    {this.state.dataSource.map(
                        item => <option key={item} value={item} /> )}
                </datalist>
            </>
        )
    }
}

Autocomplete.propTypes = {
    placeholder: PropTypes.string.isRequired,
    reference: PropTypes.object.isRequired
};

export default Autocomplete;
