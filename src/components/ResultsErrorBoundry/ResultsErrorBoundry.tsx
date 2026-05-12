import React, { Component } from 'react';

interface ResultsErrorBoundryProps {
    errors?: Record<string, unknown> | false;
    errorType: string;
    children: React.ReactNode;
}

interface ResultsErrorBoundryState {
    hasError: boolean;
}

class ResultsErrorBoundry extends Component<ResultsErrorBoundryProps, ResultsErrorBoundryState> {
    constructor(props: ResultsErrorBoundryProps) {
        super(props);

        this.state = { hasError: false };
    }

    static getDerivedStateFromProps(props: ResultsErrorBoundryProps) {
        return { hasError: props.errors && props.errors[props.errorType] };
    }

    static getDerivedStateFromError(_error: Error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
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
