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
                    usersList();


                },
                error: function (a) {
                    console.log(a);
                    alert('Username is busy');
                }
            });
    });
});

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
                                 <form action="/admin/edit" method="get">
                                     <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#edit${element.id}">
                                     Edit
                                     </button>
                                 </form>
                                 </td>
                                 <td>
                                 <form action="/admin/edit" method="get">
                                     <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#delete${element.id}">
                                     Delete
                                     </button>
                                 </form>
                                 </td>
                             </tr>`
                    );
                });
            }
        }
    )
}

$(document).ready(() => {usersList()});