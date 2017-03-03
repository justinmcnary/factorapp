//State//
const state = {
  questions: [
    {
      question: "Considering this quote from D-Trump: 'Look at what’s happening last night in Sweden. Sweden, who would believe this? Sweden. They took in large numbers. They’re having problems like they never thought possible' What happened last night in Sweden?",
      answers: ["A terrorist attack", "A visit from Aliens", "Iran invaded", "A horse was stuck in a well"],
      correct: 3,
    },
    {
      question: "Consider this statement from D-Trump:'The murder rate in our country is the highest it’s been in 47 years.' In actuality the murder rate in the United States as of February 9th 2017 is?",
      answers: ["Wicked high", "Less than half of the historical high hit in 1980", "The Highest its been in 47 years", "Bonkers"],
      correct: 1,
    },
    {
      question: "As of February 2017 how many people have been affected by D-Trumps Travel ban?",
      answers: ["109", "37", "60,000+", "Only those with abnormally large hands"],
      correct: 2,
    },
    {
      question: "According to a vast majority of polls Americans would like to?",
      answers: ["See D-Trumps tax returns", "Don't care", "Be set on fire", "Swim with sharks"],
      correct: 0,
    },
    {
      question: "D-Trumps Electoral College victory was?",
      answers: ["A Massive landslide victory", "Historically in the bottom quarter", "Russia", "Pleasent to the ears"],
      correct: 1,
    },
  ],
  currentQuestion: -1,
  userAnswers: [],
  score: 0
};

let ranks = ["Captain Tiny Hands", "Kellyann", "Spicy", "Nixon", "Hillary", "Monica", "JFK", "Bill Clinton", "JFK", "Abraham Lincoln"];

//State Modifications//
function getCurrentQuestion(state) {
  state.currentQuestion++;
};

function updateUserAnswers(state, uA) {
  let convertedAnswer = Number(uA);
  state.userAnswers.push(convertedAnswer);
};

function resetState(state) {
  state.currentQuestion = -1;
  state.userAnswers = [];
  state.score = 0;
};

function checkUserAnswer(state) {
  if (state.currentQuestion >= 0) {
    let userAnswer = state.userAnswers[state.currentQuestion];
    let correctAnswer = state.questions[state.currentQuestion].correct;
    if (userAnswer === correctAnswer) {
      state.score++;
      return true;
    }
    else {
      return false;
    }
  }
}

function setRank(state) {
  let percentScore = Math.floor((state.score / state.currentQuestion)* 10);
  let rank = "Lincoln";
  ranks.forEach(function(item, i) {
    if (i === percentScore) {
      rank = item;
    }
  });
  return rank;
};

//Render to DOM//
function displayNextQuestion(state) {
  let $display = $('.quiz');
  if (state.currentQuestion === -1) {
    $('.startpage').removeClass('hidden');
  }
  else if (state.currentQuestion >= state.questions.length) {
    let currentRank = setRank(state);

    return $display.html(`<h1 class="final">Time to check the FACTS!</h1> <h2 class="f-score">You're final score is ${state.score} FACTS ${state.questions.length} ALT. FACTS</h2><h3 class="f-rank">You have achieved the rank of ${currentRank}</h3><button class="restart">Try Again</button>`);
  }
  $('.startpage').addClass('hidden');
  let currentQuestionObj = state.questions[state.currentQuestion];
  $display.removeClass('hidden');
  let questionHTML = `<p class ="question">${currentQuestionObj.question}</p>`;
  currentQuestionObj.answers.forEach(function (answer, i) {
    questionHTML += `<button class='answer'id='${i}'> ${answer}</button><br>`;
  });
  $display.html(questionHTML);
}

function displayFeedBack(state) {
  let checker = checkUserAnswer(state);
  let $display = $('.quiz');
  let feedbackHtml = `<button class='next'>Next Question</button>`;
  if (checker) {
    feedbackHtml += `<h1 class="fact">FACT! You are Correct</h1>`;
  } else {
    let questionObject = state.questions[state.currentQuestion]
    feedbackHtml += `<h1 class="alt-fact">ALT FACT!</h1><h2>Put down Britebart and get some real news</h2><h3>The correct answer was ${questionObject.answers[questionObject.correct]}`
    }
  feedbackHtml += `<p>Score: ${state.score} out of ${state.currentQuestion + 1}</p>`
  $display.html(feedbackHtml);
}

function removeStartPageHiddenClass() {
  $('.startpage').removeClass('hidden');
  $('.quiz').addClass('hidden');
};

//Event Listners//
$('.begin').on('click', function () {
  getCurrentQuestion(state);
  displayNextQuestion(state);
});

$('.quiz').on('click', '.answer', function () {
  let checkAnswerId = $(this).attr('id');
  updateUserAnswers(state, checkAnswerId);
  displayFeedBack(state);
});

$('.quiz').on('click', '.next', function () {
  getCurrentQuestion(state);
  displayNextQuestion(state);
});

$('.quiz').on('click','.restart', function () {
  resetState(state);
  removeStartPageHiddenClass();
  console.log(state);
});