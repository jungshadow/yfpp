import React, { Component } from 'react';

class ResultsErrorBoundry extends Component {
    constructor(props) {
        super(props);

        this.state = { hasError: false };
    }

    static getDerivedStateFromProps(props) {
        return { hasError: props.errors && props.errors[props.errorType] };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        // logErrorToMyService(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>Some shit ain't right.</h1>;
        }

        return this.props.children;
    }
}

export default ResultsErrorBoundry;
