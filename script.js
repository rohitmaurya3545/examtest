const questions = [
    { question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Rome"], answer: "Paris" },
    { question: "What is the largest planet in our solar system?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: "Jupiter" },
    { question: "What is the hardest natural substance?", options: ["Gold", "Diamond", "Iron", "Silver"], answer: "Diamond" },
    { question: "Who wrote 'To Kill a Mockingbird'?", options: ["Harper Lee", "Mark Twain", "J.K. Rowling", "Ernest Hemingway"], answer: "Harper Lee" },
    { question: "What is the smallest country in the world?", options: ["Monaco", "San Marino", "Vatican City", "Liechtenstein"], answer: "Vatican City" },
    { question: "What element does 'O' represent on the periodic table?", options: ["Oxygen", "Gold", "Silver", "Iron"], answer: "Oxygen" },
    { question: "Who painted the Mona Lisa?", options: ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Claude Monet"], answer: "Leonardo da Vinci" },
    { question: "Which planet is known as the Red Planet?", options: ["Mars", "Venus", "Mercury", "Jupiter"], answer: "Mars" },
    { question: "What is the largest ocean on Earth?", options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"], answer: "Pacific Ocean" },
    { question: "What is the chemical symbol for gold?", options: ["Au", "Ag", "Pb", "Fe"], answer: "Au" },

    { question: "What is the capital of Japan?", options: ["Tokyo", "Seoul", "Beijing", "Hanoi"], answer: "Tokyo" },
    { question: "Which element has the atomic number 1?", options: ["Hydrogen", "Helium", "Oxygen", "Nitrogen"], answer: "Hydrogen" },
    { question: "Who wrote '1984'?", options: ["George Orwell", "Aldous Huxley", "Ray Bradbury", "J.D. Salinger"], answer: "George Orwell" },
    { question: "What is the largest mammal in the world?", options: ["Elephant", "Blue Whale", "Giraffe", "Shark"], answer: "Blue Whale" },
    { question: "What year did the Titanic sink?", options: ["1912", "1905", "1898", "1920"], answer: "1912" },
    { question: "What is the capital of Canada?", options: ["Ottawa", "Toronto", "Vancouver", "Montreal"], answer: "Ottawa" },
    { question: "Who discovered penicillin?", options: ["Alexander Fleming", "Louis Pasteur", "Marie Curie", "Isaac Newton"], answer: "Alexander Fleming" },
    { question: "What is the hardest rock?", options: ["Granite", "Basalt", "Quartzite", "Marble"], answer: "Quartzite" },
    { question: "What is the capital of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Brisbane"], answer: "Canberra" },
    { question: "What is the main ingredient in guacamole?", options: ["Tomato", "Avocado", "Pepper", "Onion"], answer: "Avocado" }
];

let userAnswers = new Array(questions.length).fill(null);
let currentQuestionIndex = 0;
let timeLeft = 3600; // 1 hour in seconds
let timerInterval;

function login() {
    const userEmail = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (userEmail && password) {
        document.getElementById("login").style.display = "none";
        startTest();
    } else {
        alert("Please enter both email and password.");
    }
}

function startTest() {
    document.getElementById("test").style.display = "flex";
    showQuestion(currentQuestionIndex);
    generateQuestionNav();
    startTimer();
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;

        const hours = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = timeLeft % 60;

        document.getElementById("timer").innerText = `Time Left: ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            submitTest(); // Automatically submit when time runs out
        }
    }, 1000);
}

function showQuestion(index) {
    const questionBox = document.getElementById("questionBox");
    const q = questions[index];
    questionBox.innerHTML = `
        <p><strong>${q.question}</strong></p>
        ${q.options.map((option, i) => `
            <div class="option-label">
                <input type="radio" id="option${index}${i}" name="question${index}" value="${option}" onchange="saveAnswer(${index}, this.value)" ${userAnswers[index] === option ? 'checked' : ''}>
                <label for="option${index}${i}">${String.fromCharCode(65 + i)}. ${option} <span class="tick">&#10003;</span></label>
            </div>
        `).join('')}
    `;

    document.getElementById("prevBtn").disabled = index === 0;
    document.getElementById("nextBtn").disabled = index === questions.length - 1;
    document.querySelector('.submit-button').style.display = index === questions.length - 1 ? 'block' : 'none';
}

function saveAnswer(index, answer) {
    userAnswers[index] = answer;
    updateNavButton(index);
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion(currentQuestionIndex);
    }
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
    }
}

function generateQuestionNav() {
    const questionNav = document.getElementById("questionNav");
    questionNav.innerHTML = "";
    questions.forEach((_, index) => {
        const button = document.createElement("button");
        button.innerText = `${index + 1}`;
        button.onclick = () => navigateToQuestion(index);
        questionNav.appendChild(button);
        updateNavButton(index);
    });
}

function updateNavButton(index) {
    const button = document.querySelector(`#questionNav button:nth-child(${index + 1})`);
    if (userAnswers[index]) {
        button.style.backgroundColor = "#28a745"; // Green
        button.style.color = "white";
    } else {
        button.style.backgroundColor = "#007bff"; // Blue
        button.style.color = "white";
    }
}

function navigateToQuestion(index) {
    currentQuestionIndex = index;
    showQuestion(currentQuestionIndex);
}

function submitTest() {
    clearInterval(timerInterval); // Stop the timer
    const score = evaluateTest();
    document.getElementById("test").style.display = "none";
    document.getElementById("score").innerText = `Your score is: ${score}/${questions.length}`;
    document.getElementById("finish").style.display = "block";
}

function evaluateTest() {
    return questions.reduce((score, question, index) => {
        if (userAnswers[index] === question.answer) {
            return score + 1;
        }
        return score;
    }, 0);
}
