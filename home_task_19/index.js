// Расширить список пользователей
// в index.html я уже добавил два контейнера ul, c которыми нам нужно будет работать.
// при клике на какого-нибудь юзера
// 1) делаем запрос и получаем список всех постов
// https://jsonplaceholder.typicode.com/posts?userID={{ID}}
// 2) под таблицей в ul просто списком выводим поле title каждого поста
// 3) после завершения предыдущего запроса, делаем запрос на получение всех альбомов пользователя
// https://jsonplaceholder.typicode.com/albums?userId={{ID}}
// 4) тоже рендерим списком названия альбомов
// Все запросы, в том числе и на получение списка пользоваетелей делаем с помощью новой функции, которая возвращает промис



function sendRequest(method, url){
    const xhr = new XMLHttpRequest();
    return new Promise((resolve, reject) => {

        xhr.open(method, url);

        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(JSON.parse(xhr.response));
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };

        xhr.send();
    }); 
};

class Users {
    constructor(element){
        this.element = element;
        this.init();
    }

    static ROOT_URL = 'https://jsonplaceholder.typicode.com';
    static PATH_URL_USERS = '/users';
    static PATH_URL_USERS_POSTS = '/posts';
    static PATH_URL_USERS_ALBUMS = '/albums';
    static QUERY_PARAM_USER_ID = '?userId=';

    init() {
        this.renderUsersList = this.renderUsersList.bind(this);
        this.onClick = this.onClick.bind(this);

        this.element.addEventListener('click', this.onClick);

        this.userPosts = document.getElementById('userPosts');
        this.userAlbums = document.getElementById('userAlbums');
        this.tbody = this.element.getElementsByTagName('tbody')[0];
        this.fetchUsers();
    }

    fetchUsers(){
        sendRequest('get', Users.ROOT_URL + Users.PATH_URL_USERS)
            .then(result => this.renderUsersList(result));
    }

    renderUsersList(users){
        this.tbody.innerHTML = users.map((user) => {
            return document.getElementById('userTemplate').innerHTML
                .replace('{{id}}', user.id)
                .replace('{{name}}', user.name)
                .replace('{{phone}}', user.phone)
                .replace('{{email}}', user.email)
        }).join('\n');
    }

    onClick(event) {
        const parentEl = event.target.parentElement;
        if (parentEl.tagName === 'TR') { 
            if (parentEl.dataset.userId) {
                const targetId = parentEl.dataset.userId;
                
                this.fetchData(Users.ROOT_URL + Users.PATH_URL_USERS_POSTS + Users.QUERY_PARAM_USER_ID + targetId)
                    .then(posts => this.renderUserPosts(posts))
                    .then(() => this.fetchData(Users.ROOT_URL + Users.PATH_URL_USERS_ALBUMS + Users.QUERY_PARAM_USER_ID  + targetId))
                    .then(albums => this.renderUserAlbums(albums))
                    .catch(err => alert(JSON.stringify(err)))
            }
        }
    }

    fetchData (url){
        return sendRequest('get', url);
    }

    renderUserPosts(posts) {
        this.userPosts.innerHTML = posts.map((post) => {
            return '<li>'+ post.title + '</li>'
        }).join('\n');
    }

    renderUserAlbums(albums) {
        this.userAlbums.innerHTML = albums.map((album) => {
            return '<li>'+ album.title + '</li>'
        }).join('\n');
    }
}

const usersList = new Users(
    document.getElementById('usersListTable')
)
    
