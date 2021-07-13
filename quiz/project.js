
//Космос

window.addEventListener("load", init, false);

let sun = new Image();
let earth = new Image();
let moon = new Image();

function init() {
    sun.src = "images/Canvas_sun.png";
    earth.src = "images/Canvas_earth.png";
    moon.src = "images/Canvas_moon.png";
    window.requestAnimationFrame(draw);
}

function draw() {
    let context = document.getElementById("space").getContext("2d");

    context.globalCompositeOperation = "destination-over"; //очищуємо полотно
    context.clearRect(0, 0, 300, 300); // чистимо конкретну ділянку полотна
    context.fillStyle = "rgba(0,0,0,0.4)";//задаємо стиль фону
    context.strokeStyle = "rgba(255,153,255,0.4)";//стиль контура
    context.save();//зберігаємо задані параметри
    context.translate(150, 150);//задаємо координати

    //Земля
    let time = new Date();
    context.rotate(((2 * Math.PI) / 60) * time.getSeconds() + ((2 * Math.PI) / 60000) * time.getMilliseconds());
    context.translate(105, 0);
    context.fillRect(0, -12, 50, 24);//малюємо фігуру
    context.drawImage(earth, -12, -12);
    context.save();

    //Місяць
    context.rotate(((2 * Math.PI) / 6) * time.getSeconds() + ((2 * Math.PI) / 6000) * time.getMilliseconds());
    context.translate(0, 28.5);
    context.drawImage(moon, -3.5, -3.5);
    context.restore();//відновлення попередньо збереженого стека
    context.restore();

    //Сонце
    context.beginPath();
    context.arc(150, 150, 105, 0, Math.PI * 2, false);
    context.stroke();//обводимо кольором strokeStyle;
    context.drawImage(sun, 0, 0, 300, 300);

    window.requestAnimationFrame(draw);
}

//Годинник
function getTime() {
    let currentDate = new Date;
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let seconds = currentDate.getSeconds();

    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    document.getElementById("clock").innerHTML = hours + ":" + minutes + ":" + seconds;
    setTimeout(getTime, 1000);
}

getTime();




//Test

//All answer option

const option1 = document.querySelector(".option1");
option2 = document.querySelector(".option2");
option3 = document.querySelector(".option3");
option4 = document.querySelector(".option4");

//All our options
const optionElements = document.querySelectorAll(".option");

const question = document.getElementById("question");
numberOfQuestion = document.getElementById("number-of-question");
numberOfAllQuestion = document.getElementById("number-of-all-questions");

let indexOfQuestion; //index of current answer
indexOfPage = 0; //index of page

const answersTracker = document.getElementById("answers-tracker");//color
const btnNext = document.getElementById("btn-next");//button

let score = 0; //score of true answers

const correctAnswer = document.getElementById("correct-answer");
numberOfAllQuestion2 = document.getElementById("number-of-all-questions-2");
btnTryAgain = document.getElementById("btn-try-again");

