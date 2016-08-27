import Hammerjs from 'hammerjs';
/**
 *
 * Carousel Constructor
 *
 * @parameter
 */
class Carousel {
    constructor(element) {

        this.currentSlide = 0;
        this.carouselLength = '';
        this.slideWidth = '';

        this.init();
    }

    init() {
        this.createChildren();
        this.setUpHandlers();
        this.enable();
    }

    hasClass(el, className) {
        if (el.classList)
            return el.classList.contains(className)
        else
            return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
    }

    addClass(el, className) {
        if (el.classList)
            el.classList.add(className)
        else if (!hasClass(el, className)) el.className += " " + className
    }

    removeClass(el, className) {
        if (el.classList)
            el.classList.remove(className)
        else if (hasClass(el, className)) {
            var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
            el.className = el.className.replace(reg, ' ')
        }
    }

    createChildren() {
        this.carousel = $('.js-carousel');
        this.slideContainer = this.carousel.find('.carousel-inner-slides');
        this.slides = this.carousel.find('.carousel-inner-slides-slide');
        this.carouselNav = $('.js-carouselNav');
        this.carouselNavLinks = this.carouselNav.find('.js-carouselNav-link');
        this.carouselPrev = this.carousel.find('.js-carouselPrev');
        this.carouselNext = this.carousel.find('.js-carouselNext');
        this.hammer = new Hammerjs(this.slideContainer[0]);
    }

    setUpHandlers() {
        this.onNavClickHandler = this.onNavClick.bind(this);
        this.onNextSlideClickHandler = this.onNextSlideClick.bind(this);
        this.onPrevSlideClickHandler = this.onPrevSlideClick.bind(this);
        this.onSwipeHandler = this.onSwipe.bind(this);
    }

    enable() {
        this.carouselNavLinks.on('click', this.onNavClickHandler);
        this.carouselNext.on('click', this.onNextSlideClickHandler);
        this.carouselPrev.on('click', this.onPrevSlideClickHandler);
        this.hammer.on('swipe', this.onSwipeHandler);

        this.carouselWidth = this.slides.length * 100;
        this.carouselLength = this.slides.length;
        this.setCarouselWidth(this.carouselWidth);

        this.setSlideWidth(this.carouselLength, 100 / this.carouselLength);
    }

    setCarouselWidth(carouselWidth) {

        this.slideContainer.css('width', carouselWidth + '%');

    }

    setSlideWidth(carouselLength, slideWidth) {

        this.slideWidth = slideWidth;

        let i = 0;

        for (; i < carouselLength; i++) {

            this.slides[i].style.width = this.slideWidth + '%';
        }


    }

    gotoSlide(slideIndex) {


        this.removeClass(this.slides[this.currentSlide], 'isActive');
        this.addClass(this.slides[slideIndex], 'isActive');

        let translateVal = 'translateX(-' + (this.slideWidth * slideIndex) + '%)';

        this.slideContainer.css('transform', translateVal);

        this.currentSlide = parseInt(slideIndex);

    }

    onNextSlideClick() {

        let nextSlide = this.currentSlide + 1;

        console.log(this.currentSlide, nextSlide);

        // if the next slide doesn't exist we need to go to the first one
        // subtracting 1 to account for zero based index
        // if current slide count is greater than length of carousel, set current slide to first slide
        if (nextSlide > this.carouselLength - 1) {
            nextSlide = 0;
        }

        this.gotoSlide(nextSlide);


    }

    onPrevSlideClick() {

        let prevSlide = this.currentSlide - 1;

        // if the prev slide doesn't exist we need to go to the last one
        // subtracting 1 to account for zero based index
        // if current slide count is greater than length of carousel, set current slide to last slide
        if (prevSlide < 0) {
            prevSlide = this.carouselLength - 1;
        }


        this.gotoSlide(prevSlide);


    }

    onSwipe(e) {

        const swipeLft = 2;
        const swipeRgt = 4;

        if (e.direction === swipeRgt) {

            this.onPrevSlideClick();

        } else if (e.direction === swipeLft) {

            this.onNextSlideClick();

        }
    }

    onNavClick(e) {
            

            // map click to the corresponding index value
            Object.keys(this.carouselNavLinks).map(
                index => {

                    if (e.target === this.carouselNavLinks[index]) {

                        this.gotoSlide(index);

                    }
                }
            )

    }
}
export default Carousel;
