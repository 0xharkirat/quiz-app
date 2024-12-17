interface ScoreBoardProps {
    currentIndex: number;
    totalQuestions: number;
    score: number;
  }
  
  export default function ScoreBoard({ currentIndex, totalQuestions, score }: ScoreBoardProps) {
    return (
      <div style={{ marginTop: '20px' }}>
        <p>
          Question {currentIndex + 1} of {totalQuestions}
        </p>
        <p>Score: {score}</p>
      </div>
    );
  }
  