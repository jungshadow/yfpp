// Import dependencies
import React from 'react';
import ReactDOM from 'react-dom';

/**
 * Bios Component
 *
 * @class Bios
 * @extends React.Component
 */
class Bios extends React.Component {

    /**
     * Renders individual bio
     *
     * @method render
     * @return {object} Bio component markup
     */
    render() {

        const bioData = this.props.bio;

        let anchorId = bioData.firstname.toLowerCase();

        return (

            <li id={anchorId} className="carousel-inner-slides-slide">
                <div className="bio">
                    <div className="bio-img">
                        <img src={bioData.image} alt={bioData.firstname + ' ' + bioData.lastname + ' head shot'} />
                        <div className="bio-img-social">
                            <ul className="vList vList_sm">
                                <li>
                                    <a className="mix-a_reversed mix-txt_medium twitter-follow-button" target="_blank" href={bioData.twitter} data-show-count="false">{bioData.twitter}</a>
                                </li>
                                <li>
                                    <a href={bioData.linkedIn} className="iconLink">
                                        <span className="iconLink-icon">
                                            <i className="icon icon_linkedin mix-icon_sm"></i>
                                        </span>
                                        <span className="iconLink-txt">connect</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="bio-bd">
                        <div className="group group_md">
                            <div className="group-hd">
                            <h4 className="hdg hdg_2 mix-hdg_headline mix-hdg_uppercase mix-hdg_light">{bioData.firstname} {bioData.nickname ? <span className="txt txt_headline mix-txt_lgtBlue">{'\"' + bioData.nickname + '\"'}</span> : '' } {bioData.lastname}</h4>
                                <div className="txt txt_headline mix-txt_grey">{bioData.title}</div>
                            </div>
                            <div className="group-bd">
                                <div className="userContent userContent_reversedSoft">
                                    <p dangerouslySetInnerHTML={ {__html: bioData.description} } />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </li>


        )
    }

};

export default Bios;
