const addContactBtn = document.getElementById('addContactBtn');
const contactsList = document.getElementById('contactsList');
const contactNameInput = document.getElementById('nameInput');
const contactPhoneInput = document.getElementById('phoneInput');
const contactAgeInput = document.getElementById('ageInput');
const contactTemplate = document.getElementById('contactTemplate').innerHTML;

addContactBtn.addEventListener('click', onAddContactBtnClick);
contactsList.addEventListener('click', onTableBodyClick);

function submitContact(){
    const contact = {
        name: contactNameInput.value,
        phone: contactPhoneInput.value,
        age: contactAgeInput.value,
    };
    
    addContact(contact);
    resetContactForm();
};

function resetContactForm(){
    contactPhoneInput.value = '';
    contactAgeInput.value = '';
    contactNameInput.value = '';
};

function addContact(contact){
    const contactTr = document.createElement('tr');

    contactTr.innerHTML = contactTemplate
                        .replace('{{Name}}', contact.name)
                        .replace('{{Phone}}', contact.phone)
                        .replace('{{Age}}', contact.age);

    const deleteContactBtn = createNewElement('button', 'delete', 'delete', 'deleteButton'); 
    const contactDeleteTd = createNewElement('td', deleteContactBtn.outerHTML);
    
    contactTr.appendChild(contactDeleteTd);
    contactsList.appendChild(contactTr);
};

function onAddContactBtnClick(){
    submitContact();
};

function onTableBodyClick(event){
    if (event.target.tagName === 'BUTTON'
        && event.target.value === 'delete') {
        deleteContact(event.target);
    }
};

function createNewElement(tagName, content, value, className) {
    const element = document.createElement(tagName);
    element.innerHTML = content;
    element.value = value;
    element.className = className;
    return element;
}

function deleteContact(target){
    target.parentNode.parentNode.remove();
};

