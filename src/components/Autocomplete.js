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
        this.handleOnChange = e => {};
    }

    logValue() {
        const {lastValue} = this.state;
        console.log(`Last value: ${lastValue}`)
    }

    componentDidMount() {
        if (!this.props.dataSource || !Array.isArray(this.props.dataSource)) {
            throw new Error('Autocomplete requires a dataSource[] prop');
        }

        if (!this.props.placeholder) {
            throw new Error('Autocomplete requires a placeholder prop');
        }

        if (!(typeof this.props.reference === 'object') || (typeof this.props.reference === null)) {
            throw new Error('Autocomplete requires a ref prop');
        }
    }

    componentDidUpdate() {
        if (!this.props.dataSource || !Array.isArray(this.props.dataSource)) {
            throw new Error('Autocomplete requires a dataSource[] prop');
        }

        if (!this.props.placeholder) {
            throw new Error('Autocomplete requires a placeholder prop');
        }

        if (!(typeof this.props.reference === 'object') || (typeof this.props.reference === null)) {
            throw new Error('Autocomplete requires a ref prop');
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
                    {this.props.dataSource.map(
                        item => <option key={item} value={item} /> )}
                </datalist>
            </>
        )
    }
}

Autocomplete.propTypes = {
    dataSource: PropTypes.array.isRequired,
    placeholder: PropTypes.string.isRequired,
    reference: PropTypes.object.isRequired
};

export default Autocomplete;
