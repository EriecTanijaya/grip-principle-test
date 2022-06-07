var answersSubmitted = []; // {index: 0, questionIndex}
var questionsAnswers = [
    {
        q: "I value",
        a:["Justice", "Mercy"]
    },
    {
        q: "I appreciate a wide variety of music",
        a:["Rarely", "Occasionally", "Sometiems", "Usualyy", "Almost always"]
    },
    {
        q: "A quiet weekend at home is",
        a:["BOring", "rejuvenating"]
    },
    {
        q: "I prefer speakers that communicate",
        a:["Litterally", "Figuratively"]
    },
    {
        q: "With people, I am more often",
        a:["Brief and to the point", "friendly and warm"]
    }
];
var soalIndex = 0;

function init() {
    shuffle(questionsAnswers);
    showQuestion();
}

function getAnswer(val) {
    var answer = {
        index: val.value,
        questionIndex: val.id
    }
    answersSubmitted.push(answer);

    clearQuestion();
    
    if (soalIndex == questionsAnswers.length - 1) {
        showResult();
        soalIndex = 0;
        answersSubmitted.length = 0;
    } else {
        soalIndex++;
        showQuestion();
    }
}

function showResult() {
    var result = `<p> your answers: </p>`;
    result += `<ol> \n`;

    for (let i = 0; i < answersSubmitted.length; i++) {
        var answerIndex = answersSubmitted[i].index;

        var master = questionsAnswers[answersSubmitted[i].questionIndex]

        var question = master.q;
        var answer = master.a[answerIndex];

        result += `<li>` + question + `: ` + answer + `</li>`;
    }

    result += `\n </ol>`;

    document.getElementById("questions").innerHTML = result;
}

function clearQuestion() {
    var choice = document.getElementById("choices");
    choice.remove();
}

function showQuestion() {
    document.getElementById("questions").innerHTML = `<p>${questionsAnswers[soalIndex].q}</p>`;

    var choicesDiv = document.createElement("div");
    choicesDiv.id = "choices";

    var choices = questionsAnswers[soalIndex].a;

    var choicesHTML = "";
    for (let i = 0; i < choices.length; i++) {
        choicesHTML += `<button type="button" onclick="getAnswer(this)" value="` + i + `" id="` + soalIndex + `">` + choices[i] +`</button>\n`;
    }

    choicesDiv.innerHTML += choicesHTML;
    document.body.appendChild(choicesDiv);
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

