var ficheAPI = 'http://localhost:3000/fiche/'+printId+'/print';

// fetch all data dossier
function fetchDataFicheImprimer(id) {
    fetch(ficheAPI)
    .then(result => {
        return result.json();
    }).then(data =>{

        const html = data.map(fichePrint =>{
            return `
                <tr>
                    <td>${fichePrint.patientID.first_name +' '+ fichePrint.patientID.last_name}</td>
                    <td>${fichePrint.patientID.CIN}</td>
                    <td>${fichePrint.patientID.email}</td>
                    <td>${fichePrint.patientID.phone}</td>
                    <td>${fichePrint.date_test}</td>
                    
                </tr>
            `;
        }).join('');
        document.querySelector("#ficheImprimer").insertAdjacentHTML("afterbegin", html);
    }).catch((err) => {
        console.log('message :'+ err)
    });
}
fetchDataFicheImprimer();