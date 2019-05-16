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

    } else if (event.target.tagName === 'BUTTON' && event.target.value === 'edit'){ 
        renderEditForm(event.target.parentNode.parentNode);
    } else {
        showContactInfo(event.target.parentNode.parentNode.dataset.contactId)
            .then(fetchData(DATA_URL + '/' + contactId));
     }
};

function deleteContact(contactId){
    return fetch(DATA_URL + '/' + contactId, {
        method: 'DELETE',
    })
};

function updateContact(contact) {
    return fetch(DATA_URL + '/' + contact.id, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(contact)
    })
}

function showContactInfo(contactId){
    const popUp = document.getElementById('popUp');
    popUp.classList.add('activePopUp');
    const contact = findContact(contactId);
    return contact;
};


function createEditForm(){                                   
    const editForm = tfootTr.cloneNode(true);
    const saveButton = document.createElement('button');
    saveButton.classList.add('save');
    saveButton.textContent = 'Save';
    const td = document.createElement('td');
    td.appendChild(saveButton);
    editForm.appendChild(td);

    return editForm;
}

function renderEditForm(contactNode){   

    const contactId = contactNode.dataset.contactId;
    const editForm = createEditForm();
    const contact = findContact(contactId);
    const nameInput = editForm.querySelector('#nameInput');
    const surnameInput = editForm.querySelector('#surnameInput');
    const phoneInput = editForm.querySelector('#phoneInput');
    const saveButton = editForm.querySelector('button');

    saveButton.addEventListener('click', () => { updateContact({
        id: contactId,
        name: nameInput.value,
        surname: surnameInput.value,
        phone: phoneInput.value,
        email: contact.email,
        is_active: contact.is_active,
    }).then(() => { fetchData(); }) });

    nameInput.value = contact.name;
    surnameInput.value = contact.surname;
    phoneInput.value = contact.phone;

    contactNode.parentNode.insertBefore(editForm, contactNode.nextSibling);
};

function findContact(id) {
    const contact = contacts.find(el => el.id === id);
    console.dir(contact)
    return contact;
}