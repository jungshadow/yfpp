import React from 'react';
import PropTypes from 'prop-types'

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
            lastValue: ''
        };

        this.handleOnChange = this.handleOnChange.bind(this);
    }

    logValue() {
        const {lastValue} = this.state;
        console.log(`Last value: ${lastValue}`)
    }

    componentDidMount() {
        if (!this.props.dataSource || !Array.isArray(this.props.dataSource)) {
            throw new Error('Autocomplete requires a dataSource[] prop')
        }
    }

    componentDidUpdate() {
        if (!this.props.dataSource || !Array.isArray(this.props.dataSource)) {
            throw new Error('Autocomplete requires a dataSource[] prop')
        }
    }

    handleOnChange(e) {
        const val = e.target.value;

        const eventType = this.props.dataSource.find(
            item => item === val) && this.state.lastValue.length < (
                val.length - 1) ? 'onSelect' : 'onSearch';
        this.props[eventType] && this.props[eventType](val);

        this.setState({ lastValue: val }, () => { this.logValue() });
    }

    render() {
        return (
            <React.Fragment>
                <input
                    autoComplete='off'
                    list="autocomplete-list"
                    id="list"
                    name="list"
                    placeholder="Search"
                    onChange={this.handleOnChange}
                />

                <datalist id="autocomplete-list">
                    {this.props.dataSource.map(
                        item => <option key={item} value={item} /> )}
                </datalist>
            </React.Fragment>
        )
    }
}

Autocomplete.propTypes = {
    dataSource: PropTypes.array.isRequired
};

export default Autocomplete;
