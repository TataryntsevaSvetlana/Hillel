// Галерея
// Написать класс фото галереи. в конструктор мы передаем элемент который нужно превратить в галерею. Вторым аргументом передаем конфигурацию.
// Галерея показывает одну фотку за раз. Периодически меняя его на следующую.
// Кроме того по бокам галерея добавляет кнопки, При нажатии на них, мы можем вручную переключить фото на следующее или предыдущее.
// Также нужно реализовать методы, которые можно будет вызывать в коде, для показа фото


class Gallery{
    constructor(element, config){
        this.element = element;
        this.slides = [...element.getElementsByTagName('li')];
        this.prevButton = document.getElementById('prev');
        this.nextButton = document.getElementById('next');
        this.config = config;
        this.init();
    }

    init() {
        this.activeSlide = this.slides[0];
        document.getElementById('prev').addEventListener('click', () => { this.onPrevClick()});
        document.getElementById('next').addEventListener('click', () => { this.onNextClick()});
        this.render(this.activeSlide);
        // this.showSlides();
    }

    showSlides() {
        setTimeout(() => {
            const nextSlide = this.getNextSlide();     
            this.render(nextSlide);
            this.showSlides();
         }, this.config.delay); 
    }

    show(index) {
        this.render(this.slides[index]);
    }
    onPrevClick() {
        const slide = this.getPrevSlide();
        this.render(slide);
    }

    onNextClick() {
        const slide = this.getNextSlide();
        this.render(slide);
    }

    getPrevSlide() {
        const indexOfActiveSlide = this.slides.indexOf(this.activeSlide);
        const lastSlide = this.slides[this.slides.length - 1];
        const prevSlide = this.slides[indexOfActiveSlide - 1];

        if (indexOfActiveSlide === 0) {
            return lastSlide;
        }

        return prevSlide;
    }

    getNextSlide() {
        const indexOfActiveSlide = this.slides.indexOf(this.activeSlide);
        const lastSlide = this.slides[this.slides.length - 1];
        const isLastSlideActive = this.activeSlide === lastSlide;
        const nextSlide = this.slides[indexOfActiveSlide + 1];
        
        if (isLastSlideActive) {
            return this.slides[0];
        } 
        
        return nextSlide;
    }
   
    deleteActiveState(element) {
        element.classList.remove('active');
    }

    addActiveState(element) {
         element.classList.add('active');
    }

    render(slide) {
        this.deleteActiveState(this.activeSlide);
        this.activeSlide = slide;
        this.addActiveState(this.activeSlide);
    }

}

const myGallery = new Gallery(
    document.getElementById('container'),
    { delay: 2000}
)


