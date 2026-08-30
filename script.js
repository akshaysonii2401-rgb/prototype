```javascript
let selectedSubject = "";
let selectedAction = "";


// SELECT SUBJECT
function selectSubject(subject) {

    selectedSubject = subject;

    document.getElementById("selected-subject").innerText =
        "📚 " + subject;

    showScreen("action-screen");
}


// SELECT ACTION
function selectAction(action) {

    selectedAction = action;

    document.getElementById("action-title").innerText =
        "✨ " + action + " " + selectedSubject;

    showScreen("topic-screen");
}


// GENERATE PROTOTYPE RESPONSE
function generateResponse() {

    const topic = document
        .getElementById("topic-input")
        .value
        .trim();

    if (topic === "") {
        alert("Please enter a topic!");
        return;
    }

    const result = document.getElementById("result");

    result.innerHTML = `
        <strong>Subject:</strong> ${selectedSubject}<br>
        <strong>Task:</strong> ${selectedAction}<br>
        <strong>Topic:</strong> ${topic}

        <br><br>

        🤖 <strong>Prototype Response</strong>

        <p style="margin-top:10px;">
            Your AI response will appear here.
        </p>

        <p style="margin-top:10px;">
            Later, we'll connect this section to an AI model
            so it can actually explain topics, create notes,
            generate quizzes, or give practice problems.
        </p>
    `;

    showScreen("result-screen");
}


// SHOW SCREEN
function showScreen(screenId) {

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    document
        .getElementById(screenId)
        .classList.add("active");
}


// BACK TO SUBJECTS
function goBack() {
    showScreen("subject-screen");
}


// BACK TO ACTIONS
function goBackToActions() {
    showScreen("action-screen");
}


// RESTART
function restart() {

    selectedSubject = "";
    selectedAction = "";

    document.getElementById("topic-input").value = "";

    showScreen("subject-screen");
}
```
