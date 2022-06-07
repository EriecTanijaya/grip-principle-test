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
var soalIndex = -1;
var questionProgress = -1;

function init() {
    shuffle(questionsAnswers);
    update();
}

function getAnswer(val) {
    var answer = {
        index: val.value,
        questionIndex: val.id
    }
    answersSubmitted.push(answer);
    update();
}

function reset() {
    soalIndex = -1;
    answersSubmitted.length = 0;
    questionProgress = -1;
}

function clearElement(name) {
    var target = document.getElementById(name);
    target.remove();
}

function update() {
    questionProgress++;
    soalIndex++;

    // progress bar
    var percentageValue = Math.round((questionProgress / questionsAnswers.length) * 100);
    var progress = document.getElementById("progress");
    progress.innerHTML = `<label id="progress-label">` + percentageValue + `%` + `</label>\n`;
    progress.innerHTML += `<progress id="progress-data" value="` + percentageValue +`" max="100">` + percentageValue + `</progress>`;

    
    // info
    var info = document.getElementById("info");
    info.innerHTML = `<p> ` + questionProgress + ` of ` + questionsAnswers.length + ` questions completed</p>`;
    
    // main section
    var mainSection = document.getElementById("questions");

    //check is it final answer?
    if (soalIndex == questionsAnswers.length) {
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

        mainSection.innerHTML = result;
        
        reset();
    } else {
        mainSection.innerHTML = `<p>${questionsAnswers[soalIndex].q}</p>\n`;

        var choices = questionsAnswers[soalIndex].a;
        for (let i = 0; i < choices.length; i++) {
            mainSection.innerHTML += `<button type="button" onclick="getAnswer(this)" value="` + i + `" id="` + soalIndex + `">` + choices[i] +`</button>\n`;
        }
    }
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