const questions = [
    {
        question: "Як в JavaScript вирахувати відсоток від числа?",
        options: [
            "Так не можна робити в JavaScript",
            "Операто :%",
            "Помножити на кількість відсотків і поділити на 100",
            "Викликати метод FindPercent()",
        ],
        rightAnswer: 2,
    },
    {
        question: "Результат виразу '13' + 7?",
        options: [
            "20",
            "137",
            "undefined",
            "null",
        ],
        rightAnswer: 1,
    },
    {
        question: "Що таке веб-сайт?",
        options: [
            "Сукупність веб-сторінок певної тематики із системою навігації",
            "Щось в інтернеті",
            "Сторінки в підручнику з інформатики",
            "Набір зошитів у портфелі",
        ],
        rightAnswer: 0,
    },
    {
        question: "Який кінцевий етап створення веб-сайта?",
        options: [
            "Публікація його в інтернеті, популяризація та підтримка роботи",
            "Художнє оформлення сторінок та програмування сайту",
            "Розміщення веб-сторінок на сервері та наповнення даними",
            "Художнє оформлення та наповнення даними",
        ],
        rightAnswer: 2,
    },
    {
        question: "Хто автор мови програмування JavaScript?",
        options: [
            "Брендан Айк",
            "Дуглас Крокфорд ",
            "Джеймс Гаррет",
            "Білл Гейтс",
        ],
        rightAnswer: 0,
    },
    {
        question: "Яким тегом починається кожна HTML сторінка?",
        options: [
            "title",
            "html",
            "body",
            "div",
        ],
        rightAnswer: 1,
    },
    {
        question: "JavaScript придатна для розв'язування завдань, таких як:",
        options: [
            "опрацювання форм ",
            "перевірка достовірності даних",
            "кодування документів у Web-системі",
            "виконання дій над текстовими і числовими значеннями",
        ],
        rightAnswer: 0,
    },
    {
        question: "На JavaScript не можна...?",
        options: [
            "Погано писати",
            "Створювати десктопні програми",
            "Створювати ігри",
            "Дистанційно керувати гаджетами",
        ],
        rightAnswer: 0,
    },
];

numberOfAllQuestion.innerHTML = questions.length; //all questions

const load = () => {  //showing all answers
    question.innerHTML = questions[indexOfQuestion].question; //question
    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];
    numberOfQuestion.innerHTML = indexOfPage + 1; //install a number of page
    indexOfPage++;
};

let completedAnswers = [];

const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDuplicate = false;

    if (indexOfPage == questions.length) {
        quizOver();
    } else {
        if (completedAnswers.length > 0) {
            completedAnswers.forEach(item => {
                if (item == randomNumber) {
                    hitDuplicate = true;
                }
            });
            if (hitDuplicate) {
                randomQuestion();
            } else {
                indexOfQuestion = randomNumber;
                load();
                completedAnswers.push(indexOfQuestion);//push arr
            }
        }
        if (completedAnswers == 0) {
            indexOfQuestion = randomNumber;
            load();
            completedAnswers.push(indexOfQuestion);//push arr
        }
    }
};

const checkAnswer = el => { //check a click
    if (el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
        el.target.classList.add("correct");// if answer correct bgc green
        updateAnswerTracker("correct");
        score++;
    } else {
        el.target.classList.add("wrong");//wrong bgc red
        updateAnswerTracker("wrong")
    }
    disabledOptions();
}

const disabledOptions = () => {
    optionElements.forEach(item => {
        item.classList.add("disabled");//buttons disable
        if (item.dataset.id == questions[indexOfQuestion].rightAnswer) {
            item.classList.add("correct");//anyway show correct answer
        }
    })
}

const enableOptions = () => { //remove classes when showed new question
    optionElements.forEach(item => {
        item.classList.remove("disabled", "correct", "wrong");
    })
};

const answerTracker = () => {
    questions.forEach(() => {
        const div = document.createElement("div");
        answersTracker.appendChild(div);
    })
}

const updateAnswerTracker = status => {
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`)
};

const validate = () => {
    if (!optionElements[0].classList.contains("disabled")) {
        alert("Input some answer");//Зробити модальне вікно
    } else {
        randomQuestion();
        enableOptions();
    }
};

btnNext.addEventListener("click", validate);

for (let option of optionElements) {
    option.addEventListener("click", e => checkAnswer(e));
}

const quizOver = () => {
    correctAnswer.innerHTML = score;
    numberOfAllQuestion2.innerHTML = questions.length;
    document.querySelector(".quiz-container").classList.add("hide");
    document.querySelector(".quiz-over-modal").classList.remove("hide");
    
};

const tryAgain = () => {
    window.location.reload();
}

btnTryAgain.addEventListener("click",tryAgain);

window.addEventListener("load", () => { //random questions from all obj
    randomQuestion();
    answerTracker();
});
