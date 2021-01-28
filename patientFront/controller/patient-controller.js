var patientAPI = 'http://localhost:3000/patient';
const swal = require('sweetalert2');


// Post new Patient 
var form = document.getElementById('form');      
   
form.addEventListener('submit',function(e) {
    e.preventDefault();
    var fname = document.getElementById('fname').value;
    var lname = document.getElementById('lname').value;
    var cin = document.getElementById('CIN').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('tel').value;
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
            console.log(localStorage.getItem("patientId"));

            swal.fire({
                icon: 'success',
                title: data.first_name+" "+data.last_name +' A été ajouté',
                showCancelButton: true,
                // confirmButtonText:'<a href="'+patientAPI+'/'+id+'/test">Test</a>'
                confirmButtonText:'<a class="text-white" href="test.html">Test</a>'
            })
            
        }).catch((err) => {
            console.log(err);
        });
    }
})


// fetch all data patient
function fetchDataPatient() {
    fetch(patientAPI)
    .then(result => {
        return result.json();
    }).then(data =>{
        console.log(data);
        const html = data.map(patient =>{
            return `
                <tr>
                    <td>${patient.last_name +' '+patient.first_name}</td>
                    <td>${patient.CIN}</td>
                    <td>${patient.email}</td>
                    <td>${patient.phone}</td>
                </tr>
            `;
        }).join('');
        document.querySelector("#getPatient").insertAdjacentHTML("afterbegin", html);
    }).catch((err) => {
        console.log('message error :'+ err)
    });
}
fetchDataPatient();