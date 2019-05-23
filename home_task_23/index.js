// Переделать список контактов на Jquery
// Обновить ДЗ контакт-листа с аяксом
// 1) Вынести форму создания и редактирования в модальное окно
// 2) Добавить вверху справа кнопку "Добавить контакт", для открытия модального окна
// 3) При клике на "редактировать" модалка открывается с заполнеными полями соответствующего контакта
// 4) Рендер списка контактов тоже реализовать с помощью jquery
// 5) Работу с fetch заменить на jquery.ajax
// 6) В модальное окно добавления/редактирования добавить валидацию полей с помощью регулярных выражений


const DATA_URL = 'http://fep-app.herokuapp.com/api/contacts';

const $contactsList = $('#contactsList');
const $addContactButton = $('.addContactButton');

const $modal = $('.modalWrapper');
const $modalForm = $('#modalForm');
const $saveContactBtnModalForm = $('#saveContactBtn');
const $closeContactBtnModalForm = $('#closeModalBtn');

const $contactNameInput = $('#nameInput');
const $contactPhoneInput = $('#phoneInput');
const $contactSurnameInput = $('#surnameInput');
const $contactEmailInput = $('#emailInput');
const $contactEditInput = $('#editInput');

const $contactTemplate = $('#contactTemplate').html();

let contacts = [];
init();

function init(){
    $addContactButton.on('click', toggleModal);
    $saveContactBtnModalForm.on('click', contactFormSubmit);
    $closeContactBtnModalForm.on('click', closeModal);
    $contactsList.on('click', '[value="delete"]', (e) => deleteContact(e.target.parentNode.parentNode.dataset.contactId));
    $contactsList.on('click','[value="edit"]', (e) => renderEditForm(e.target.parentNode.parentNode.dataset.contactId));

    getData(DATA_URL)
        .then(renderContacts);
}

function toggleModal() {
    $modal.toggleClass('inactive');
}

function closeModal() {
    resetContactForm();
    toggleModal();
}

function contactFormSubmit(e){
    e.preventDefault();
    submitContact();
}

function submitContact(){
    const contact = {
        name: $contactNameInput.val(),
        surname: $contactSurnameInput.val(),
        phone: $contactPhoneInput.val(),
        email: $contactEmailInput.val(),
    };

    if ($contactEditInput.data('isedit') === true) {
        updateContact({ ...contact, id: $contactEditInput.data('id') })
            .then(() => getData(DATA_URL))
            .then(renderContacts);
    } else {
        addContact(contact)
            .then(() => getData(DATA_URL))
            .then(renderContacts);
    }

    closeModal();
}

function resetContactForm(){
    $contactNameInput.val('');
    $contactSurnameInput.val('');
    $contactPhoneInput.val('');
    $contactEmailInput.val('');
    $contactEditInput.data('isedit', false);
}

function addContact(contact){
    return $.ajax({
        method: 'POST',
        url: DATA_URL,
        data: JSON.stringify(contact),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}

function getData(url){
    return $.get({ url: url})
        .then(setData);
}

function setData(response) {
    return contacts = response;
}

function renderContacts(response) {
    $contactsList.html(response.map((el) => {
        return $contactTemplate
            .replace('{{Name}}', el.name)
            .replace('{{Surname}}', el.surname)
            .replace('{{Phone}}', el.phone)
            .replace('{{Email}}', el.email)
            .replace('{{Id}}', el.id)
    }).join('\n'));
}

function deleteContact(contactId){
    return $.ajax({
        url: DATA_URL  + '/' + contactId,
        method: "DELETE",
    })
        .then(() => getData(DATA_URL))
        .then(renderContacts);
}

function renderEditForm(id){
    const contact = contacts.find(el => String(el.id) === String(id));

    $modalForm.find('#nameInput').val(contact.name);
    $modalForm.find('#surnameInput').val(contact.surname);
    $modalForm.find('#phoneInput').val(contact.phone);
    $modalForm.find('#emailInput').val(contact.email);
    $modalForm.find('#editInput').data('isedit', true);
    $modalForm.find('#editInput').data('id', id);

    toggleModal();
}

function updateContact(contact){
    return $.ajax({
        method: 'PUT',
        url: DATA_URL + '/' + contact.id,
        data: JSON.stringify(contact),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
}



