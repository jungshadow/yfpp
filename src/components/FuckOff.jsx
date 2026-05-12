// Import dependencies
import React from 'react';
import finger from '../images/finger.png';
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
            <div className="fuckOff-finger">
                <img src={finger} alt="flipping the mother-fucking bird" />
            </div>
        );
    }
}

export default FuckOff;
