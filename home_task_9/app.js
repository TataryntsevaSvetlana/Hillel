// при клике на button в UL добавляется новый LI
// при клике на LI его фон меняется между красным и желтым
// но если при клике на LI была нажата кнопка ALT, этот LI должен быть удален.
// при удалении/добавлении, другие li не должны изменяться
// не забывайте про минимизацию манипуляций с ДОМом

const unorderedList = document.getElementsByTagName('ul')[0];

function addNewListElement(event) {
    const listItem = document.createElement('li');
    listItem.innerHTML = 'Hi';
    unorderedList.appendChild(listItem);
}

unorderedList.addEventListener('click', handleClick);

function handleClick(event) {
    if (event.target.tagName === 'LI') {
        if (event.altKey) {
            deleteElement(event);
        } else {
            toggleBackground(event)
        }
    }
}

function toggleBackground(event) {
    event.target.style.background = event.target.style.background === 'red' ? 'yellow' : 'red';
};

function deleteElement(event) {
    event.target.remove();
};

const button = document.getElementsByTagName('button')[0];
button.addEventListener('click', addNewListElement);




