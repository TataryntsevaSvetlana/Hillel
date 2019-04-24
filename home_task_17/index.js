// Tabset
// Реализовать класс Tabset. Все элементы с классом "tabset-heading" должны стать табами.
// При клике на какой-нибудь таб, показывается соответствующий боди.
// Одновременно отображается только один боди
// При инициализации показывается самый первый элемент
// Активная таба тоже должна как-то выделяться, чтобы было понятно что активна именно она.
// Нужно также реализовать методы show, prev, next, с помощью которых можно будет управлять табами.

class Tabset{
    constructor(element){
        this.element = element;
        this.init();
    }

    init() {
        this.activeElement = this.element.children[0]
        this.openElement(this.activeElement);
        this.element.classList.add('tabset-container');
        this.element.addEventListener('click', (e) => this.onContainerClick(e));
    }

    onContainerClick(e) {
        if (e.target.classList.contains('tabset-heading')) {
            this.toggleElement(e.target.parentNode);
        } 
    }

    toggleElement(element) {
        this.activeElement = element;

        if (element.classList.contains('open') && this.activeElement !== element) {
            this.closeElement(element);
        } else {
            Array.prototype.forEach.call(this.element.children, this.closeElement);
            this.openElement(element);
        }
    }

    show(n) {
        this.toggleElement(this.element.children[n]);
    }

    next() {
        const nextSibling = this.activeElement.nextElementSibling;
        
        if (nextSibling) {
            this.toggleElement();    
        }
    }

    prev() {
        const prevSibling = this.activeElement.previousElementSibling;
        
        if (prevSibling) {
            this.toggleElement();    
        }
    }

    closeElement(element){
        element.classList.remove('open');
    }

    openElement(element){
        if (!element.classList.contains('open') ) {
            element.classList.add('open');
        } 
    }
}

const tabs = new Tabset(
    document.getElementById('container')
);






