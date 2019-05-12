
// Contact list студентов
// Реализовать такой же контакт-лист, который мы делали для ДЗ№10
// Но:
// 1) ввести слой с данными, также как мы хранили tasks на лекции
// 2) Все данные получать/сохранять на сервере
// 3) Используем функциональный подход
// 4) Для отправке запросов используйте fetch
// 5) Не забудьте про хедеры
// 6) при клике меняем свойство is_active у соответствующего контакта. 
// Не активный контакт должен как-то выделяться
// 7) По возможности реализовать удаление

const DATA_URL = 'http://fep-app.herokuapp.com/api/contacts';

const addContactBtn = document.getElementById('addContactBtn');
const contactsList = document.getElementById('contactsList');
const contactNameInput = document.getElementById('nameInput');
const contactPhoneInput = document.getElementById('phoneInput');
const contactSurnameInput = document.getElementById('surnameInput');
const contactTemplate = document.getElementById('contactTemplate').innerHTML;

let contacts = [];
init();

function init(){
    addContactBtn.addEventListener('click', onAddContactBtnClick);
    contactsList.addEventListener('click', onTableBodyClick);

    fetchData();
}

function fetchData(){
   return fetch(DATA_URL)
            .then((resp) => resp.json())
            .then(setData)
            .then(renderData)
};

function setData(data){
    contacts = data;
    return contacts;
}

function renderData(data){
    console.log(data);
    document.getElementById('contactsList').innerHTML = data.map((el) => {
        const info = contactTemplate
            .replace('{{Name}}', el.name)
            .replace('{{Surname}}', el.surname)
            .replace('{{Phone}}', el.phone)
            .replace('{{Id}}', el.id)

        return `
            <tr 
                data-id = ${el.id}
                class = ${el.is_active ? 'active' : ''}
            >${info}</tr>`
    }).join('\n');
}

function onAddContactBtnClick(){
    submitContact();
};

function submitContact(){
    const contact = {
        name: contactNameInput.value,
        surname: contactSurnameInput.value,
        phone: contactPhoneInput.value,
        is_active: true,
        id: Date.now()
    };
    
    addContact(contact)
        .then(fetchData);
    
    resetContactForm();
};

function resetContactForm(){
    contactNameInput.value = '';
    contactSurnameInput.value = '';
    contactPhoneInput.value = '';
};

function addContact(contact){
   return fetch(DATA_URL, {
       method: 'POST',
       body: JSON.stringify(contact)
   })
};

function onTableBodyClick(event){
    if (event.target.tagName === 'BUTTON') {
        deleteContact(event.target.attributes['contact-id'].value)
            .then(fetchData);
    } else {
        toggleState(event.target)
            .then(fetchData);
    }
};

function deleteContact(contactId){
    return fetch(DATA_URL + '/' + contactId, {
        method: 'DELETE',
    })
};

function toggleState(el){
    const id = el.parentElement.dataset.id;
    const contact = contacts.find(el => el.id === id);
    contact.is_active = !contact.is_active

    return fetch(DATA_URL + '/' + contact.id, {
        method: 'PUT',
        body: JSON.stringify(contact)
    })
}