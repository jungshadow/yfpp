import Hammerjs from 'hammerjs';
import $ from 'jquery';
/**
 *
 * Carousel Constructor
 *
 * @parameter 
 */
 class Carousel {

    constructor(element) {

        /**
         * tracks whether component is enabled or not
         * @property
         * @type {Boolean}
         * @default false
         */
        this.isEnabled = false;

        /**
         * Current slide index value
         * @property
         * @type {Number}
         * @default 0
         */
        this.currentSlide = 0;

        /**
         * Carousel length - total number of slides
         * @property
         * @type {number}
         * @default null
         */
        this.carouselLength = null;

        /**
         * Individual slide's width
         * @property
         * @type {number}
         * @default null
         */
        this.slideWidth = null;

        this.init();
    }


    /**
     * Initializes the Carousel View.
     * Runs a single _setupHandlers call, followed by _createChildren .
     * Exits early if it is already initialized.
     *
     * @method init
     */
     init() {
        this._createChildren();
        this._setUpHandlers()
        this._layout()
        this.enable();
    }

    /**
     * Helper function to determine whether an element has a certain class or not
     * @param  {object}  el        DOM element
     * @param  {string}  className Class name to check for
     * @return {Boolean}           True if has class | False if not
     */
     hasClass(el, className) {

        if (el.classList)
            return el.classList.contains(className)
        else
            return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
    }

    /**
     * Helper function to add class name to element
     * @param {object} el        DOM element
     * @param {[type]} className Class Name to add
     */
     addClass(el, className) {
        if (el.classList)
            el.classList.add(className)
        else if (!hasClass(el, className)) el.className += " " + className
    }

    /**
     * Helper function to remove class name from element
     * @param {object} el        DOM element
     * @param {[type]} className Class Name to remove
     */
     removeClass(el, className) {
        if (el.classList)
            el.classList.remove(className)
        else if (hasClass(el, className)) {
            var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
            el.className = el.className.replace(reg, ' ')
        }
    }

    /**
     * Create any child objects or references to DOM elements.
     * Should only be run on initialization of the view.
     *
     * @method _createChildren
     * @returns {Carousel}
     * @private
     */
     _createChildren() {
        this.carousel = $('.js-carousel');
        this.slideContainer = this.carousel.find('.carousel-inner-slides');
        this.slides = this.carousel.find('.carousel-inner-slides-slide');
        this.carouselNav = $('.js-carouselNav');
        this.carouselNavLinks = $('.js-carouselNav-link');
        this.carouselPrev = this.carousel.find('.js-carouselPrev');
        this.carouselNext = this.carousel.find('.js-carouselNext');
        this.hammer = new Hammerjs(this.slideContainer[0]);

        return this;        
    }

    /**
     * Binds the scope of any handler functions.
     * Should only be run on initialization of the view.
     *
     * @method _setupHandlers
     * @returns {Carousel}
     * @private
     */
     _setUpHandlers() {
        this.onNavClickHandler = this._onNavClick.bind(this);
        this.onNextSlideClickHandler = this._onNextSlideClick.bind(this);
        this.onPrevSlideClickHandler = this._onPrevSlideClick.bind(this);
        this.onSwipeHandler = this._onSwipe.bind(this);

        return this;
    }

    /**
     * Enables the component.
     * Performs any event binding to handlers.
     * Exits early if it is already enabled.
     *
     * @method enable
     * @returns {Carousel}
     * @public
     */
     enable() {

        if (this.isEnabled) {
            return this;
        }

        this.isEnabled = true;

        this.carouselNavLinks.on('click', this.onNavClickHandler);
        this.carouselNext.on('click', this.onNextSlideClickHandler);
        this.carouselPrev.on('click', this.onPrevSlideClickHandler);
        this.hammer.on('swipe', this.onSwipeHandler);


        return this;
    }

    /**
     * Performs measurements and calculations to set up
     * necessary carousel component widths
     *
     * @method _layout
     * @return {Carousel}
     * @private
     */
    _layout() {
        this.carouselWidth = this.slides.length * 100;
        this.carouselLength = this.slides.length;
        
        this._setCarouselWidth(this.carouselWidth);

        this._setSlideWidth(this.carouselLength);

        return this;
    }

    /**
     * Sets carousel container width
     * should be run once when view is initialized
     * 
     * @method _setCarouselWidth
     * @param {string} carouselWidth string representing width of carousel
     * @private
     */
     _setCarouselWidth(carouselWidth) {

        this.slideContainer.css('width', carouselWidth + '%');

    }

    /**
     * Sets width of slides based on container width divided by number of slides
     * should be run once when view is initialized
     *
     * @method _setSlideWidth
     * @param {number} carouselLength number of slides in carousel
     * @private
     */
     _setSlideWidth(carouselLength) {

        this.slideWidth = 100 / carouselLength;

        let i = 0;

        for (; i < carouselLength; i++) {

            this.slides[i].style.width = this.slideWidth + '%';
        }

    }

    /**
     * Navigates carousel to specific slide index
     *
     * @method gotoSlide
     * @param  {number} slideIndex index value of slide
     * @return {Carousel}
     * @public
     */
     gotoSlide(slideIndex) {

        this.removeClass(this.slides[this.currentSlide], 'isActive');
        this.addClass(this.slides[slideIndex], 'isActive');

        let translateVal = 'translate3d(-' + (this.slideWidth * slideIndex) + '%, 0, 0)';

        this.slideContainer.css('transform', translateVal);

        this.currentSlide = parseInt(slideIndex);

        return this;

    }

    /**
     * Next slide direction nav event
     *
     * @method _onNextSlideClick
     * @return {Carousel}
     * @private
     */
     _onNextSlideClick() {

        let nextSlide = this.currentSlide + 1;

        // if the next slide doesn't exist we need to go to the first one
        // subtracting 1 to account for zero based index
        // if current slide count is greater than length of carousel, set current slide to first slide
        if (nextSlide > this.carouselLength - 1) {
            nextSlide = 0;
        }

        this.gotoSlide(nextSlide);


    }

    /**
     * Previous slide direction nav event
     *
     * @method _onPrevSlideClick
     * @return {Carousel}
     * @private
     */   
     _onPrevSlideClick() {

        let prevSlide = this.currentSlide - 1;

        // if the prev slide doesn't exist we need to go to the last one            
        // subtracting 1 to account for zero based index
        // if current slide count is greater than length of carousel, set current slide to last slide
        if (prevSlide < 0) {
            prevSlide = this.carouselLength - 1;
        }

        this.gotoSlide(prevSlide);

    }

    /**
     * Swipe nav event
     * Handles swipe events for both next and previous nav
     * Uses Hammer.js to detect swipes
     *
     * @method _onSwipe
     * @return {Carousel}
     * @private
     */
     _onSwipe(e) {

        // sets up readable variables for swipe direction
        const swipeLft = 2;
        const swipeRgt = 4;

        // if swipe is right, call onPrevSlideClick()
        // if swipe is left, call onNextSlideClick() 
        if (e.direction === swipeRgt) {

            this._onPrevSlideClick();

        } else if (e.direction === swipeLft) {

            this._onNextSlideClick();

        }

        return this;
    }

    /**
     * Carousel navigation click event
     * Handles clicks from external carousel navigation
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
     _onNavClick(e) {

        let anchorLink = e.currentTarget.getAttribute('href').replace(/#/, '');

        const slideCount = this.slides.length

        let i = 0;

        for(; i< slideCount; i++) {

            if(this.slides[i].getAttribute('id') === anchorLink) {

                this.gotoSlide(i);

                return;
            };
        }


    }
}
export default Carousel;
