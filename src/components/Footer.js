// Import dependencies
import React from 'react';
import moMaraqa from '../images/bios/mo-maraqa.jpg';
import joshTurner from '../images/bios/josh-turner.jpg';
import jaredMarcotte from '../images/bios/jared-marcotte.jpg';
import jayJohnson from '../images/bios/jay-johnson.jpg';
import nickCatalano from '../images/bios/nick-catalano.jpg';
import anastasiaGolovashkina from '../images/bios/anastasia-golovashkina.jpg';
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
            <footer id="footer" className="footer">
                <div className="wrapper wrapper_large">
                    <h3 className="hdg hdg_1 mix-hdg_light mix-hdg_uppercase mix-hdg_headline mix-hdg_centered">This Shit Was Made By These Motherfuckers</h3>{' '}
                    <i className="icon icon_star-full mix-icon_centered mix-icon_hr" />
                    <div className="team">
                        <ul className="blocks blocks_2upSM blocks_4upMD blocks_6up js-carouselNav">
                            <li>
                                <div className="group group_sm">
                                    <div>
                                        <a href="#mo" className="txtBtn js-carouselNav-link" onClick={this.props.onModalClickHandler.bind(this)}>
                                            <div className="group group_md">
                                                <div className="group-img">
                                                    {' '}
                                                    <img className="imgSize imgSize_sm" src={moMaraqa} alt="Mo Maraqa" />{' '}
                                                </div>
                                                <div className="group-txt">Mo Maraqa</div>
                                            </div>
                                        </a>
                                    </div>
                                    <div>
                                        <a
                                            className="mix-a_reversed mix-txt_medium twitter-follow-button"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            href="https://twitter.com/momaraqa"
                                            data-show-count="false"
                                        >
                                            @momaraqa
                                        </a>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="group group_sm">
                                    <div>
                                        <a href="#jared" className="txtBtn js-carouselNav-link" onClick={this.props.onModalClickHandler.bind(this)}>
                                            <div className="group group_md">
                                                <div className="group-img">
                                                    {' '}
                                                    <img className="imgSize imgSize_sm" src={jaredMarcotte} alt="Jared Marcotte" />{' '}
                                                </div>
                                                <div className="group-txt">Jared Marcotte</div>
                                            </div>
                                        </a>
                                    </div>
                                    <div>
                                        <a
                                            className="mix-a_reversed mix-txt_medium twitter-follow-button"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            href="https://twitter.com/jungshadow"
                                            data-show-count="false"
                                        >
                                            @jungshadow
                                        </a>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="group group_sm">
                                    <div>
                                        <a href="#jay" className="txtBtn js-carouselNav-link" onClick={this.props.onModalClickHandler.bind(this)}>
                                            <div className="group group_md">
                                                <div className="group-img">
                                                    {' '}
                                                    <img className="imgSize imgSize_sm" src={jayJohnson} alt="Jay Johnson" />{' '}
                                                </div>
                                                <div className="group-txt">Jay Johnson</div>
                                            </div>
                                        </a>
                                    </div>
                                    <div>
                                        <a
                                            className="mix-a_reversed mix-txt_medium twitter-follow-button"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            href="https://twitter.com/sixbcreative"
                                            data-show-count="false"
                                        >
                                            @sixbcreative
                                        </a>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="group group_sm">
                                    <div>
                                        <a href="#nick" className="txtBtn js-carouselNav-link" onClick={this.props.onModalClickHandler.bind(this)}>
                                            <div className="group group_md">
                                                <div className="group-img">
                                                    {' '}
                                                    <img className="imgSize imgSize_sm" src={nickCatalano} alt="Nick Catalano" />{' '}
                                                </div>
                                                <div className="group-txt">Nick Catalano</div>
                                            </div>
                                        </a>
                                    </div>
                                    <div>
                                        <a
                                            className="mix-a_reversed mix-txt_medium twitter-follow-button"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            href="https://twitter.com/NickCatal"
                                            data-show-count="false"
                                        >
                                            @NickCatal
                                        </a>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="group group_sm">
                                    <div>
                                        <a href="#anastasia" className="txtBtn js-carouselNav-link" onClick={this.props.onModalClickHandler.bind(this)}>
                                            <div className="group group_md">
                                                <div className="group-img">
                                                    {' '}
                                                    <img className="imgSize imgSize_sm" src={anastasiaGolovashkina} alt="Anastasia Golovashkina" />{' '}
                                                </div>
                                                <div className="group-txt">Anastasia Golovashkina</div>
                                            </div>
                                        </a>
                                    </div>
                                    <div>
                                        <a
                                            className="mix-a_reversed mix-txt_medium twitter-follow-button"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            href="https://twitter.com/golovashkina"
                                            data-show-count="false"
                                        >
                                            @golovashkina
                                        </a>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="group group_sm">
                                    <div>
                                        <a href="#josh" className="txtBtn js-carouselNav-link" onClick={this.props.onModalClickHandler.bind(this)}>
                                            <div className="group group_md">
                                                <div className="group-img">
                                                    {' '}
                                                    <img className="imgSize imgSize_sm" src={joshTurner} alt="Josh Turner" />{' '}
                                                </div>
                                                <div className="group-txt">Josh Turner</div>
                                            </div>
                                        </a>
                                    </div>
                                    <div>
                                        <a
                                            className="mix-a_reversed mix-txt_medium twitter-follow-button"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            href="https://twitter.com/joshualturner"
                                            data-show-count="false"
                                        >
                                            @joshualturner
                                        </a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>{' '}
                    <i className="icon icon_star-full mix-icon_centered mix-icon_hr" />
                    <div className="group mix-group_wide">
                        <section className="group-hd mix-group_txtCtr">
                            <div className="fb-shit">
                                <div
                                    className="fb-like"
                                    data-href="http://yourfuckingpollingplace.com/"
                                    data-send="false"
                                    data-layout="box_count"
                                    data-width="50"
                                    data-show-faces="true"
                                    data-colorscheme="light"
                                >
                                    {' '}
                                </div>
                            </div>
                        </section>
                        <section className="group-bd">
                            <div className="userContent userContent_reversedSofter mix-userContent_md mix-userContent_ctr">
                                <p>
                                    Hey fuckface, read the fucking
                                    <button type="button" onClick={this.onClickHandler.bind(this)}>
                                        {' '}
                                        privacy policy
                                    </button>
                                    .
                                </p>
                                <p>
                                    Data via the{' '}
                                    <a href="https://developers.google.com/civic-information/" target="_blank" rel="noopener noreferrer">
                                        Google Civic Information API
                                    </a>
                                    . Use of this site also binds you to the{' '}
                                    <a href="https://www.google.com/intl/en/policies/terms/" target="_blank" rel="noopener noreferrer">
                                        Google Terms of Use
                                    </a>
                                    .
                                </p>
                                <p>Data from states that do not provide direct feeds only include addresses with registered voters</p>
                                <p>Election officials sometimes revise data in the last few days before an election. Check back on Election Day for the latest information.</p>
                            </div>
                        </section>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;
