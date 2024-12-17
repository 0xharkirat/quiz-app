interface NavigationProps {
  currentIndex: number;
  totalQuestions: number;
  userAnswer: string | null;
  onNavigate: (direction: "prev" | "next") => void;
  onSubmit: () => void; // Add Submit handler
}

export default function Navigation({
  currentIndex,
  totalQuestions,
  userAnswer,
  onNavigate,
  onSubmit,
}: NavigationProps) {
  return (
    <div className="max-w-md mx-auto flex justify-between items-center mt-6 w-full">
      {/* Fixed Width for Both Buttons */}
      <div className="w-32">
        {/* Previous Button */}
        {currentIndex > 0 ? (
          <button
            onClick={() => onNavigate("prev")}
            className="w-full px-6 py-2 rounded-full bg-tertiary-container text-tertiary-onContainer
              hover:bg-tertiary hover:text-tertiary-onTertiary transition duration-200"
          >
            Previous
          </button>
        ) : (
          <div className="invisible w-full px-6 py-2 rounded-full">Placeholder</div>
        )}
      </div>

      <div className="w-32">
        {/* Submit Button on Last Question */}
        {currentIndex === totalQuestions - 1 ? (
          <button
            onClick={onSubmit}
            disabled={!userAnswer}
            className={`w-full px-6 py-2 rounded-full transition duration-200
              ${
                !userAnswer
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-primary text-white hover:bg-inversePrimary hover:text-primary"
              }`}
          >
            Submit
          </button>
        ) : (
          <button
            onClick={() => onNavigate("next")}
            disabled={!userAnswer}
            className={`w-full px-6 py-2 rounded-full transition duration-200
              ${
                !userAnswer
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-primary text-white hover:bg-inversePrimary hover:text-primary"
              }`}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
