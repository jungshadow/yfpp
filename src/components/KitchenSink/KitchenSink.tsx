import React from 'react';
import classnames from 'classnames';

import './kitchenSink.scss';

interface KitchenSinkProps {
    children: React.ReactNode;
    isReversed?: boolean;
    isCentered?: boolean;
}

const KitchenSink = ({ children, isReversed, isCentered }: KitchenSinkProps) => {
    const getKitchenSinkClassnames = () => {
        return classnames({
            kitchenSink: true,
            'kitchenSink--reversed': isReversed,
            'kitchenSink--centered': isCentered,
        });
    };
    return <div className={getKitchenSinkClassnames()}>{children}</div>;
};

export default KitchenSink;
