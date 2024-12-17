interface NavigationProps {
    currentIndex: number;
    totalQuestions: number;
    userAnswer: string | null;
    onNavigate: (direction: 'prev' | 'next') => void;
  }
  
  export default function Navigation({ currentIndex, totalQuestions, userAnswer, onNavigate }: NavigationProps) {
    return (
      <div style={{ marginTop: '20px' }}>
        {currentIndex > 0 && <button onClick={() => onNavigate('prev')}>Previous</button>}
        {currentIndex < totalQuestions - 1 && (
          <button onClick={() => onNavigate('next')} disabled={!userAnswer}>
            Next
          </button>
        )}
      </div>
    );
  }
  