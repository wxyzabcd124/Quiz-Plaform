import json

with open('task1_a.json') as f:
    correct_answers = json.load(f)['answers']

with open('student_answers.json') as f:
    student_answers = json.load(f)['answers']

if correct_answers == student_answers:
    print("✅ Quiz Passed!")
    exit(0)
else:
    print("❌ Incorrect Answers!")
    exit(1)
