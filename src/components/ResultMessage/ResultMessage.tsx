import React from 'react';
import './resultMessage.scss';
import KitchenSink from 'components/KitchenSink/KitchenSink';

interface ResultMessageProps {
    children: React.ReactNode;
}

const ResultMessage = ({ children }: ResultMessageProps) => {
    return (
        <div className="resultMessage">
            <KitchenSink>{children}</KitchenSink>
        </div>
    );
};

export default ResultMessage;
