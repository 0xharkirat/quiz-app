interface QuestionProps {
    question: {
      question: string;
      type: string;
      options?: string[];
    };
    userAnswer: string | null;
    onAnswer: (answer: string) => void;
  }
  
  export default function Question({ question, userAnswer, onAnswer }: QuestionProps) {
    return (
      <div>
        <h2>{question.question}</h2>
        {question.type === 'multiple_choice' && (
          <ul>
            {question.options?.map((option) => (
              <li key={option}>
                <button
                  onClick={() => onAnswer(option)}
                  style={{ backgroundColor: userAnswer === option ? 'lightblue' : 'white' }}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        )}
        {question.type === 'true_false' && (
          <div>
            <button
              onClick={() => onAnswer('true')}
              style={{ backgroundColor: userAnswer === 'true' ? 'lightblue' : 'white' }}
            >
              True
            </button>
            <button
              onClick={() => onAnswer('false')}
              style={{ backgroundColor: userAnswer === 'false' ? 'lightblue' : 'white' }}
            >
              False
            </button>
          </div>
        )}
      </div>
    );
  }
  