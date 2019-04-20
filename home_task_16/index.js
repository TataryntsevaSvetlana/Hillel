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
        document.getElementById('album-list').addEventListener('mouseover', this.onMouseOver.bind(this));
    }

    onMouseOver(event) {    

        if (event.target.tagName === 'IMG') {
           const content = event.target.parentElement.innerHTML;
           this.render(content);
        }
    }

    render(content){
        const imageContainer = document.getElementById('album-container');
        const contentWrapper = document.createElement('div');
        contentWrapper.innerHTML = content;

        if (imageContainer.firstChild) {
            imageContainer.replaceChild(contentWrapper, imageContainer.childNodes[0]);  
        } else {
            imageContainer.appendChild(contentWrapper);
        }     
    }
}


const album = new Album(document.getElementById('album-wrapper'));




