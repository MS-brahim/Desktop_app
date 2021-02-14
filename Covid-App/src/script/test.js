(function() {
    var questions = [
    {
        question: "Fièvre (Temérature mesurée > 38",
        choices: ['Non','Oui'],
        reponde: 1
    }, 
    {
        question: "Toux sèche",
        choices: ['Non','Oui'],
        reponde: 1
    },
    {
        question: "Difficultés à respirer",
        choices: ['Non','Oui'],
        reponde: 1
    },
    {
        question: "Maux de gorge",
        choices: ['Non','Oui'],
        reponde: 1
    },
    {
        question: "Rhinite",
        choices: ['Non','Oui'],
        reponde: 1
    },
    {
        question: "Douleur dans les muscles (courbatures)",
        choices: ['Non','Oui'],
        reponde: 1
    },
    {
        question: "Fatigue importante",
        choices: ['Non','Oui'],
        reponde: 1
    },
    {
        question: "Maux de téte",
        choices: ['Non','Oui'],
        reponde: 1
    },
    {
        question: "Diarrhées",
        choices: ['Non','Oui'],
        reponde: 1
    },
    {
        question: "Nausées et/ou vomissements",
        choices: ['Non','Oui'],
        reponde: 1
    },
    {
        question: "Anosmie (perte de l'odorat)",
        choices: ['Non','Oui'],
        reponde: 1
    },
    {
        question: "Agueusie (Perte du gout)",
        choices: ['Non','Oui'],
        reponde: 1
    }
    ];
    
    var questionCounter = 0; // question number
    var selections = []; //Array containing user choices
    var quiz = $('#quiz'); //Quiz div object
    
    // Display initial question
    displayNext();
    
    // Click handler for the 'next' button
    $('#next').on('click', function (e) {
      e.preventDefault();
      
        // Suspend click listener during fade animation
        if(quiz.is(':animated')) {        
            return false;
        }
        choose();
        
        // If no user selection, progress is stopped
        if (isNaN(selections[questionCounter])) {
            alert('Veuillez faire une sélection!');
        } else {
            questionCounter++;
            displayNext();
        }
    });
    
    // Click handler for the 'prev' button
    $('#prev').on('click', function (e) {
        e.preventDefault();
        
        if(quiz.is(':animated')) {
            return false;
        }
        choose();
        $('#next').show();
        $('#save').hide();
        questionCounter--;
        displayNext();
    });


    $('.button').on('mouseenter', function () {
        $(this).addClass('active');
    });
    $('.button').on('mouseleave', function () {
        $(this).removeClass('active');
    });
    

    function createQuestionElement(index) {
        var qElement = $('<div>', {
            id: 'question'
        });
      
        var header = $('<h4>Question ' + (index + 1) + ':</h4>');
        qElement.append(header);
        
        var question = $('<h3>').append(questions[index].question);

        qElement.append(question);
        
        var radioButtons = createRadios(index);
        qElement.append(radioButtons);
        
        return qElement;
    }
    

    function createRadios(index) {
        var radioList = $('<ul>');
        var item;
        var input = '';
        for (var i = 0; i < questions[index].choices.length; i++) {
            item = $('<li>');
            input = '<input type="radio" name="answer" value=' + i + ' /> ';
            input += questions[index].choices[i];
            item.append(input);
            radioList.append(item);
        }
        return radioList;
    }
    

    function choose() {
        selections[questionCounter] = +$('input[name="answer"]:checked').val();
    }
    

    function displayNext() {
        quiz.fadeOut(function() {
            
            $('#question').remove();
            
            if(questionCounter < questions.length){
            var nextQuestion = createQuestionElement(questionCounter);
            quiz.append(nextQuestion).fadeIn();
            if (!(isNaN(selections[questionCounter]))) {
                $('input[value='+selections[questionCounter]+']').prop('checked', true);
            }
            

            if(questionCounter === 1){
                $('#prev').show();
            } else if(questionCounter === 0){
                
                $('#prev').hide();
                $('#next').show();
            }
            }else {
            var scoreElem = displayScore();
            quiz.append(scoreElem).fadeIn();
            $('#next').hide();
            $('#prev').hide();
            $('#save').show();
            
            }
        });
    }
    
    function displayScore() {
        var score = $('<p>',{id: 'question'});   

        var opTrue = 0;
        let listArr = [];
        for (var i = 0; i < selections.length; i++) {
            if (selections[i] === questions[i].reponde) {
                opTrue++;
                listArr.push(questions[i].question);
            }
        }
        // console.log(listArr);
        localStorage.setItem("questionArray",listArr);
        // console.log(localStorage.getItem("questionArray"))

        score.append(opTrue +' '+ 'questions oui !!!');
        return score;
    }
    $('#save').on('click', function () {
        
        // $('#prev').hide();
        $('#save').hide();
        $('#finSave').show();
        
    });
})();

function save() {

    fetch('http://localhost:3000/patient/'+localStorage.getItem("patientId")+'/test',{
        method:"POST",
        headers:{
            "Content-Type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
            question:localStorage.getItem("questionArray"),
            patientID:localStorage.getItem("patientId")
        }),
    }).then(result => {
        return result.json();
            
    }).then(data =>{
        console.log(data);
        localStorage.setItem("questionId",data._id);
        console.log(localStorage.getItem("questionId"));
    }).catch((err) => {
        console.log(err);
    });

}

function finishSave(){

    fetch('http://localhost:3000/fiche',{
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
            title: 'Folder patient has created successfully'
        }).then(function() {
            location.reload();
        })
    }).catch((err) => {
        console.log(err);
    });
}