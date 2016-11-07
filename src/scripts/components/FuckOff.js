// Import dependencies 
import React from 'react';
import ReactDOM from 'react-dom';
import autobind from 'autobind-decorator';

@autobind
/**
 * Party Select Component
 *
 * @class FuckOff
 * @extends React.Component
 */
class FuckOff extends React.Component {


    /**
     * Renders FuckOff component to the DOM
     *
     * @method render
     * @return {object} FuckOff component markup
     */
    render() {

        return (
            <div className="fuckOff-finger"><img src="/web/images/finger.png" alt="flipping the mother-fucking bird"/></div>
        )
    }
};

export default FuckOff;
