// Фотоальбом
// Ваш класс должен преобразовать html, чтобы вид был как на видео.
// При наведении на на маленькую картинку, она отображается в большом размере.
// Делаем в ES2015 синтаксисе

class Album{
    constructor(element){
        this.element = element;
        this.init();
    }

    init() {
        this.element.classList.add('album-container');
        this.element.addEventListener('mouseover', this.onMouseOver.bind(this));
        this.imageWrapper = document.createElement('li');
        this.imageWrapper.classList.add('active');
        this.element.appendChild(this.imageWrapper);
    }

    onMouseOver(event) {    
        const shouldIgnore = event.target.parentNode.classList.contains('active');
        
        if (event.target.tagName === 'IMG' && !shouldIgnore) {  
           const contentSrc = event.target.getAttribute('src');
           this.render(contentSrc);
        }
    }

    render(contentSrc){
        const image = document.createElement('img');
        image.setAttribute('src', contentSrc);
        const child = this.imageWrapper.childNodes[0];

        if (child) {
            this.imageWrapper.replaceChild(image, child);  
        } else {
            this.imageWrapper.appendChild(image);
        }
    }
}


const album = new Album(document.getElementById('album-container'));




