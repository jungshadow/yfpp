// Import dependencies 
import React from 'react';
import ReactDOM from 'react-dom';


/**
 * Footer Component
 *
 * @class Footer
 * @extends React.Component
 */
class Footer extends React.Component {

    onClickHandler(e) {

        this.props.onPrivacyClickHandler();
    }

    /**
     * Renders Footer 
     *
     * @method render
     * @return {object} footer component markup
     */
    render() {

        return (
            
            <footer className="footer">
                <div className="wrapper wrapper_large">
                    <h3 className="hdg hdg_1 mix-hdg_light mix-hdg_uppercase mix-hdg_headline mix-hdg_centered">This Shit Was Made By These Motherfuckers</h3>
                    <i className="icon icon_star-full mix-icon_centered mix-icon_hr"></i>
                    <div className="team">
                        <ul className="blocks blocks_2upSM blocks_4upMD blocks_6up">
                            <li>
                                <div className="txtCenter">
                                    <h4 className="hdg hdg_ mix-hdg_block mix-hdg_medium mix-hdg_headline">Mo Maraqa</h4>
                                    <a className="mix-a_reversed mix-txt_medium twitter-follow-button" target="_blank" href="https://twitter.com/momaraqa" data-show-count="false">@momaraqa</a>
                                </div>
                            </li>
                            <li>
                                <div className="txtCenter">
                                    <h4 className="hdg hdg_3 mix-hdg_medium mix-hdg_headline mix-hdg_block">Jared Marcotte</h4>
                                    <a className="mix-a_reversed mix-txt_medium twitter-follow-button" target="_blank" href="https://twitter.com/jungshadow" data-show-count="false">@jungshadow</a>
                                </div>
                            </li>
                            <li>
                                <div className="txtCenter">
                                    <h4 className="hdg hdg_3 mix-hdg_medium mix-hdg_headline mix-hdg_block">Jay johnson</h4>
                                    <a className="mix-a_reversed mix-txt_medium twitter-follow-button" target="_blank" href="https://twitter.com/sixbcreative" data-show-count="false">@sixbcreative</a>
                                </div>
                            </li>
                            <li>
                                <div className="txtCenter">
                                    <h4 className="hdg hdg_3 mix-hdg_medium mix-hdg_headline mix-hdg_block">Nick catalano</h4>
                                    <a className="mix-a_reversed mix-txt_medium twitter-follow-button" target="_blank" href="https://twitter.com/NickCatal" data-show-count="false">@NickCatal</a>
                                </div>
                            </li>
                            <li>
                                <div className="txtCenter">
                                    <h4 className="hdg hdg_3 mix-hdg_medium mix-hdg_headline mix-hdg_block">Anastasia Golovashkina</h4>
                                    <a className="mix-a_reversed mix-txt_medium twitter-follow-button" target="_blank" href="https://twitter.com/golovashkina" data-show-count="false">@golovashkina</a>
                                </div>
                            </li>
                            <li>
                                <div className="txtCenter">
                                    <h4 className="hdg hdg_3 mix-hdg_medium mix-hdg_headline mix-hdg_block">Josh Turner</h4>
                                    <a className="mix-a_reversed mix-txt_medium twitter-follow-button" target="_blank" href="https://twitter.com/joshualturner" data-show-count="false">@joshualturner</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <i className="icon icon_star-full mix-icon_centered mix-icon_hr"></i>

                    <section className="privacy-info txtCenter">
                        <p className="txt mix-txt_light mix-txt_medium mix-txt_medium_p">Hey fuckface, read the fucking <a className="mix-a_reversed" href="#" onClick={this.onClickHandler.bind(this)}>privacy policy</a>.</p>
                        <p className="txt mix-txt_light mix-txt_medium mix-txt_centered mix-txt_medium_p">Data via the <a className="mix-a_reversed" href="https://developers.google.com/civic-information/" target="_blank">Google Civic Information API</a>. Use of this site also binds you to the <a className="mix-a_reversed" href="https://www.google.com/intl/en/policies/terms/" target="_blank">Google Terms of Use.</a></p>
                        <p className="txt mix-txt_light mix-txt_medium mix-txt_medium_p">Data from states that do not provide direct feeds only include addresses with registered voters</p>
                        <p className="txt mix-txt_light mix-txt_medium mix-txt_medium_p">Election officials sometimes revise data in the last few days before an election. Check back on Election Day for the latest information.</p>
                    </section>
                </div>
            </footer>
            
            )
    }

};

export default Footer;
