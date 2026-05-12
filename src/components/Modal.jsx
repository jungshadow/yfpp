// Import dependencies
import React from 'react';

/**
 * Active classname for modal container
 * @type {String}
 */
const ACTIVE_CLASS = 'isActive';
/**
 * Modal Component
 *
 * @class Modal
 * @extends React.Component
 */
class Modal extends React.Component {
    /**
     * Renders modal markup
     *
     * @method render
     * @return {object} Modal component markup
     */
    render() {
        // set up active classname for modal if modal is visible
        const activeClassName = this.props.showModal === true ? ACTIVE_CLASS : '';

        return (
            <div className={'modal modal_full ' + activeClassName} aria-hidden={!this.props.showModal} role="dialog">
                <div className="modal-inner">
                    <div className="modal-btn" onClick={this.props.onModalCloseHandler.bind(this)} aria-label="close">
                        <button className="iconBtn">
                            <span className="iconBtn-txt">Close</span>
                            <span className="iconBtn-icon">
                                <i className="icon icon_close mix-icon_light" />
                            </span>
                        </button>
                    </div>
                    <div className="modal-bd" role="document">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;
