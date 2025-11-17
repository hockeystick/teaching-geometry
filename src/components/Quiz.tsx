import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/sounds';

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

// Floating points animation
function FloatingPoints({ points }: { points: number }) {
  return (
    <motion.div
      className="fixed top-1/3 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none"
      initial={{ y: 0, opacity: 1, scale: 0.5 }}
      animate={{ y: -100, opacity: 0, scale: 2 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
    >
      <span className="text-8xl font-black text-yellow-400 drop-shadow-2xl">
        +{points}
      </span>
    </motion.div>
  );
}

export default function Quiz({ questions }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showPoints, setShowPoints] = useState(false);
  const [wrongAnswer, setWrongAnswer] = useState<number | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    sounds.setEnabled(soundEnabled);
  }, [soundEnabled]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return;
    setSelectedAnswer(answerIndex);
    sounds.click();
  };

  const fireConfetti = () => {
    const duration = 2000;
    const end = Date.now() + duration;

    const colors = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    setShowFeedback(true);
    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;

    if (isCorrect) {
      setScore(score + 1);
      setStreak(streak + 1);
      setShowPoints(true);

      sounds.success();
      fireConfetti();

      if (streak > 0 && streak % 2 === 0) {
        sounds.celebration();
      }

      setTimeout(() => {
        setShowPoints(false);
      }, 1500);
    } else {
      setStreak(0);
      setWrongAnswer(selectedAnswer);
      sounds.error();
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setWrongAnswer(null);
    } else {
      setIsComplete(true);
      fireConfetti();
      sounds.celebration();
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setStreak(0);
    setIsComplete(false);
    setWrongAnswer(null);
  };

  const question = questions[currentQuestion];
  const isCorrect = selectedAnswer === question.correctAnswer;
  const points = 10 + (streak * 5);

  if (isComplete) {
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative min-h-[600px] bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 rounded-3xl shadow-2xl p-8 overflow-hidden"
      >
        <div className="relative z-10 text-center">
          <motion.div
            animate={{
              rotate: [0, 10, -10, 10, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 0.6, repeat: 3 }}
            className="text-9xl mb-6"
          >
            {percentage >= 90 ? '🏆' : percentage >= 70 ? '🎉' : percentage >= 50 ? '👍' : '💪'}
          </motion.div>

          <h2 className="text-5xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            {percentage >= 90 ? 'AMAZING!' : percentage >= 70 ? 'GREAT JOB!' : percentage >= 50 ? 'GOOD WORK!' : 'KEEP TRYING!'}
          </h2>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            className="text-8xl font-black text-blue-600 mb-6"
          >
            {score} / {questions.length}
          </motion.div>

          <p className="text-2xl text-gray-700 mb-8">
            You scored {percentage}%!
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRestart}
            className="w-full h-20 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 text-white text-2xl font-bold rounded-full shadow-2xl"
          >
            <span className="flex items-center justify-center gap-3">
              <span>Try Again</span>
              <span className="text-3xl">🔄</span>
            </span>
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="relative">
      {showPoints && <FloatingPoints points={points} />}

      {/* Fixed Score Display */}
      <motion.div
        initial={{ scale: 0, x: 100 }}
        animate={{ scale: 1, x: 0 }}
        className="fixed top-20 right-4 sm:right-8 z-50"
      >
        <div className="bg-white rounded-3xl shadow-2xl p-4 sm:p-6 min-w-[140px] sm:min-w-[180px] border-4 border-purple-200">
          <div className="text-center">
            <motion.div
              animate={score > 0 ? { rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.5 }}
              className="text-5xl sm:text-6xl mb-2"
            >
              {score > 0 ? '🔥' : '⭐'}
            </motion.div>
            <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              {score}
            </div>
            <div className="text-base sm:text-lg font-bold text-gray-600">points</div>
            {streak > 2 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="mt-2 text-orange-500 font-bold text-sm sm:text-base animate-pulse"
              >
                {streak} in a row! 🎯
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Sound Toggle */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setSoundEnabled(!soundEnabled)}
        className="fixed top-20 left-4 sm:left-8 z-50 w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full shadow-xl flex items-center justify-center border-4 border-blue-200"
      >
        <span className="text-2xl sm:text-3xl">
          {soundEnabled ? '🔊' : '🔇'}
        </span>
      </motion.button>

      {/* Main Quiz Content */}
      <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl shadow-2xl p-4 sm:p-8">

        {/* Visual Progress Bar with Stars */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-800">
              Question {currentQuestion + 1}
            </h2>
            <span className="text-xl sm:text-2xl font-black text-purple-600">
              {currentQuestion + 1} / {questions.length}
            </span>
          </div>

          <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="absolute h-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.5, type: 'spring' }}
            />

            {/* Milestone stars */}
            <div className="absolute inset-0 flex items-center justify-around px-2">
              {questions.map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: i <= currentQuestion ? 1 : 0.5 }}
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-base ${
                    i < currentQuestion ? 'bg-yellow-400' : i === currentQuestion ? 'bg-blue-400' : 'bg-gray-300'
                  }`}
                >
                  {i < currentQuestion ? '⭐' : i === currentQuestion ? '👉' : ''}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-2xl sm:text-3xl md:text-4xl text-gray-900 mb-8 font-black leading-tight">
              {question.question}
            </p>

            {/* Answer Cards - COLORFUL AND FUN */}
            <div className="space-y-4 mb-8">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrectAnswer = index === question.correctAnswer;
                const isWrong = showFeedback && wrongAnswer === index;
                const letter = String.fromCharCode(65 + index);

                return (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showFeedback}
                    className={`relative w-full min-h-[100px] p-5 sm:p-6 rounded-3xl shadow-lg transition-all duration-300 border-4 ${
                      !showFeedback && !isSelected
                        ? 'bg-gradient-to-r from-white to-blue-50 border-transparent hover:border-blue-400 hover:shadow-2xl'
                        : !showFeedback && isSelected
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 border-blue-600'
                        : showFeedback && isCorrectAnswer
                        ? 'bg-gradient-to-r from-green-500 to-green-600 border-green-600'
                        : showFeedback && isWrong
                        ? 'bg-gradient-to-r from-red-500 to-red-600 border-red-600'
                        : 'bg-gradient-to-r from-gray-100 to-gray-200 border-gray-300 opacity-60'
                    }`}
                    whileHover={!showFeedback ? { scale: 1.03 } : {}}
                    whileTap={!showFeedback ? { scale: 0.97 } : {}}
                    animate={isWrong ? {
                      x: [-10, 10, -10, 10, -5, 5, 0],
                      transition: { duration: 0.5 }
                    } : {}}
                  >
                    <div className="flex items-center gap-4">
                      {/* Large colorful letter badge */}
                      <div className={`flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-white text-2xl sm:text-3xl font-black shadow-md ${
                        isSelected || showFeedback
                          ? 'bg-white/20'
                          : 'bg-gradient-to-br from-purple-400 to-pink-400'
                      }`}>
                        {letter}
                      </div>

                      {/* Answer text - BIG and readable */}
                      <span className={`text-left text-lg sm:text-xl font-bold flex-1 ${
                        isSelected || (showFeedback && (isCorrectAnswer || isWrong))
                          ? 'text-white'
                          : 'text-gray-800'
                      }`}>
                        {option}
                      </span>

                      {/* Animated checkmark/cross */}
                      {showFeedback && (isCorrectAnswer || isWrong) && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: 'spring', stiffness: 200 }}
                          className="text-4xl sm:text-5xl"
                        >
                          {isCorrectAnswer ? '✅' : '❌'}
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Feedback Message */}
            <AnimatePresence>
              {showFeedback && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className={`mb-8 p-6 rounded-3xl border-4 ${
                    isCorrect
                      ? 'bg-green-50 border-green-500'
                      : 'bg-red-50 border-red-500'
                  }`}
                >
                  <p className={`font-black text-2xl mb-3 ${
                    isCorrect ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {isCorrect ? '🎉 CORRECT! Amazing!' : '❌ Not quite right'}
                  </p>
                  {question.explanation && (
                    <p className="text-gray-700 text-lg leading-relaxed">{question.explanation}</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* HUGE Submit/Next Button */}
            <div className="mt-8">
              {!showFeedback ? (
                <motion.button
                  onClick={handleSubmit}
                  disabled={selectedAnswer === null}
                  className={`w-full h-20 rounded-full shadow-2xl text-white text-xl sm:text-2xl font-black ${
                    selectedAnswer !== null
                      ? 'bg-gradient-to-r from-green-400 via-blue-500 to-purple-500'
                      : 'bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 cursor-not-allowed'
                  }`}
                  whileHover={selectedAnswer !== null ? { scale: 1.05 } : {}}
                  whileTap={selectedAnswer !== null ? { scale: 0.95 } : {}}
                  animate={selectedAnswer !== null ? {
                    boxShadow: [
                      '0 10px 40px rgba(59, 130, 246, 0.4)',
                      '0 10px 50px rgba(139, 92, 246, 0.5)',
                      '0 10px 40px rgba(59, 130, 246, 0.4)',
                    ]
                  } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <span className="flex items-center justify-center gap-3">
                    <span>Check Answer</span>
                    <span className="text-3xl sm:text-4xl">🚀</span>
                  </span>
                </motion.button>
              ) : (
                <motion.button
                  onClick={handleNext}
                  className="w-full h-20 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 text-white text-xl sm:text-2xl font-black rounded-full shadow-2xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                >
                  <span className="flex items-center justify-center gap-3">
                    <span>{currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}</span>
                    <span className="text-3xl sm:text-4xl">{currentQuestion < questions.length - 1 ? '➡️' : '🎯'}</span>
                  </span>
                </motion.button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
