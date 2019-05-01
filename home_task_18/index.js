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

    init() {
        const url = Users.ROOT_URL + 'users';
        this.fetchUsersList(url, (response) => this.renderUsersList(response));
        document.getElementById('usersListTable').addEventListener('click', this.onClick.bind(this));
    }

    fetchUsersList(url, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open( 'get', url, true);
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
        const userTemplateTr = document.getElementById('userTemplate').innerHTML;
        
        users.forEach(function(user) {
            const userTr = document.createElement('tr');
            
            userTr.innerHTML = userTemplateTr
                .replace('{{name}}', user.name)
                .replace('{{phone}}', user.phone)
                .replace('{{email}}', user.email)

            userTr.dataset.id = user.id;
            document.getElementById('usersListTable').lastElementChild.appendChild(userTr);
        });
    }

    onClick(event) {
        if (event.target.parentElement.tagName === 'TR') { 
            if (event.target.parentElement.dataset.id) {
                const targetId = event.target.parentElement.dataset.id;
                const url = Users.ROOT_URL + 'posts' + '?userId=' + targetId;

                this.fetchUsersList(url, (response) => {this.showUsersPosts(response)});
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



