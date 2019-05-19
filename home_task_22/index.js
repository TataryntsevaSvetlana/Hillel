// Доска со стикерами
// На странице есть поле и кнопка "Добавить".
// Когда пользователь нажимает "Добавить" открывается модальное окно с формой создания стикера.
// В форме он может заполнить title (input) и description (textarea).
// Внизу модалки две кнопки "Сохранить" и "Отмена". При клике по "Сохранить" на поле добавляется "стикер".
// У стикера есть заголовок и тело. В заголовке - тот тайтл что вводил пользователь и кнопка закрыть. 
// В теле - то что пользователь ввел в дескрипшн.
// При клике на "закрыть", стикер удаляется с поля.
// Все данные храним в локалсторедж и восстанавливаем при перезагрузке страницы.
// ЗАДАНИЕ СО ЗВЕЗДОЧКОЙ
// Добавить возможность перемещать стикеры, тягая их за заголовок. Положение тоже хранить в локалсторедж и восстанавливать при перезагрузке.

const $addModalButton = $('.addModalButton');
const $modal = $('.modalWrapper');
const $cancelButtonModal = $modal.find('#cancelNote');
const $saveButtonModal = $modal.find('#saveNote');
const $noteTemplate = $('#noteTemplate');
const $mainField = $('main');
const $description = $modal.find('#descriptionTextarea');
const $title = $modal.find('#titleInput');

function init() {
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');  // получаем информацио из localStorage и рендерим в главном поле, навешиваем обработчики
    notes.forEach(note => { renderNote(note) });

    $addModalButton.on( "click", toggleModal);
    $cancelButtonModal.on( "click", handleCancelModal);
    $saveButtonModal.on( "click", handleSaveButtonClick);
}

init();

function toggleModal() {  // переключением класса либо показываем модалку с затемненной обёрткой, либо скрываем
    $modal.toggleClass('inactive');
}

function getNoteValues() {  // получаем значения из инпута и текстареа, генерируем id
    return {
        description: $description.val(),
        title: $title.val(),
        id: Date.now(),
    }
}

function handleSaveButtonClick() { // при сохранении заметки, отправляем значения заголовка и описания в localStorage, рендерим заметку в главном поле и закрываем модальное окно
    const note = getNoteValues();
    saveToStorage(note);
    renderNote(note);
    handleCancelModal();
}

function saveToStorage(note) {   // сохраняем значения заголовка и описания в localStorage,
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');

    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
}

function removeFromStorage(id) { // удаляем значения заголовка и описания в localStorage по id заметки (при удалении заметки с главного поля)
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    const updatedNotes = notes.filter(note => note.id != id);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
}

function renderNote(note) { //  рендерим заметку в главном поле, навешиваем обработчик на кнопку удаления заметки
    const noteTemplate = $noteTemplate.html()
        .replace('{{title}}', note.title)
        .replace('{{description}}', note.description);

    const $note = $($.parseHTML(noteTemplate));
    const $cancelButtonNote = $note.find('[value="delete"]');

    $cancelButtonNote.on("click", () => handleCancelButtonNoteClick($note, note.id));
    $mainField.append($note);
}

function handleCancelButtonNoteClick($note, id) { //  вызываем удаление события из памяти, удаление заметки из дома, вызов функции удаления заметки из localStorage по id заметки
    $note.empty();
    $note.remove();
    removeFromStorage(id);
}

function resetForm() { //  очистка формы
    $description.val('');
    $title.val('');
}

function handleCancelModal() { //  очистка формы модалки и закрытие модалки
    resetForm();
    toggleModal();
}




