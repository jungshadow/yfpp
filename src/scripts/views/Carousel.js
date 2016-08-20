class Carousel {
    constructor( element ) {

        this.currentSlide = 0;
        this.carouselLength = null;

        this.init();
    }

    init() {
        this.createChildren();
        this.setUpHandlers();
        this.enable();
    }

    hasClass( el, className ) {
        if ( el.classList )
            return el.classList.contains( className )
        else
            return !!el.className.match( new RegExp( '(\\s|^)' + className + '(\\s|$)' ) )
    }

    addClass( el, className ) {
        if ( el.classList )
            el.classList.add( className )
        else if ( !hasClass( el, className ) ) el.className += " " + className
    }

removeClass( el, className ) {
    if ( el.classList )
        el.classList.remove( className )
    else if ( hasClass( el, className ) ) {
        var reg = new RegExp( '(\\s|^)' + className + '(\\s|$)' )
        el.className = el.className.replace( reg, ' ' )
    }
}

createChildren() {
    this.carousel = document.getElementsByClassName( 'js-carousel' );
    this.slides = this.carousel[0].getElementsByClassName( 'carousel-slides-slide' );
    this.carouselNav = document.getElementsByClassName( 'js-carouselNav' );
    this.carouselNavLinks = this.carouselNav[0].getElementsByClassName('js-carouselNav-link');
    this.carouselPrev = this.carousel[0].getElementsByClassName('js-carouselPrev');
    this.carouselNext = this.carousel[0].getElementsByClassName('js-carouselNext');
}

setUpHandlers() {
    this.onNavClickHandler = this.onNavClick.bind(this); 
    this.onNextSlideClickHandler = this.onNextSlideClick.bind(this);        
    this.onPrevSlideClickHandler = this.onPrevSlideClick.bind(this);     
}

enable() {
    this.carouselNav[0].addEventListener('click', this.onNavClickHandler);
    this.carouselNext[0].addEventListener('click', this.onNextSlideClickHandler);
    this.carouselPrev[0].addEventListener('click', this.onPrevSlideClickHandler);

    this.carouselLength = this.slides.length;
}

gotoSlide( slideIndex ) {

    this.removeClass(this.slides[this.currentSlide], 'isActive');
    this.addClass(this.slides[slideIndex], 'isActive');

    this.currentSlide = slideIndex;
}

onNextSlideClick() {        

    let nextSlide = this.currentSlide + 1;

        // if the next slide doesn't exist we need to go to the first one
        // subtracting 1 to account for zero based index
        // if current slide count is greater than length of carousel, set current slide to first slide
        if (nextSlide > this.carouselLength -1) {
            nextSlide = 0;
        }

        console.log('next', nextSlide);

        this.gotoSlide(nextSlide);

        
    }

    onPrevSlideClick() {        

        let prevSlide = this.currentSlide - 1;

        console.log(prevSlide);

        // if the prev slide doesn't exist we need to go to the last one
        // subtracting 1 to account for zero based index
        // if current slide count is greater than length of carousel, set current slide to last slide
        if (prevSlide < 0) {
            prevSlide = this.carouselLength -1;
        }


        this.gotoSlide(prevSlide);

        
    }

    onNavClick(e) {

        // setting up event delegation for carousel nav links
        if ( e.target.classList[ 0 ] === 'js-carouselNav-link' ) {

            // map click to the corresponding index value
            Object.keys( this.carouselNavLinks )
            .map(
                index => {
                    if ( e.target === this.carouselNavLinks[ index ] ) {

                        this.gotoSlide(index);
                    }
                } 
                )
        }


        

    }
}
export default Carousel;

