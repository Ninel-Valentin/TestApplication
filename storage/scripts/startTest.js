import { setCookie, getCookie, deleteCookie } from './utils/cookieService.js';

setCookie('score', '0|0', 30);

const timer = document.querySelector("h2#timer");

const existingQ = getCookie('questions');
const existingJson = JSON.parse(existingQ);
var remainingQuestions = existingJson ? [...existingJson] : [];

if (remainingQuestions.length) {
    var timePerQuestion;
    while (!timePerQuestion) {
        const val = prompt('How many seconds do you need for each question?')
        if (isNaN(+val)) {
            alert('Try again with a number please!');
        } else timePerQuestion = +val;
    }
    var timeout = startQuestion();
} else {
    alert('There are no questions added into the application!');
    window.location.href = "../index.js";
}

document.querySelector('div#markYes').addEventListener('click', () => {
    const score = getCookie('score');
    var [y, n] = score.split('|');
    y++;
    setCookie('score', `${y}|${n}`);
    document.querySelectorAll('span.label').forEach(x => x.innerText = x.innerText.replace(/Correct: \d+ vs Wrong: \d+/g, `Correct: ${y || 0} vs Wrong: ${n || 0}`));
    swapPanels(false);
    if (remainingQuestions.length) {
        clearInterval(timeout);
        timeout = startQuestion();
    } else
        FinishTest();
});
document.querySelector('div#markNo').addEventListener('click', () => {
    const score = getCookie('score');
    var [y, n] = score.split('|');
    n++;
    setCookie('score', `${y}|${n}`);
    document.querySelectorAll('span.label').forEach(x => x.innerText = x.innerText.replace(/Correct: \d+ vs Wrong: \d+/g, `Correct: ${y || 0} vs Wrong: ${n || 0}`));
    swapPanels(false);
    if (remainingQuestions.length) {
        timeout = startQuestion();
    } else
        FinishTest();
});
document.querySelector('div#showAnswer').addEventListener('click', () => {
    swapPanels(true);
});

// !Functions
function FinishTest() {
    const score = getCookie('score');
    var [y, n] = score.split('|');
    alert(`Congratulations! You have finished all questions getting ${y} correct and ${n} wrong.`);
    window.location.href = "../index.js";
}

function startQuestion() {
    let timeText = `00:${timePerQuestion > 9 ? timePerQuestion : "0" + (+timePerQuestion).toString()}`;
    timer.innerText = timeText
    var time = timeText;

    const timeout = setInterval(() => {
        time = extractSecond(time);
        timer.innerText = time;
        if (time == '00:00')
            clearInterval(timeout);
    }, 1000);

    const randomIndex = randomIntFromInterval(0, remainingQuestions.length - 1);
    const { q, a } = remainingQuestions.at(randomIndex);
    remainingQuestions.splice(randomIndex, 1);

    const { y, n } = getCookie('score').split('|');

    const count = existingJson.length - remainingQuestions.length;
    document.querySelectorAll('span.label').forEach(x => x.innerText = `Question ${count} / ${existingJson.length} total questions. (Correct: ${y || 0} vs Wrong: ${n || 0})`);
    document.querySelectorAll('span.q').forEach(x => x.innerText = q);
    document.querySelector('span.a').innerText = a;

    return timeout;
}

function swapPanels(showAnswer) {
    const aPanel = document.querySelector('section#answerPanel');
    const qPanel = document.querySelector('section#questionPanel');

    aPanel.className = showAnswer ? '' : 'hidden';
    qPanel.className = showAnswer ? 'hidden' : '';
    if (showAnswer) clearInterval(timeout);
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function extractSecond(time) {
    var [minutes, seconds] = time.split(":");
    if (seconds == 0) {
        if (minutes == 0) {
            alert("Time is out!");
        }
        else {
            minutes--;
            seconds = 59;
        }
    } else seconds--;

    return `${minutes > 9 ? minutes : "0" + (+minutes).toString()}:${seconds > 9 ? seconds : "0" + (+seconds).toString()}`;
}