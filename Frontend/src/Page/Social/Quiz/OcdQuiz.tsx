import React, { useState } from "react";
import { OcdResult } from "../../../components/QuickResult/index";

// Define the structure of each question
interface Question {
  question: string;
  answers: string[];
}

const OcdQuiz: React.FC = () => {
  const questions: Question[] = [
    { question: "Do you have an intense fear of germs or contaminants?", answers: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { question: "Do you feel the need to check things repeatedly, such as locks or switches?", answers: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { question: "Do you have a strict need for things to be orderly or symmetrical?", answers: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { question: "Do you feel the need to perform repetitive behaviors in order to reduce your anxiety?", answers: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { question: "Do your obsessions and compulsions take up a lot of your time?", answers: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { question: "Do you feel like you can't control your obsessions and compulsions?", answers: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { question: "Do you have thoughts of contamination?", answers: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { question: "Do you try to resist your obsessions or compulsions, but find it difficult to do so?", answers: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { question: "Do you have thoughts of symmetry or order?", answers: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { question: "Do you have thoughts of needing to repeat words or phrases?", answers: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
  ];

  // ✅ State variables with TypeScript types
  const [score, setScore] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [clickedOption, setClickedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);

  const handleNextQuestion = () => {
    if (clickedOption === null) return; // Prevent skipping without an answer

    setScore((prevScore) => prevScore + clickedOption);
    setClickedOption(null);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleResetQuiz = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowResult(false);
    setClickedOption(null);
  };

  return (
    <div className="commonQuiz">
      <div className="container">
        <h2>OCD TEST</h2>

        {!showResult ? (
          <div className="Quiz-question-option">
            <h3>{questions[currentQuestion].question}</h3>
            <div>
              {questions[currentQuestion].answers.map((answer, index) => (
                <button
                  className={`option-btn ${clickedOption === index ? "checked" : ""}`}
                  key={index}
                  onClick={() => setClickedOption(index)}
                >
                  {answer}
                </button>
              ))}
            </div>
            <button
              id="next-button"
              onClick={handleNextQuestion}
              disabled={clickedOption === null} // Prevent skipping without selecting an answer
            >
              Next
            </button>
          </div>
        ) : (
          <div>
            <h2 className="result-heading">Result</h2>
            <h3 className="score">{score}</h3>

            {score > 1 && <OcdResult score={score} />}

            <button onClick={handleResetQuiz} id="retake-button" className="button">
              Restart Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OcdQuiz;
