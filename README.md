
# Quiz App MVP

This is a simple Quiz Application MVP created as part of a job application. The project showcases React (Next.Js) and TypeScript development with a clean, modern UI, focusing on modular design and functionality.


# Task Progress
### User Requirements
- ✅ Questions can be either multiple choice (single answer only) or true/false.
- ✅ The quiz will have a total of between 3 and 10 questions.
- ✅ Users who answer two questions in a row incorrectly should be shown a message suggesting that they review the course before continuing.
- ✅ Upon completion of the quiz, the user should be shown their score.
- ✅ The quiz UI should be reactive enough to work well on both mobile and desktop (at least one breakpoint).
- ✅ As a very loose guide around UI, the design reflects ideas from The Play Way and Therapy at Home, while keeping a unique prototype focus.

### Technical Constraints
- ✅ The final task will be submitted as a single .zip file or a GitHub link.
- ✅ This prototype is built with React and TypeScript using Next.js.
- ✅ The project runs locally using npm install && npm run dev.
- ✅ No persistent state is created. Progress resets if the user refreshes the browser.
- ✅ The questions and answers are ingested from a single static JSON file (`data/questions.json`).
- ✅ LLMs were used responsibly to assist development while ensuring complete understanding of the code and its implementation


## **Total Time Taken**

### **Day 1 - 16/12/2024**  
- ⏱️ **43 Minutes**: Implemented all functionality without any CSS.  

### **Day 2 - 17/12/2024**  
- ⏱️ **15 Minutes**: Separated the code into modular components.  
- ⏱️ **2 Hours**: Designed the UI, added CSS, and fixed CSS bugs.  
- ⏱️ **1 Hour**:  
  - Fixed existing bugs.  
  - Added functionality:  
    - **Warning for consecutive incorrect answers**.  
    - **Retake Quiz** functionality.  
    - **Review incorrect questions** with correct answers.

### **Extra Work**  
- ✍️ Wrote a comprehensive `README.md` for clear documentation.

### **Total Time**  
⏱️ **~4 hours** (excluding minor refinements & `README.md`).  

# UI Screenshots

