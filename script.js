let questions = [];
fetch('task1_q.json')
    .then(response => response.json())
    .then(data => {
        questions = data;
        renderQuiz();
    });

function renderQuiz() {
    const quizDiv = document.getElementById('quiz');
    quizDiv.innerHTML = '';
    questions.forEach((q, idx) => {
        const qDiv = document.createElement('div');
        qDiv.innerHTML = `<p>${q.question}</p>`;
        q.options.forEach((option, optIdx) => {
            qDiv.innerHTML += `
                <label>
                    <input type="radio" name="q${idx}" value="${optIdx}">
                    ${option}
                </label><br>`;
        });
        quizDiv.appendChild(qDiv);
    });
}

function submitQuiz() {
    const userAnswers = questions.map((_, idx) => {
        const radios = document.querySelectorAll(`input[name="q${idx}"]`);
        for (let radio of radios) {
            if (radio.checked) return parseInt(radio.value);
        }
        return null;
    });
    const answersJSON = { answers: userAnswers };
    pushAnswersToGitHub(answersJSON);
}

async function pushAnswersToGitHub(answersJSON) {
    const token = prompt('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');
    const repo = 'Quiz-Platform';
    const owner = 'wxyzabcd124';
    const branch = 'main';
    const fileContent = btoa(JSON.stringify(answersJSON, null, 2));

    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/student_answers.json`;

    const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
            'Authorization': `token ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: 'Submit quiz answers',
            content: fileContent,
            branch: branch
        })
    });

    if (response.ok) {
        alert('✅ Answers submitted to your GitHub repo! Open a Pull Request to complete.');
    } else {
        alert('❌ Submission failed. Check token, repo name, or permissions.');
    }
}
