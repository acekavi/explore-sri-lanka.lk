// Query Selectors
const startQuizBtn = document.querySelector(".start-quiz");
const headingDiv = document.querySelector(".heading");
const quizQuestionsDiv = document.querySelector(".quiz-questions");
const answersArray = [1,3,4,1,3,4,3,3,4];
const checkQuizBtn = document.querySelector(".check-quiz");
const bonusQuestion = document.querySelector(".bonusQuestion");
const timerDisplay = document.querySelector(".timerDiv");

const finalScore = document.querySelector("#score");
const finalTime = document.querySelector("#timeTaken");

const svgBackground = document.querySelector(".top-left-svg");

const quizArray = document.querySelectorAll(".question"); // Getting all the question in a node list

let sec = 60; //timer
let score = 2; //score
let executed = false;   //A flag to prevent multiple runs of a function

//Functions
function getRadioValue(radioArray){
    var i;
    for( i = 0; i < radioArray.length; i++){
        if (radioArray[i].checked){
            return radioArray[i].value;
        }
    }
    return"";
}

// Events
startQuizBtn.addEventListener("click", ()=>{
    headingDiv.style.display = "none";
    quizQuestionsDiv.style.display = "flex";

    //timer
    timer = setInterval(() => { 
        sec--;
        if (sec == 0){
            clearTimeout(timer);
            if(!executed){
                checkQuizBtn.click();
            };

        }
        timerDisplay.innerHTML = `Time: ${sec}s`;
        },1000);
});

checkQuizBtn.addEventListener("click", ()=>{
    if (!executed){
        //  Modifying the questions
        quizArray.forEach(
            (currentValue, currentIndex)=> {
                const currAnswer = answersArray[currentIndex];
                let userAnswer = null;
                const currentRadioBtns = currentValue.querySelectorAll("input");
                const currentLabels= currentValue.querySelectorAll("label");

                currentRadioBtns.forEach((currValue, currIndex)=>{
                    if(currValue.checked == true){
                        userAnswer = currValue.value;
                        if (userAnswer == currAnswer){
                            currentLabels[currIndex].classList.add("correct");
                            score = score + 2;
                        }else{
                            currentLabels[currIndex].classList.add("wrong");
                            currentLabels[currAnswer-1].classList.add("correct");
                            score--;
                        }
                    }
                    currValue.disabled = true;
                    });
                bonusQuestion.classList.add("correct");
            },
        );
        timerDisplay.remove();

        finalScore.innerHTML = `Your Score: ${Math.ceil((score/20)*100)}%`;
        finalTime.innerHTML = `Time Allocated: ${60 - sec}s`;

        executed = !executed;
        document.querySelector("button.check-quiz > span.button-text").innerHTML = "Try Again!";

        if(score >= 10){
            svgBackground.style.fill = "#8cf17e";
        }else{
            svgBackground.style.fill = "#f17e7e";
        }
    }else{
        location.reload();
    };
});