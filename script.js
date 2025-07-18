let questions = [];

fetch('task1_q.json')
  .then(res => res.json())
  .then(data => {
    questions = data;
    renderQuiz();
  });

function renderQuiz() {
  const quizDiv = document.getElementById('quiz');
  quizDiv.innerHTML = '';
  questions.forEach((q, idx) => {
    const qBlock = document.createElement('div');
    qBlock.innerHTML = `<p><b>Q${idx + 1}:</b> ${q.question}</p>`;
    q.options.forEach((opt, optIdx) => {
      qBlock.innerHTML += `
        <label>
          <input type="radio" name="q${idx}" value="${optIdx}"> ${opt}
        </label><br>`;
    });
    quizDiv.appendChild(qBlock);
  });
}

function submitQuiz() {
  const answers = questions.map((_, idx) => {
    const selected = document.querySelector(`input[name="q${idx}"]:checked`);
    return selected ? parseInt(selected.value) : null;
  });

  const resultJSON = {
    answers: answers
  };

  document.getElementById('result').textContent =
    "📋 Copy this and submit in GitHub PR:\n\n" +
    JSON.stringify(resultJSON, null, 2);
}
