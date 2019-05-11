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
    contact.id = Date.now();


    const contactTr = document.createElement('tr');
    contactTr.id = 'contact' + contact.id;

    contactTr.innerHTML = contactTemplate
                        .replace('{{Name}}', contact.name)
                        .replace('{{Phone}}', contact.phone)
                        .replace('{{Age}}', contact.age)
                        .replace('{{Id}}', contact.id)

    contactsList.appendChild(contactTr);
};

function onAddContactBtnClick(){
    submitContact();
};

function onTableBodyClick(event){
    if (event.target.tagName === 'BUTTON') {
        deleteContact(event.target.attributes['contact-id'].value);
    }
};


function deleteContact(contactId){
    const element = document.getElementById('contact' + contactId)
    element.remove();
};

