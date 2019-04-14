// Accordeon
// Написать функцию конструктор Accordion
// классы можно использовать для определения хедеров и боди каждого элемента.
// Когда collapseOther: true при открытии одного элемента,
// все другие должны свернуться.
// Если он collapseOther: false - тогда все остальные остаются в прежнем состоянии.
// Также реализовать методы open, close, toggle,
//  в которые можно передать индекс элемента и соответственно изменить его состояние

function Accordion(el){
    this.el = el;
    el.addEventListener('click', this.onClick.bind(this));
}

Accordion.prototype.toggle = function(element) {
    if ([...element.classList].includes('hidden')) {
        if (this.openedElement) {
            this.openedElement.classList.add('hidden');
        }
        
        element.classList.remove('hidden');
        this.openedElement = element;
     } else {
        element.classList.add('hidden');
    }
}


Accordion.prototype.onClick = function(event) {
    if (event.target.className === 'accordeon-heading'){
      const children = [...event.target.parentNode.children];
      
      const elementBody = children
        .find((element) => [...element.classList]
        .includes('accordeon-body'));

      this.toggle(elementBody);
    }
}

const accordion = new Accordion(document.getElementById('container'));
