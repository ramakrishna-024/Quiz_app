const questionBook = [
    {
        id: "q-1",
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: "Paris"
    },
    {
        id: "q-2",
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Jupiter", "Saturn", "Mars"],
        correctAnswer: "Jupiter"
    },
    {
        id: "q-3",
        question: "What is the chemical symbol for gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        correctAnswer: "Au"
    },
    {
        id: "q-4",
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["William Shakespeare", "Charles Dickens", "Mark Twain", "Jane Austen"],
        correctAnswer: "William Shakespeare"
    },
    {
        id: "q-5",
        question: "What is the largest mammal?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        correctAnswer: "Blue Whale"
    }
];

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const scoreElement = document.getElementById("score");
const nextButton = document.getElementById("next-button");

let score = 0;
let currentQuestion = 0;
let answered = false;

function displayQuestion() {
    const { question, options, correctAnswer } = questionBook[currentQuestion];
    answered = false;
    questionElement.textContent = question;
    optionsElement.replaceChildren();
    nextButton.disabled = true;

    options.forEach((option) => {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = option;
        button.className = "button";
        button.addEventListener("click", () => {
            if (answered) {
                return;
            }

            answered = true;
            if (option === correctAnswer) {
                button.style.backgroundColor = "green";
                score += 1;
            } else {
                button.style.backgroundColor = "red";
                score -= 0.25;
            }

            scoreElement.textContent = `Score: ${score} / ${questionBook.length}`;
            optionsElement.querySelectorAll("button").forEach((optionButton) => {
                optionButton.disabled = true;
            });
            nextButton.disabled = false;
        });
        optionsElement.append(button);
    });
}

function nextQuestion() {
    if (!answered) {
        return;
    }

    currentQuestion += 1;
    if (currentQuestion === questionBook.length) {
        questionElement.textContent = "Quiz completed successfully!";
        optionsElement.replaceChildren();
        scoreElement.textContent = `Your score: ${score} out of ${questionBook.length}`;
        nextButton.disabled = true;
        nextButton.hidden = true;
        return;
    }

    displayQuestion();
}
nextButton.addEventListener("click", nextQuestion);
scoreElement.textContent = `Score: ${score} / ${questionBook.length}`;
displayQuestion();
