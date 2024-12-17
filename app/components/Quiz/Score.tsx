interface ScoreProps {
  score: number;
  totalQuestions: number;
  onClick: () => void;
  questions: {
    question: string;
    correctAnswer: string;
    options?: string[];
  }[];
  userAnswers: string[];
}

export default function Score({ score, totalQuestions, onClick, questions,
  userAnswers }: ScoreProps) {
  const percentage = (score / totalQuestions) * 100; // Calculate score percentage
  const circumference = 2 * Math.PI * 90; // Circle circumference (radius = 90)

  const incorrectQuestions = questions.filter(
    (q, index) => userAnswers[index] !== q.correctAnswer
  );

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Heading */}
      <h2 className="text-primary text-2xl font-bold mb-6">Your Score</h2>

      {/* Circular Progress Bar */}
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Outer Circle - Grey Outline */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r="90"
            className="stroke-tertiary-container" /* Light Grey */
            strokeWidth="15"
            fill="transparent"
          />
          {/* Dynamic Progress Circle */}
          <circle
            cx="100"
            cy="100"
            r="90"
            className="stroke-primary" /* Green for correct answers */
            strokeWidth="15"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (percentage / 100) * circumference}
            strokeLinecap="round"
          />
        </svg>

        {/* Center Text */}
        <div className="absolute text-center">
          <p className="text-primary text-lg font-semibold">
            Wrong: {totalQuestions - score}
          </p>
          <p className="text-primary text-lg font-semibold">
            Right: {score}
          </p>
        </div>
      </div>



      <button
              onClick={onClick}
              className="mt-6 px-6 py-2 rounded-full bg-primary text-white hover:bg-inversePrimary hover:text-primary transition duration-200"
            >
              Retake Quiz
            </button>

            {/* Incorrect Questions Section */}
      {incorrectQuestions.length > 0 && (
        <div className="w-full max-w-2xl mt-6 text-left">
          <h3 className="text-primary text-xl font-bold mb-4">Review Incorrect Answers</h3>
          <ul className="space-y-4">
            {incorrectQuestions.map((q, index) => (
              <li key={index} className="p-4 rounded-lg bg-gray-100 shadow">
                <p className="text-lg font-semibold mb-2 text-primary">
                  Q: {q.question}
                </p>
                <p className="text-sm">
                  <span className="font-bold text-red-500">Your Answer:</span>{" "}
                  {userAnswers[questions.indexOf(q)] || "No Answer"}
                </p>
                <p className="text-sm">
                  <span className="font-bold text-green-500">Correct Answer:</span>{" "}
                  {q.correctAnswer}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
