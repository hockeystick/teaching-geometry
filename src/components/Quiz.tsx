import { useState } from 'react';

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface QuizProps {
  questions: QuizQuestion[];
}

export default function Quiz({ questions }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return; // Don't allow changing answer after submission
    setSelectedAnswer(answerIndex);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    setShowFeedback(true);
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setIsComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setIsComplete(false);
  };

  if (isComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Quiz Complete!</h3>
        <div className="text-center mb-6">
          <p className="text-6xl mb-4">{percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '💪'}</p>
          <p className="text-3xl font-bold text-blue-600 mb-2">
            {score} / {questions.length}
          </p>
          <p className="text-xl text-gray-700">
            {percentage >= 80 ? 'Excellent work!' : percentage >= 60 ? 'Good job!' : 'Keep practicing!'}
          </p>
        </div>
        <button
          onClick={handleRestart}
          className="w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold text-lg py-5 px-6 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 min-h-[56px] active:scale-[0.98] shadow-lg"
        >
          Try Again
        </button>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-bold text-gray-800">Practice Quiz</h3>
          <span className="text-sm text-gray-600">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <p className="text-xl text-gray-900 mb-8 font-semibold leading-relaxed">{question.question}</p>

      <div className="space-y-4 mb-8">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrectAnswer = index === question.correctAnswer;

          let buttonClass = "w-full text-left p-5 rounded-xl border-3 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 min-h-[60px] active:scale-[0.98] ";

          if (!showFeedback) {
            buttonClass += isSelected
              ? "border-blue-500 bg-blue-50 shadow-md"
              : "border-gray-300 hover:border-blue-400 hover:bg-blue-50 hover:shadow-sm";
          } else {
            if (isCorrectAnswer) {
              buttonClass += "border-green-500 bg-green-50 shadow-md";
            } else if (isSelected && !isCorrect) {
              buttonClass += "border-red-500 bg-red-50 shadow-md";
            } else {
              buttonClass += "border-gray-300 bg-gray-50";
            }
          }

          return (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={showFeedback}
              className={buttonClass}
            >
              <div className="flex items-center">
                <span className="flex-shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center mr-4 font-bold text-base">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="text-gray-900 text-base font-medium">{option}</span>
                {showFeedback && isCorrectAnswer && (
                  <span className="ml-auto text-green-600 text-2xl">✓</span>
                )}
                {showFeedback && isSelected && !isCorrect && (
                  <span className="ml-auto text-red-600 text-2xl">✗</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {showFeedback && (
        <div className={`mb-6 p-4 rounded-lg ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <p className={`font-semibold mb-2 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
            {isCorrect ? '✓ Correct!' : '✗ Not quite right'}
          </p>
          {question.explanation && (
            <p className="text-gray-700">{question.explanation}</p>
          )}
        </div>
      )}

      <div className="flex gap-3">
        {!showFeedback ? (
          <button
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            className="flex-1 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold text-lg py-5 px-6 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 min-h-[56px] active:scale-[0.98] shadow-lg disabled:shadow-none"
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex-1 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold text-lg py-5 px-6 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 min-h-[56px] active:scale-[0.98] shadow-lg"
          >
            {currentQuestion < questions.length - 1 ? 'Next Question →' : 'See Results'}
          </button>
        )}
      </div>

      <div className="mt-4 text-center text-sm text-gray-600">
        Current Score: {score} / {currentQuestion + (showFeedback && isCorrect ? 1 : 0)}
      </div>
    </div>
  );
}
