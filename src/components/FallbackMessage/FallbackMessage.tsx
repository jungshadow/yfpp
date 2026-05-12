import React from 'react';
import KitchenSink from 'components/KitchenSink/KitchenSink';
import './fallbackMessage.scss';

interface FallbackMessageProps {
    message: React.ReactNode;
}

const FallbackMessage = ({ message }: FallbackMessageProps) => {
    return (
        <div className="fallbackMessage">
            <KitchenSink>{message}</KitchenSink>
        </div>
    );
};

export default FallbackMessage;
