interface NavigationProps {
  currentIndex: number;
  totalQuestions: number;
  userAnswer: string | null;
  onNavigate: (direction: "prev" | "next") => void;
}

export default function Navigation({
  currentIndex,
  totalQuestions,
  userAnswer,
  onNavigate,
}: NavigationProps) {
  return (
    <div className="flex justify-center gap-4 mt-6">
      {/* Previous Button - Always Enabled (except for the first question) */}
      {currentIndex > 0 && (
        <button
          onClick={() => onNavigate("prev")}
          className="px-6 py-2 rounded-full bg-tertiary text-tertiary-onTertiary
    hover:bg-tertiary-container hover:text-tertiary-onContainer transition duration-200"
        >
          Previous
        </button>
      )}

      {/* Next Button - Enabled only when the current question has a selected answer */}
      {currentIndex < totalQuestions - 1 && (
        <button
          onClick={() => onNavigate("next")}
          disabled={!userAnswer}
          className={`px-6 py-2 rounded-full transition duration-200
            ${
              !userAnswer
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-primary-container text-primary hover:bg-primary hover:text-white"
            }`}
        >
          Next
        </button>
      )}
    </div>
  );
}
