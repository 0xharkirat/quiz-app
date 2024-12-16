'use client';

import { useState } from 'react';
import questions from '../../data/questions.json';

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>(Array(questions.length).fill(null));
  const [score, setScore] = useState(0);
  const [consecutiveIncorrect, setConsecutiveIncorrect] = useState(0);
  const [reviewMessage, setReviewMessage] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (answer: string) => {
    const isCorrect = answer === currentQuestion.correctAnswer;

    // Update user's answer
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = answer;
    setUserAnswers(updatedAnswers);

    if (isCorrect) {
      setConsecutiveIncorrect(0);
      setReviewMessage(false);

      if (userAnswers[currentQuestionIndex] !== currentQuestion.correctAnswer) {
        setScore((prevScore) => prevScore + 1);
      }
    } else {
      setConsecutiveIncorrect((prev) => prev + 1);

      if (consecutiveIncorrect + 1 >= 2) {
        setReviewMessage(true);
      }

      if (userAnswers[currentQuestionIndex] === currentQuestion.correctAnswer) {
        setScore((prevScore) => prevScore - 1);
      }
    }
  };

  const handleNavigation = (direction: 'prev' | 'next') => {
    if (reviewMessage) {
      alert('Please review the course before continuing.');
      return;
    }

    if (direction === 'next' && currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (direction === 'prev' && currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div>
      <h2>{currentQuestion.question}</h2>
      {currentQuestion.type === 'multiple_choice' && (
        <ul>
          {currentQuestion.options && currentQuestion.options.map((option) => (
            <li key={option}>
              <button
                onClick={() => handleAnswer(option)}
                style={{
                  backgroundColor: userAnswers[currentQuestionIndex] === option ? 'lightblue' : 'white',
                }}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
      {currentQuestion.type === 'true_false' && (
        <div>
          <button
            onClick={() => handleAnswer('true')}
            style={{
              backgroundColor: userAnswers[currentQuestionIndex] === 'true' ? 'lightblue' : 'white',
            }}
          >
            True
          </button>
          <button
            onClick={() => handleAnswer('false')}
            style={{
              backgroundColor: userAnswers[currentQuestionIndex] === 'false' ? 'lightblue' : 'white',
            }}
          >
            False
          </button>
        </div>
      )}

      {reviewMessage && (
        <div style={{ color: 'red', marginTop: '20px' }}>
          <p>Please review the course before continuing.</p>
        </div>
      )}

      <div style={{ marginTop: '20px' }}>
        {currentQuestionIndex > 0 && (
          <button onClick={() => handleNavigation('prev')}>Previous</button>
        )}
        {currentQuestionIndex < questions.length - 1 && (
          <button
            onClick={() => handleNavigation('next')}
            disabled={!userAnswers[currentQuestionIndex]}
          >
            Next
          </button>
        )}
      </div>

      <div style={{ marginTop: '20px' }}>
        <p>
          Question {currentQuestionIndex + 1} of {questions.length}
        </p>
        <p>Score: {score}</p>
      </div>
    </div>
  );
}
