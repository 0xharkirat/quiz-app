import Option from "./Option";

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
    <div className="mb-6">
       {/* Fixed Height Question Text Container */}
       <div className="h-24 flex items-center justify-center mb-6">
        <h2 className="text-primary text-2xl font-bold text-center">
          {question.question}
        </h2>
      </div>
      {/* Fixed Height Options Container */}
      <div className="h-48 flex flex-col justify-center gap-y-6 mb-12">
        {/* Multiple Choice Options */}
        {question.type === "multiple_choice" && (
          <ul>
            {question.options?.map((option, index) => (
              <li key={option}>
                <Option
                  text={option}
                  letter={String.fromCharCode(65 + index)} // A, B, C, ...
                  isSelected={userAnswer === option}
                  onClick={() => onAnswer(option)}
                />
              </li>
            ))}
          </ul>
        )}

        {/* True/False Options */}
        {question.type === "true_false" && (
          <div>
            <Option
              text="True"
              letter="T"
              isSelected={userAnswer === "true"}
              onClick={() => onAnswer("true")}
            />
            <Option
              text="False"
              letter="F"
              isSelected={userAnswer === "false"}
              onClick={() => onAnswer("false")}
            />
          </div>
        )}
      </div>
    </div>
  );
}
