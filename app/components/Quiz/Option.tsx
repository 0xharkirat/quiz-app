interface OptionProps {
    text: string;
    letter: string;
    isSelected: boolean;
    onClick: () => void;
  }
  
  export default function Option({ text, letter, isSelected, onClick }: OptionProps) {
    return (
      <button
        onClick={onClick}
        className={`max-w-md mx-auto w-full flex items-center gap-4 p-4 mb-2 rounded-2xl text-left transition duration-200 
          shadow-md
          ${
            isSelected
              ? "bg-inversePrimary text-white" // Selected State
              : "bg-white text-primary"         // Normal State
          }
          hover:outline hover:outline-2 hover:outline-primary`}
      >
        {/* Circular Avatar */}
        <div
          className={`w-10 h-10 flex items-center justify-center rounded-full font-bold
            ${
              isSelected
                ? "bg-primary text-white"     // Selected State
                : "bg-inversePrimary text-primary" // Normal State
            }`}
        >
          {letter}
        </div>
  
        {/* Option Text */}
        <span className="text-base font-medium">{text}</span>
      </button>
    );
  }
  