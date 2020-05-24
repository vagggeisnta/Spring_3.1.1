//Добавление нового юзера
$(function () {
    $('#formAdd').submit(function (e) {
        e.preventDefault();
        let user = {};
        let roles = [{},{}];
        let i = 0;
        $(this).serializeArray().map(function(x){
            if(x.name === 'roles'){
                roles[i]['name'] = x.value;
                i++;
                return;
            }
            user[x.name] = x.value;
        });
        user['roles'] = roles;
        $.ajax(
            {
                contentType : 'application/json',
                url: 'admin/users',
                type: 'POST',
                data: JSON.stringify(user),
                success: function(){
                    alert('Successful');
                    $('#formAdd')[0].reset();
                    $('#allUsers').empty();
                    usersList();
                    },
                error: function (a) {
                    alert('Username is busy');
                }
            });
    });
});

//Функция, собирающая таблицу из всех существующих юзеров
function usersList() {
    $.ajax(
        {
            contentType : 'application/json',
            url: 'admin/users',
            type: 'GET',
            success: function(users){
                users.forEach(function (element) {
                    let countOfRoles = element.roles.length > 1;
                    $('#allUsers').append(
                        `<tr>
                                 <td>${element.id}</td>
                                 <td>${element.username}</td>
                                 <td>${element.password}</td>
                                 <td>${countOfRoles ? element.roles[0].name.slice(5) + " " + element.roles[1].name.slice(5) : element.roles[0].name.slice(5)}
                                 </td>
                                 <td>
                                     <button id="editUser" editID="${element.id}" type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal">
                                     Edit
                                     </button>
                                 </td>
                                 <td>
                                     <button id="deleteUser" deleteID="${element.id}" type="button" class="btn btn-danger" data-toggle="modal" data-target="#modal">
                                     Delete
                                     </button>
                                 </td>
                             </tr>`
                    );
                });
            }
        }
    );
}

//Делает запрос в бд, берет оттуда список ролей и подставляет в тег option формы регистрации пользователя
function addUser(){
    $.ajax({
        contentType : 'application/json',
        url: '/roles',
        type: 'GET',
        success: function(roles){
            roles.forEach(function (element) {
                $('#role').append(`<option value="${element.name}">${element.name.slice(5)}</option>`);

            });
        }
    });
}

//При нажатии на "edit" в модалке, срабатывает данная функция, которая заполняет модалку.
$(document).on('click', '#editUser', function (e) {
let id = parseInt(e.target.getAttribute('editID'), 10);
    $.ajax({
        contentType : 'application/json',
        url: 'admin/users',
        type: 'GET',
        success: function(users){
            let user = users.find(el=>el.id === id);
            document.querySelector('.modalForm').setAttribute('action', `admin/clients/${user.id}`);
            document.querySelector('.modalForm').setAttribute('id', `edit`);
            document.querySelector('#userId').setAttribute('value', user.id);
            document.querySelector('#newUsername').setAttribute('value', user.username);
            document.querySelector('#newPassword').setAttribute('value', user.password);
            document.querySelector('#userId').removeAttribute('readonly');
            document.querySelector('#newUsername').removeAttribute('readonly');
            document.querySelector('#newPassword').removeAttribute('readonly');
            document.querySelector('#newRoles').removeAttribute('disabled');
            document.querySelector('#editLabel').innerHTML = 'Edit user';
            document.querySelector('#modalButton').setAttribute('class', 'btn btn-primary');
            document.querySelector('#modalButton').innerHTML = 'Edit';

            $.ajax({
                contentType : 'application/json',
                url: '/roles',
                type: 'GET',
                success: function(roles){
                    let newRoles =  $('#newRoles');
                    newRoles.empty();
                        roles.forEach(function (element) {
                            newRoles.append(`<option id="opt${element.id}" value="${element.name}">${element.name.slice(5)}</option>`);
                            user.roles.forEach(function (el) {
                                if (element.name === el.name){
                                    document.querySelector(`#opt${element.id}`).setAttribute('selected', '');
                                }
                            })
                        });
                    }
            });
        }
    });
});

//перехватывает событие из формы edit
$(function () {
    $(document).on('submit', '#edit', function (e) {
        e.preventDefault();
        let user = {};
        let roles = [{}, {}];
        let i = 0;
        $(this).serializeArray().map(function (x) {
            if (x.name === 'roles') {
                roles[i]['name'] = x.value;
                i++;
                return;
            }
            user[x.name] = x.value;
        });
        user['roles'] = roles;
        $.ajax(
            {
                contentType: 'application/json',
                url: `admin/users/${user.id}`,
                type: 'PUT',
                data: JSON.stringify(user),
                success: function () {
                    alert('Successful');
                    $('#allUsers').empty();
                    usersList();
                },
            });
    });
});


