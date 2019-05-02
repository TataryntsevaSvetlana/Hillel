// Написать класс, в конструктор которого мы передадим элемент-таблицу.
// Класс при инициальзации должен сделать HTTP запрос на получение списка юзеров, а после того как получить ответ от сервера - отрендерит их в той таблице;
// url для получения списка юзеров
// https://jsonplaceholder.typicode.com/users
// Доп. задание
// При клике на строку пользователя, нужно сделать http запрос на получение всех Постов пользователя
// url для получения постов юзера
// https://jsonplaceholder.typicode.com/posts?userId={{ID}}
// где {{ID}} нужно заменить на соответвующий id пользователя



class Users{

    constructor(element){
        this.element = element;
        this.init();
    }

    static ROOT_URL = 'https://jsonplaceholder.typicode.com/';
    static PATH_URL_USERS = 'users';
    static PATH_URL_USERS_POSTS = 'posts';
    static QUERY_PARAM_USER_ID = '?userId=';

    init() {
        const url = Users.ROOT_URL + Users.PATH_URL_USERS;
        this.sendRequest(url, (response) => this.renderUsersList(response));
        this.element.addEventListener('click', this.onClick.bind(this));
    }

    sendRequest(url, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('get', url, true);
        xhr.onload = function() {
            if (xhr.status === 200) {
                callback( JSON.parse(xhr.responseText));
            } else {
                console.log('error');
            }
        }
        xhr.send();
    }

    renderUsersList(users){
        users.forEach((user) => {      
            const tr = document.getElementById('userTemplate').innerHTML
                .replace('{{id}}', user.id)
                .replace('{{name}}', user.name)
                .replace('{{phone}}', user.phone)
                .replace('{{email}}', user.email)

            this.element.children[1].innerHTML += tr;
        });
    }

    onClick(event) {
        if (event.target.parentElement.tagName === 'TR') { 
            if (event.target.parentElement.dataset.userId) {
                const targetId = event.target.parentElement.dataset.userId;
                const url = Users.ROOT_URL + Users.PATH_URL_USERS_POSTS + Users.QUERY_PARAM_USER_ID + targetId;

                this.sendRequest(url, this.showUsersPosts)
            }
        }
    }

    showUsersPosts(response){
        console.log(response);
    }
}



const usersList = new Users(
    document.getElementById('usersListTable')
)



