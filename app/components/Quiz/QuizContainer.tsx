'use client';

import { useState } from 'react';
import questions from '../../../data/questions.json';
import Question from './Question';
import Navigation from './Navigation';
import ReviewMessage from './ReviewMessage';
// import ScoreBoard from './ScoreBoard';

export default function QuizContainer() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>(Array(questions.length).fill(null));
  const [score, setScore] = useState(0);
  const [consecutiveIncorrect, setConsecutiveIncorrect] = useState(0);
  const [reviewMessage, setReviewMessage] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (answer: string) => {
    const isCorrect = answer === currentQuestion.correctAnswer;

    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = answer;
    setUserAnswers(updatedAnswers);

    if (isCorrect) {
      setConsecutiveIncorrect(0);
      setReviewMessage(false);
      if (userAnswers[currentQuestionIndex] !== currentQuestion.correctAnswer) {
        setScore((prev) => prev + 1);
      }
    } else {
      setConsecutiveIncorrect((prev) => prev + 1);
      if (consecutiveIncorrect + 1 >= 2) setReviewMessage(true);
      if (userAnswers[currentQuestionIndex] === currentQuestion.correctAnswer) {
        setScore((prev) => prev - 1);
      }
    }
  };

  const handleNavigation = (direction: 'prev' | 'next') => {
    if (reviewMessage) {
      alert('Please review the course before continuing.');
      return;
    }
    if (direction === 'next' && currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else if (direction === 'prev' && currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="flex justify-center bg-[#F9F9FF] px-4 py-8">
      <div className='text-center w-full max-w-3xl'>
        <p className="text-primary text-lg font-semibold mb-4">
          Question {currentQuestionIndex + 1} / {questions.length}
        </p >
        <Question
          question={currentQuestion}
          userAnswer={userAnswers[currentQuestionIndex]}
          onAnswer={handleAnswer}
        />
        {reviewMessage && <ReviewMessage />}
        <Navigation
          currentIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          userAnswer={userAnswers[currentQuestionIndex]}
          onNavigate={handleNavigation}
        />
        {/* <ScoreBoard
          currentIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          score={score}
        /> */}
    </div>
    </div>
  );
}
