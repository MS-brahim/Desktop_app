$(function() {

    var $orders = $('#orders');
    var $id = $('#id');
    var $fName = $('#fname');
    var $lName = $('#lName');
    var $phone = $('#phone');
    var $email = $('#email');
    var $cin = $('#cin');
    var $password = $('#password');

    // -----------------------------Get Data-----------------------

    $.ajax({
        type: 'GET',
        url: 'https://6006fcca3698a80017de26e1.mockapi.io/api/v1/users',

        success: function(orders) {

            $.each(orders, function(i, order) {
                $orders.append(' <tr> <td> ' + order.id + '</td>' +
                    ' <td> ' + order.fName + '</td>' +
                    ' <td>  ' + order.lName + '</td>' +
                    ' <td>  ' + order.phone + '</td>' +
                    ' <td>  ' + order.cin + '</td>' +
                    ' <td>  ' + order.email + '</td>' +
                    ' <td>  ' + order.password + '</td>' +
                    '<td>  <button class="btn btn-danger" onclick="deleteItem(' + order.id + ')"  > Delete </button> ' + ' <button  class="btn btn-success" onclick="update(' + order.id + ');show();"  > Update </button></td> </tr>')
            });
        },
        error: function() {
            alert('err');
        }
    })



    //// add and update Data ///

    $('#add-order').on('click', function() {

        var idUpdate = $('#idUpdate').val();
        var order = {

            id: $('#idUpdate').val(),
            fName: $fName.val(),
            lName: $lName.val(),
            phone: $phone.val(),
            email: $email.val(),
            cin: $cin.val(),
            password: $password.val(),

        };

        /// post or put ///

        if (idUpdate) {
            TEST = "PUT";
            dynamicURL = "https://6006fcca3698a80017de26e1.mockapi.io/api/v1/users/" + idUpdate;

        } else {
            dynamicURL = "https://6006fcca3698a80017de26e1.mockapi.io/api/v1/users";
            TEST = "POST";
        };

        $.ajax({

            url: dynamicURL,
            method: TEST,
            data: order,

            success: function() {
                swal({
                    title: "Are You Sure",
                    text: "You clicked the button!",
                    type: "success"
                }).then(function() {
                    location.reload();
                });
            },

            error: function(error) {
                alert(error);
            }

        });

    });
});

// ------------------Delete Data--------------

function deleteItem(id) {
    $.ajax({
        type: 'DELETE',
        url: 'https://6006fcca3698a80017de26e1.mockapi.io/api/v1/users/' + id,
        success: function() {

            swal({
                title: "Are You Sure",
                text: "You clicked the button!",
                type: "danger"
            }).then(function() {
                location.reload();
            });;
        },
        error: function(error) {
            alert(error);
        }
    });
}

////// select data for update  ///


function update(id) {

    $.ajax({

        type: 'GET',
        url: 'https://6006fcca3698a80017de26e1.mockapi.io/api/v1/users/' + id,

        success: function(data) {

            $('#idUpdate').val(data.id);
            $('#fname').val(data.fName);
            $('#lName').val(data.lName);
            $('#phone').val(data.phone);
            $('#email').val(data.email);
            $('#cin').val(data.cin);
            $('#password').val(data.password);


            if (data.success == true) { // if true (1)
                setTimeout(function() { // wait for 5 secs(2)
                    location.reload(); // then reload the page.(3)
                }, 5000);
            }

        },
        error: function(error) {
            alert(error);
        }
    })
}
