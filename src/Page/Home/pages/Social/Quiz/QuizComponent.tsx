import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AnxietyResult, DepressionResult } from "../../../../../components/QuickResult/index";
import {question} from "./question"; // Import all quiz questions

const QuizComponent = () => {
  const { quizId } = useParams(); // Get quiz ID from URL
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [clickedOption, setClickedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  // Filter questions based on quiz ID
  const questions = question.filter((q) => q.quiz === Number(quizId));


  const handleNextQuestion = () => {
    if (clickedOption === null) return;

    setScore((prevScore) => prevScore + clickedOption);
    setClickedOption(null);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
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
    <div className="w-full flex justify-center items-center h-full p-4">
      <div className="bg-[#efdcc5] p-6 rounded-lg shadow-lg text-center w-full max-w-lg">
        <h2 className="text-3xl font-bold text-[#1e3245] mb-6">
          {questions.length > 0 ? `Quiz ${quizId}` : "Quiz Not Found"}
        </h2>

        {!showResult && questions.length > 0 ? (
          <div>
            <h3 className="text-lg text-[#287371] font-semibold mb-4">
              {questions[currentQuestion].question}
            </h3>
            <div className="flex flex-col space-y-3">
              {questions[currentQuestion].answers.map((answer, index) => (
                <button
                  key={index}
                  className={`w-full py-2 px-4 rounded-lg border transition ${
                    clickedOption === index
                      ? "bg-[#287371] text-[#efdcc5]"
                      : "bg-[#1e3245] text-[#efdcc5] hover:bg-[#152431] hover:text-white"
                  }`}
                  onClick={() => setClickedOption(index)}
                >
                  {answer}
                </button>
              ))}
            </div>
            <button
              className="mt-6 px-6 py-2 bg-[#287371] text-white rounded-lg disabled:opacity-50 transition hover:bg-[#184443]"
              onClick={handleNextQuestion}
              disabled={clickedOption === null}
            >
              Next
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Your Result</h2>
            <h3 className="text-xl font-semibold text-blue-600 my-4">Score: {score}</h3>

            {quizId === "1" && <AnxietyResult score={score} />}
            {quizId === "2" && <DepressionResult score={score} />}

            <button
              onClick={handleResetQuiz}
              className="mt-6 px-6 py-2 bg-red-500 text-white rounded-lg transition hover:bg-red-600"
            >
              Restart Quiz
            </button>
            <Link to="/" className="block mt-4 text-[#1e3245] underline">
              Back to Quizzes
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizComponent;
