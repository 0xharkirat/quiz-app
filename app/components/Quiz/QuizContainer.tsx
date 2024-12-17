"use client";

import { useState } from "react";
import questions from "../../../data/questions.json";
import Question from "./Question";
import Navigation from "./Navigation";

import Score from "./Score";
import CustomAlert from "./CustomAlert";

export default function QuizContainer() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>(
    Array(questions.length).fill(null)
  );
  const [score, setScore] = useState(0);
  const [showWarning, setShowWarning] = useState(true); // Show warning only once
  const [consecutiveIncorrect, setConsecutiveIncorrect] = useState(0); // Track consecutive incorrect
  const [showCustomAlert, setShowCustomAlert] = useState(false);



  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false); // New state for quiz submission

  const currentQuestion = questions[currentQuestionIndex];

  // Function to reset the quiz
  const handleRetakeQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers(Array(questions.length).fill(null));
    setScore(0);
    setShowWarning(true); // Reset warning state
    setConsecutiveIncorrect(0); // Reset consecutive incorrect
    setIsQuizSubmitted(false);
  };

  const handleAnswer = (answer: string) => {
    const isCorrect = answer === currentQuestion.correctAnswer;

    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = answer;
    setUserAnswers(updatedAnswers);

    if (isCorrect) {
      setConsecutiveIncorrect(0); // Reset consecutive incorrect count
      if (userAnswers[currentQuestionIndex] !== currentQuestion.correctAnswer) {
        setScore((prev) => prev + 1);
      }
    } else {
      setConsecutiveIncorrect((prev) => prev + 1);
      if (userAnswers[currentQuestionIndex] === currentQuestion.correctAnswer) {
        setScore((prev) => prev - 1);
      }
    }
  };

  const handleNavigation = (direction: "prev" | "next") => {
    if (showWarning && consecutiveIncorrect >= 2) {
      setShowCustomAlert(true);
      setShowWarning(false); // Dismiss warning for the future
    }
    if (direction === "next" && currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else if (direction === "prev" && currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    if (showWarning && consecutiveIncorrect >= 2) {
      alert('You have answered two questions incorrectly in a row. Please review the course material before continuing.');
      setShowWarning(false); // Dismiss warning for the future
      return; // Stop submission until user acknowledges
    }
    setIsQuizSubmitted(true); // Mark the quiz as submitted
  };

  const closeAlert = () => {
    setShowCustomAlert(false); // Close the alert
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-gradient-first px-4 py-8">
      <div className="text-center w-full max-w-3xl">
        {!isQuizSubmitted ? (
          <>
            <p className="text-primary text-lg font-semibold mb-4">
              Question {currentQuestionIndex + 1} / {questions.length}
            </p>
            <Question
              question={currentQuestion}
              userAnswer={userAnswers[currentQuestionIndex]}
              onAnswer={handleAnswer}
            />

            <Navigation
              currentIndex={currentQuestionIndex}
              totalQuestions={questions.length}
              userAnswer={userAnswers[currentQuestionIndex]}
              onNavigate={handleNavigation}
              onSubmit={handleSubmit} // Pass submit handler
            />

            {/* Show Custom Alert */}
        {showCustomAlert && <CustomAlert onClose={closeAlert} />}
          </>
        ) : (
          <Score
            score={score}
            totalQuestions={questions.length}
            onClick={handleRetakeQuiz}
            userAnswers={userAnswers}
            questions={questions}
          />
        )}
      </div>
    </div>
  );
}
