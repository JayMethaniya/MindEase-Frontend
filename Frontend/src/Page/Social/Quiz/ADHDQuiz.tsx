import React, { useState } from "react";
import { AdhdResult } from "../../../components/QuickResult/index";

interface Question {
  question: string;
  answers: string[];
}

const ADHDQuiz: React.FC = () => {
  const questions: Question[] = [
    { question: "Do you often have trouble paying attention?", answers: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { question: "Are you easily distracted?", answers: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { question: "Do you have trouble staying organized?", answers: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { question: "Do you have trouble following through on instructions?", answers: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { question: "Do you fidget or squirm a lot?", answers: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { question: "Do you have trouble sitting still?", answers: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { question: "Do you have trouble waiting your turn?", answers: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { question: "Do you often interrupt others?", answers: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { question: "Do you have trouble controlling your impulses?", answers: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { question: "Do you often feel restless or have trouble relaxing?", answers: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { question: "Do you have trouble paying attention to details?", answers: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
  ];

  const [score, setScore] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [clickedOption, setClickedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);

  const handleNextQuestion = () => {
    if (clickedOption === null) return; // Prevent skipping without selecting an answer

    setScore((prevScore) => prevScore + clickedOption); // Update score
    setClickedOption(null); // Reset selection

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
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
        <h2>ADHD TEST</h2>

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
              disabled={clickedOption === null} // Disable until user selects an option
            >
              Next
            </button>
          </div>
        ) : (
          <div>
            <h2 className="result-heading">Result</h2>
            <h2 className="score">{score}</h2>
            <AdhdResult score={score} />
            <button onClick={handleResetQuiz} id="retake-button" className="button">
              Restart Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ADHDQuiz;