//При нажатии на "delete" в модалке, срабатывает данная функция, которая заполняет модалку.
$(document).on('click', '#deleteUser', function (e) {
    let id = parseInt(e.target.getAttribute('deleteID'), 10);
    $.ajax({
        contentType : 'application/json',
        url: 'admin/users',
        type: 'GET',
        success: function(users){
            let user = users.find(el=>el.id === id);

            document.querySelector('.modalForm').setAttribute('action', `admin/clients/${user.id}`);
            document.querySelector('.modalForm').setAttribute('id', `delete`);
            document.querySelector('#userId').setAttribute('value', user.id);
            document.querySelector('#newUsername').setAttribute('value', user.username);
            document.querySelector('#newPassword').setAttribute('value', user.password);
            document.querySelector('#userId').setAttribute('readonly', 'true');
            document.querySelector('#newUsername').setAttribute('readonly', 'true');
            document.querySelector('#newPassword').setAttribute('readonly', 'true');
            document.querySelector('#newRoles').setAttribute('disabled', '');
            document.querySelector('#editLabel').innerHTML = 'Delete user';
            document.querySelector('#modalButton').setAttribute('class', 'btn btn-danger');
            document.querySelector('#modalButton').innerHTML = 'Delete';

            $.ajax({
                contentType : 'application/json',
                url: '/roles',
                type: 'GET',
                success: function(roles){
                    let newRoles =  $('#newRoles');
                    newRoles.empty();
                    roles.forEach(function (element) {
                        newRoles.append(`<option id="opt${element.id}" value="${element.name}">${element.name.slice(5)}</option>`);
                        user.roles.forEach(function (el) {
                            if (element.name === el.name){
                                document.querySelector(`#opt${element.id}`).setAttribute('selected', '');
                            }
                        })
                    });
                }
            });
        }
    });
});

//перехватывает событие из формы delete
$(function () {
    $(document).on('submit', '#delete', function (e) {
        e.preventDefault();
        let user = {};
        let roles = [{}, {}];
        let i = 0;
        $(this).serializeArray().map(function (x) {
            if (x.name === 'roles') {
                roles[i]['name'] = x.value;
                i++;
                return;
            }
            user[x.name] = x.value;
        });
        user['roles'] = roles;
        $.ajax(
            {
                url: `admin/users/${user.id}`,
                type: 'DELETE',
                success: function () {
                    alert('Successful');
                    $('#formAdd')[0].reset();
                    $('#allUsers').empty();
                    usersList();
                },
            });
    });
});

//Загружаем шаблонные эелементы на админскую страницу и выводим данные об авторизованном юзере
$(function () {
    $('#head').load('fragments.html #header', function () {
        $.ajax(
            {contentType : 'application/json',
                url: '/user/authuser',
                type: 'GET',
                success: function(user){
                    let roles = user.roles;
                    $('#black').prepend(`<strong>${user.username}</strong>  &nbsp; with roles: ${roles.map(el => el.name.slice(5)).join(" ")}`);
                    $('#userTable').load('fragments.html #userCard', function() {
                        $('#tbodyUser').append(`
                       <tr>
                       <td>${user.id}</td>
                       <td>${user.username}</td>
                       <td>${user.password}</td>
                       <td>${user.roles.map(el=> el.name.slice(5)).join(" ")}</td>
                       </tr>`);
                    });
                    },
            });
    });
});

//Загружаем шаблонные эелементы на юзерскую страницу и выводим данные об авторизованном юзере
$(function () {
    $('#userBlack').load('fragments.html #header', function () {
        $.ajax(
            {contentType : 'application/json',
                url: '/user/authuser',
                type: 'GET',
                success: function(user){
                    let roles = user.roles;
                    $('#black').prepend(`<strong>${user.username}</strong>  &nbsp; with roles: ${roles.map(el => el.name.slice(5)).join(" ")}`);
                    $('#userPageTable').load('fragments.html #userCard', function() {
                        $('#tbodyUser').append(`
                       <tr>
                       <td>${user.id}</td>
                       <td>${user.username}</td>
                       <td>${user.password}</td>
                       <td>${user.roles.map(el=> el.name.slice(5)).join(" ")}</td>
                       </tr>`);
                    });
                },
            });
    });
});

//Заполняает таблиц юзеров после загрузки админской страницы
$(document).ready(() => {usersList()});


//Подставляет роли из базы данных в тег option формы регистрации пользователя
$(document).ready(() => {addUser()});