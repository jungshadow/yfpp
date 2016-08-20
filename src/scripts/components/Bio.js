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

        return (

            <li className="carousel-slides-slide">
                <div className="bio">
                    <div className="bio-img">
                        <img src={bioData.image} alt="" />
                        <div className="bio-img-social">
                            <ul className="vList vList_sm">
                                <li>
                                    <i className="icon icon_twitter mix-icon_md"></i>
                                    <span>@username</span>
                                </li>
                                <li>
                                    <i className="icon icon_link mix-icon_md"></i>
                                    <span>user@website.com</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="bio-bd">
                        <div className="group group_sm">
                            <div className="group-hd">
                                <h3 className="hdg hdg_1 mix-hdg_headline mix-hdg_uppercase mix-hdg_light">{bioData.name}</h3>
                                <div className="txt txt_headline">{bioData.title}</div>
                            </div>
                            <div className="group-bd">
                                <p>{bioData.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </li>

                    
        )
    }

};

export default Bios;
