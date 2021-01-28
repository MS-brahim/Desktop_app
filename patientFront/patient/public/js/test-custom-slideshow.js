(function() {
    var questions = [{
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
    }];
    
    var questionCounter = 0; //Tracks question number
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
      questionCounter--;
      displayNext();
    });
    
    // Click handler for the 'Start Over' button
    $('#start').on('click', function (e) {
      e.preventDefault();
      
      if(quiz.is(':animated')) {
        return false;
      }
      questionCounter = 0;
  
      selections = [];
      displayNext();
      $('#start').hide();
    });
    
    // Animates buttons on hover
    $('.button').on('mouseenter', function () {
      $(this).addClass('active');
    });
    $('.button').on('mouseleave', function () {
      $(this).removeClass('active');
    });
    
    // Creates and returns the div that contains the questions and 
    // the answer selections
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
    
    // Creates a list of the answer choices as radio inputs
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
    
    // Reads the user selection and pushes the value to an array
    function choose() {
      selections[questionCounter] = +$('input[name="answer"]:checked').val();
    }
    
    // Displays next requested element
    function displayNext() {
      quiz.fadeOut(function() {
        $('#question').remove();
        
        if(questionCounter < questions.length){
          var nextQuestion = createQuestionElement(questionCounter);
          quiz.append(nextQuestion).fadeIn();
          if (!(isNaN(selections[questionCounter]))) {
            $('input[value='+selections[questionCounter]+']').prop('checked', true);
          }
          
          // Controls display of 'prev' button
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
          $('#start').show();
        }
      });
    }
    
    // Computes score and returns a paragraph element to be displayed
    function displayScore() {
      var score = $('<p>',{id: 'question'});
      
      var opTrue = 0;
      for (var i = 0; i < selections.length; i++) {
        if (selections[i] === questions[i].reponde) {
            opTrue++;
        }
      }
      
    score.append( opTrue + '/' +
        questions.length +' '+ 'Questions oui !!!');
    return score;
    }
})();