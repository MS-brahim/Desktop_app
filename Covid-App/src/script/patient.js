var patientAPI = 'http://localhost:3000/patient';

// Post new Patient 
var addPatient = document.getElementById('AddPatient');      
   
addPatient.addEventListener('submit',function(e) {
    e.preventDefault();
    var fname = document.getElementById('fname').value;
    var lname = document.getElementById('lname').value;
    var cin = document.getElementById('cin').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var errorAlert = document.getElementById('errorMsg');

    if (fname.length<=1) {
        errorAlert.innerHTML = '<div  id="errorMsg" class="alert alert-danger">Le prénom est requis</div>';
    }
    else if (lname.length<=1) {
        errorAlert.innerHTML = '<div  id="errorMsg" class="alert alert-danger">Le nom est requis</div>';
    }
    else if (cin=="") {
        errorAlert.innerHTML = '<div  id="errorMsg" class="alert alert-danger">Champ de numéro CIN est requis</div>';
    }
    else if (email=="") {
        errorAlert.innerHTML = '<div  id="errorMsg" class="alert alert-danger">Adress e-mail est requis</div>';
    }
    else if (phone=="") {
        errorAlert.innerHTML = '<div  id="errorMsg" class="alert alert-danger">Numéro de téléphone est requis</div>';
    }else {
        fetch(patientAPI+'/create',{
            method:"POST",
            headers:{
                "Content-Type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                first_name:fname,
                last_name:lname,
                CIN:cin,
                email:email,
                phone:phone
            }),
        }).then(result => {
            return result.json();
            
        }).then(data =>{
            console.log(data);
            
            //console.log(data._id);
            localStorage.setItem("patientId",data._id);
            // console.log(localStorage.getItem("patientId"));

            Swal.fire({
                icon: 'success',
                title: data.first_name+" "+data.last_name +' A été ajouté',
                showCancelButton: true,
                confirmButtonText:'<a class="text-white" type="button"  data-toggle="modal" data-target="#modelTest">Test</a>'
            })
            
            
            
        }).catch((err) => {
            console.log(err);
        });
    }
})

// fetch all data dossiers patients
function fetchData() {
    fetch('http://localhost:3000/fiche')
    .then(result => {
        return result.json();
    }).then(data =>{
        console.log(data);
        const html = data.map(fiche =>{
            return `
                <tr>
                    <td>${fiche.patientID.last_name +' '+fiche.patientID.first_name}</td>
                    <td>${fiche.patientID.CIN}</td>
                    <td>${fiche.patientID.email}</td>
                    <td>${fiche.patientID.phone}</td>
                    <td>${fiche.result_test}</td>
                    <td>
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <button type="button" class="btn btn-secondary" onclick="showFiche('${fiche._id}')"><i class="fas fa-eye text-primary"></i></button>
                            <button type="button" onclick="editFiche('${fiche._id}')" data-toggle="modal" data-target="#editFiche" class="btn btn-secondary"><i class="fas fa-edit text-success"></i></button>
                            <button type="button" class="btn btn-secondary" onclick="deleteFiche('${fiche._id}')"><i class="fas fa-trash-alt text-danger"></i></button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
        document.querySelector("#getPatient").insertAdjacentHTML("afterbegin", html);
    }).catch((err) => {
        console.log('message error :'+ err)
    });
}
fetchData()

// show dossier Patient
function showFiche(id) {
    localStorage.setItem("ficheID",id)
    location.href="patientFolder.html"
    console.log(id)
}

// Delete dossier patient 
function deleteFiche(id) {
    fetch('http://localhost:3000/fiche/remove/'+id,{
        method:'DELETE',
    }).then(result => {
        return result.json();
    }).then(function() {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
          
        Toast.fire({
            icon: 'success',
            title: 'Deleted in successfully'
        }).then(function () {
            location.reload();
        })
    })
}

// update dossier patient 
function editFiche(id) {
    var resultTest = document.getElementById("getFEdit");
    var btnUpdate = document.getElementById("btnUpdate");
    console.log(id)
    fetch('http://localhost:3000/fiche/'+id,{
        method: 'GET',
    }).then(result => {
        return result.json();
    }).then(data =>{
        console.log(data);
        resultTest.value = data.result_test;
        btnUpdate.addEventListener('click',function() {
            fetch('http://localhost:3000/fiche/update/'+data._id,{
                method:'PATCH',
                headers:{
                    "Content-Type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({
                    result_test:resultTest.value,
                }),
            }).then(result=>{
                return result.json()
            }).then(function () {
                location.reload()
            })
        })
       
    }).catch((err) => {
        console.log('message error :'+ err)
    });
}