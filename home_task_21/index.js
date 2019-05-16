// Расширить Контакт лист:
// 1) добавить в каждую строку контакта кнопку Edit,
//  по клику на эту кнопку в текущей строке появляются инпуты, заполненые данными контакта,
//  и кнопка сохранить. Пользователь может что-то поменять и сохранить контакт.
//  Эти действия должны привести к обновлению данных на сервере.

// 2) убираем поведение, которое меняет значение is_active при клике по строке.
// Теперь при клике - мы должны показать модальное окно/попап, в котором будет инфо о контакте.
// Информацию о контакте мы должны получить с сервера по всем правилам RESTa.


const DATA_URL = 'http://fep-app.herokuapp.com/api/contacts';

const newContactForm = document.getElementById('newContactForm');
const contactsList = document.getElementById('contactsList');
const contactNameInput = document.getElementById('nameInput');
const contactPhoneInput = document.getElementById('phoneInput');
const contactSurnameInput = document.getElementById('surnameInput');
const contactTemplate = document.getElementById('contactTemplate').innerHTML;
const tfootTr = document.getElementsByTagName('tfoot')[0].children[0];
const saveButton = document.createElement('button');

let contacts = [];
init();

function init(){
    newContactForm.addEventListener('submit', newContactFormSubmit);
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
    return contacts = data;
}

function renderData(data){
    contactsList.innerHTML = data.map((el) => {

        return contactTemplate
            .replace('{{Name}}', el.name)
            .replace('{{Surname}}', el.surname)
            .replace('{{Phone}}', el.phone)
            .replace('{{Id}}', el.id)
            .replace('{{class}}', el.is_active ? 'active' : '')
    }).join('\n');
}

function newContactFormSubmit(event){
    event.preventDefault();

    submitContact();
};

function submitContact(){
    const contact = {
        name: contactNameInput.value,
        surname: contactSurnameInput.value,
        phone: contactPhoneInput.value,
        is_active: true,
    };
    
    addContact(contact).then(fetchData);
    
    resetContactForm();
};

function resetContactForm(){
    contactNameInput.value = '';
    contactSurnameInput.value = '';
    contactPhoneInput.value = '';
};

function addContact(contact){
   return fetch(DATA_URL, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(contact)
   })
};

function onTableBodyClick(event){
    if (event.target.tagName === 'BUTTON' && event.target.value === 'delete') {
        deleteContact(event.target.parentNode.parentNode.dataset.contactId)
            .then(fetchData);

    } else if (event.target.tagName === 'BUTTON' && event.target.value === 'edit'){ // обработчик на кнопку edit
        editContact(event.target.parentNode.parentNode.dataset.contactId)

        // .then(fetchData);


     } else {
        toggleState(event.target.parentNode.dataset.contactId)
            .then(fetchData);
    }
};

function deleteContact(contactId){
    return fetch(DATA_URL + '/' + contactId, {
        method: 'DELETE',
    })
};

function createForm(){                                   // клонирую строку с инпутами (из таблицы), добавляю кнопку сохранить
    const editForm = tfootTr.cloneNode();
    saveButton.classList.add('save');
    editForm.appendChild(saveButton);
    console.dir(editForm);
    return editForm;
}

function editContact(contactId){   // пытаюсь вставить склонированую строку с инпутами под строкой выбранного контакта
    
    createForm();
    const form = findElement(contactId);
    form.appendChild(editForm);
    console.dir(form);
};


function toggleState(id){
    findElement(id);
    contact.is_active = !contact.is_active;

    return fetch(DATA_URL + '/' + contact.id, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(contact)
    })
}

function findElement(id) {
    const contact = contacts.find(el => el.id === id);
    return contact;
}