![Desktop UI](https://raw.githubusercontent.com/0xharkirat/quiz-app/refs/heads/master/readme-assets/desktop.gif)

<img src="https://raw.githubusercontent.com/0xharkirat/quiz-app/refs/heads/master/readme-assets/phone.gif" alt="Phone UI" height="600"/>


## **UI Reference**

The UI design is loosely inspired by the provided reference image. Instead of using an image for the background (as in the reference), I opted for a **gradient background** to ensure:
- A clean, minimal look.
- Improved performance and scalability.
- I used Material Theme builder to generate all the color pallete shades.
- I made the UI phone first. Because majority people use phone to access browsers.

The gradient background blends shades of the primary color:
```css
.bg-gradient-first {
  background: rgb(255, 235, 252);
  background: radial-gradient(
    circle,
    rgba(255, 235, 252, 1) 0%,
    rgba(173, 198, 255, 1) 100%
  );
}

```
### Reference Image for the UI inspiration
![](https://raw.githubusercontent.com/0xharkirat/quiz-app/refs/heads/master/readme-assets/ib.png)
---

## **Project Overview**

### Folder Structure

The project is organized for clarity and modularity. Here's a breakdown of the directory structure:

```plaintext
quiz-app/
├── app/                # Next.js entry point
│   ├── components/     # All reusable components
│   │   ├── Quiz/       # Quiz-related components
│   │   │   ├── QuizContainer.tsx   # Main logic container
│   │   │   ├── Question.tsx        # Displays questions and options
│   │   │   ├── Option.tsx          # Individual options
│   │   │   ├── Navigation.tsx      # Navigation buttons (Prev, Next, Submit)
│   │   │   ├── Score.tsx           # Final score visualization
│   │   │   ├── CustomAlert.tsx     # Custom alert dialog for warnings
│   ├── globals.css     # Global CSS styles
│   ├── layout.tsx      # Page layout
│   └── page.tsx        # Main entry point
├── data/               # Static data
│   └── questions.json  # Quiz questions data
├── public/             # Public assets (if any)
├── tailwind.config.ts  # Tailwind CSS configuration
└── README.md           # Project documentation
```

---

### **Data Directory**

The `data/` folder contains the static questions for the quiz in a JSON file `questions.json`.

#### **Data Structure**
The quiz data follows this format:

```json
[
  {
    "id": 1,
    "question": "Is the earth round?",
    "type": "true_false",
    "correctAnswer": "true"
  },
  {
    "id": 2,
    "question": "What is 2 + 2?",
    "type": "multiple_choice",
    "options": ["3", "4", "5"],
    "correctAnswer": "4"
  }
]
```

Each question contains:
- `id`: Unique identifier.
- `question`: The question text.
- `type`: Either `true_false` or `multiple_choice`.
- `options`: Array of options for multiple choice questions.
- `correctAnswer`: Correct answer to the question.

---

### **App Directory**

The `app/` directory contains the core logic and components for the Quiz App.

#### **`page.tsx`**
The entry point for the application. It renders the `QuizContainer` component.

```tsx
import QuizContainer from './components/Quiz/QuizContainer';

export default function HomePage() {
  return (
    <div>
      <QuizContainer />
    </div>
  );
}
```

---

Components
1. `QuizContainer.tsx`
- The parent container that manages:
    - State for current question index, user answers, score, and warnings.
    - Handles Next, Previous, and Submit button actions.
    - Renders the Question, Navigation, and Score components dynamically.

2. `Question.tsx`
- Displays the current question and options.
- Renders either:
    - Options for the current question.
    - Score Component after submission.


3. `Option.tsx`
- Handles individual options with:
    - Selected, unselected, and hover states.
    - Circular avatars for options like "A", "B", "True", etc.

4. `Navigation.tsx`
- Contains Previous, Next, and Submit buttons.
- Logic includes:
    - Disabled state for the Next button if the user has not selected an answer.
    - On the last question:
        - The Submit button replaces the Next button.

5. `CustomAlert.tsx`
- A custom modal that displays a warning when the user answers two consecutive questions incorrectly.
- Features:
    - A styled modal overlay with a dismissable "OK" button.
    - Only shown once using a state flag.

6. `Score.tsx`
- Displays the final score with:
    - A circular progress ring (outlined progress bar) that visually represents the correct vs incorrect answers.
    - Retake Quiz button.
    - A detailed list of incorrect questions with:
        - Question text.
        - User's answer (highlighted in red).
        - Correct answer (highlighted in green).



## Tailwind Configuration
The color palette is generated using Material Theme Builder and extended in `tailwind.config.ts`:

```ts
extend: {
  colors: {
    primary: {
      DEFAULT: "#15468F", // Primary color
      container: "#D8E2FF",
      onContainer: "#001A41",
    },
    inversePrimary: "#84ABFA",
    secondary: {
      DEFAULT: "#575E71",
      container: "#DBE2F9",
      onContainer: "#141B2C",
    },
    tertiary: {
      DEFAULT: "#715573",
      container: "#C1A1C2",
      onContainer: "#29132D",
      onTertiary: "#FFFFFF",
    },
    background: "#F9F9FF",
    onBackground: "#1A1B20",
    outline: "#75777F",
  }
  
}
```

### Custom Gradient in `globals.css`
Custom gradient for the background:

```css
Copy code
@tailwind base;
@tailwind components;
@tailwind utilities;

.bg-gradient-first {
  background: rgb(255, 235, 252);
  background: radial-gradient(
    circle,
    rgba(255, 235, 252, 1) 0%,
    rgba(173, 198, 255, 1) 100%
  );
}
```


## How the Quiz Works
1. Navigation:
    + Users navigate using Previous and Next buttons.
    + The Next button is disabled until an answer is selected.

2. Consecutive Incorrect Warning:
    + If the user answers two questions incorrectly in a row, a custom alert warns them to review the material.

3. Submit Quiz:
    + On the last question, the Submit button replaces the Next button.
    + Submitting shows the Score component.
4. Score Display:
    + A circular progress bar visually represents the correct vs incorrect answers.
    + A detailed list of incorrect questions with correct answers is provided.
5. Retake Quiz:
    + After viewing the score, users can click "Retake Quiz" to restart the quiz.

## **How to Run the Project**

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd quiz-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open the app in your browser:
   ```
   http://localhost:3000
   ```


## **Features I thought of adding (more time than 4 hours)**
- **UI**: 
    - Add Dark theme.
    - Add other color palettes & show random color pallete on each question.
    - Improve review wrong answers UI.
- **Timer**: Add a countdown timer for each question (If quiz is timed).
- **Accessibility**: Improve ARIA labels for better accessibility.



## **Conclusion**

This MVP demonstrates:
- Clean modular design.
- Proper state management with React and TypeScript.
- UI styling with Tailwind CSS.
- Dynamic SVG-based progress visualization.

Thanks again for the opportunity. Let's create awesome technologies! 🚀