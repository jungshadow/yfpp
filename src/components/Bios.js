// Import dependencies
import React from 'react';

import Bio from './Bio';
import Carousel from '../views/Carousel';

/**
 * Bios Component
 *
 * @class Bios
 * @extends React.Component
 */
class Bios extends React.Component {
    constructor(props) {
        super(props);
        this.carousel = React.createRef();
        this.carouselController = null;
    }

    componentDidMount() {
        if (this.carousel) {
            this.carouselController = new Carousel(this.carousel.current);
        }
    }
    componentWillUnmount() {
        if (this.carouselController) {
            this.carouselController = null;
        }
    }

    buildBioList() {
        const BioData = require('./../models/bios.json');

        let bioList = [];

        let i = 0;

        for (; i < BioData.bios.length; i++) {
            bioList.push(<Bio key={i} bio={BioData.bios[i]} />);
        }

        return bioList;
    }

    /**
     * Renders option values for primary party select menu
     *
     * @method render
     * @return {object} Bios component markup
     */
    render() {
        return (
            <div className="carousel js-carousel" ref={this.carousel} role="region" aria-label="Team Biographies">
                <div className="carousel-inner">
                    <ul className="carousel-inner-slides">{this.buildBioList()}</ul>
                </div>
                <nav className="carousel-directionNav">
                    <button className="carsousel-directionNav-item carsousel-directionNav-item_prev js-carouselPrev">Prev</button>
                    <button className="carsousel-directionNav-item carsousel-directionNav-item_next js-carouselNext">Next</button>
                </nav>
            </div>
        );
    }
}

export default Bios;
