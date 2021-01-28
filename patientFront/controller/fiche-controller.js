const swal2 = require('sweetalert2');
var ficheAPI = 'http://localhost:3000/fiche';

function finishSave(){

    fetch(ficheAPI,{
        method:"POST",
        headers:{
            "Content-Type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
            patientID:localStorage.getItem("patientId"),
            questionID:localStorage.getItem("questionId")
        }),
    }).then(result => {
        return result.json();
            
    }).then(data =>{
        console.log(data);
        swal2.fire({
            icon: 'success',
            title:'Le fiche du test sera crée',
            confirmButtonText:'<a class="text-white" href="patient.html">Ok</a>'
        })
    }).catch((err) => {
        console.log(err);
    });
}

// fetch all data patient
function fetchDataFiche() {
    fetch(ficheAPI)
    .then(result => {
        return result.json();
    }).then(data =>{
        console.log(data);
        const html = data.map(fiche =>{
            let tbodyTable= `
                <tr>
                    <td>${fiche.patientID.first_name +' '+ fiche.patientID.last_name}</td>
                    <td>${fiche.patientID.CIN}</td>
                    <td>${fiche.patientID.email}</td>
                    <td>${fiche.patientID.phone}</td>
                    <td>
                        <button class="btn btn-danger btn-sm" onclick="editResult()">
                            <input type="hidden" value="${localStorage.setItem("okok",fiche._id,)}">
                            ${fiche.result_test}
                        </button>
                    </td>
                    <td>${fiche.date_test}</td>
                    <td class="text-center">
                        
                        <a class="btn btn-sm btn-dark" href="fiche.html"><i class="fas fa-print"></i></a>
                    </td>
                </tr>
            `;
            return tbodyTable;
        }).join('');
        document.querySelector("#getFiche").insertAdjacentHTML("afterbegin", html);
    }).catch((err) => {
        console.log('message error :'+ err)
    });
}
fetchDataFiche();

function editResult() {
    fetch(ficheAPI+'/'+localStorage.getItem("ficheId"),{
        method:"PATCH",
        headers:{
            "Content-Type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
            result_test:true
        }),
    }).then(result => {
        return result.json();
            
    }).then(data =>{
        console.log(data);
        swal2.fire({
            icon: 'success',
            title:'Le fiche été modifier',
        })
    }).catch((err) => {
        console.log(err);
    });
}

$(document).ready(function(){
    $("#filterDataFiche").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#getFiche tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});