import React, { useState } from "react";
import { AnxietyResult } from "../../../components/QuickResult/index";

interface Question {
  question: string;
  answers: string[];
}

const AnxietyQuiz: React.FC = () => {
  const questions: Question[] = [
    { question: "How often have you felt restless or fidgety?", answers: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { question: "How often have you been unable to concentrate or your mind has wandered?", answers: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { question: "How often have you been bothered by trouble falling or staying asleep?", answers: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { question: "How often have you been bothered by feeling tired or having low energy?", answers: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { question: "How often have you been bothered by feeling worthless or guilty?", answers: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { question: "How often have you been bothered by trouble making decisions?", answers: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { question: "How often have you been bothered by muscle tension?", answers: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { question: "How often have you been bothered by being easily startled?", answers: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { question: "How often have you been bothered by feeling afraid that something terrible might happen?", answers: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { question: "How often have you been bothered by having a racing heart?", answers: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
  ];

  // ✅ State variables with proper TypeScript types
  const [score, setScore] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [clickedOption, setClickedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);

  const handleNextQuestion = () => {
    if (clickedOption === null) return;

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

  const handleSubmit = () => {
    setShowResult(true);
  };

  return (
    <div className="commonQuiz">
      <div className="container">
        <h2>ANXIETY TEST</h2>

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
              disabled={clickedOption === null} // Prevent skipping without answering
            >
              Next
            </button>
          </div>
        ) : (
          <div>
            <h2 className="result-heading">Result</h2>
            <h3 className="score">{score}</h3>

            {!showResult && (
              <button onClick={handleSubmit} id="submit-button" className="button">
                Submit
              </button>
            )}

            {score > 1 && <AnxietyResult score={score} />}

            <button onClick={handleResetQuiz} id="retake-button" className="button">
              Restart Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnxietyQuiz;
