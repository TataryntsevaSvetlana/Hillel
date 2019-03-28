// при клике на button в UL добавляется новый LI
// при клике на LI его фон меняется между красным и желтым
// но если при клике на LI была нажата кнопка ALT, этот LI должен быть удален.
// при удалении/добавлении, другие li не должны изменяться
// не забывайте про минимизацию манипуляций с ДОМом

function addNewListElement() {
    const listItem = document.createElement('li');
    listItem.innerHTML = 'Hi';
    unorderedList.appendChild(listItem);
}

function handleClick(event) {
    if (event.target.tagName === 'LI') {
        if (event.altKey) {
            deleteElement(event.target);
        } else {
            toggleBackground(event.target)
        }
    }
}

function toggleBackground(target) {
    target.style.background = event.target.style.background === 'red' ? 'yellow' : 'red';
};

function deleteElement(target) {
    target.remove();
};

const unorderedList = document.getElementsByTagName('ul')[0];
unorderedList.addEventListener('click', handleClick);

const button = document.getElementsByTagName('button')[0];
button.addEventListener('click', addNewListElement);




