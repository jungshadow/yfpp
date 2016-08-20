// Import dependencies 
import React from 'react';
import ReactDOM from 'react-dom';

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

        const activeClassName = this.props.showModal === true ? ACTIVE_CLASS : '';

        console.log(this.props);

        return (
            <div className={'modal ' + activeClassName}>
                <div className="modal-inner">
                    <div className="modal-btn" onClick={this.props.onModalCloseHandler.bind(this)}>
                        <button className="iconBtn"><span className="iconBtn-txt">Close</span><span className="iconBtn-icon">
                            <i className="icon icon_close-icon mix-icon_light"></i></span></button>
                    </div>
                    <div className="modal-bd">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }

};

export default Modal;
