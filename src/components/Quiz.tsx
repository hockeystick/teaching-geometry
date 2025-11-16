import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

// Stars/Sparkles effect
function Stars() {
  const stars = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    scale: Math.random() * 0.5 + 0.5,
    delay: Math.random() * 0.5
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute text-yellow-400"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            fontSize: `${star.scale * 2}rem`
          }}
          initial={{ scale: 0, rotate: 0, opacity: 0 }}
          animate={{
            scale: [0, star.scale * 1.5, 0],
            rotate: [0, 180, 360],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 1.5,
            delay: star.delay,
            ease: 'easeOut'
          }}
        >
          ⭐
        </motion.div>
      ))}
    </div>
  );
}

// Confetti component
function Confetti() {
  const confetti = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    rotation: Math.random() * 360,
    scale: Math.random() * 0.5 + 0.5,
    color: ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6'][Math.floor(Math.random() * 5)]
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {confetti.map((c) => (
        <motion.div
          key={c.id}
          className="absolute w-3 h-3 rounded-full"
          style={{
            left: `${c.x}%`,
            backgroundColor: c.color,
            top: '-10%'
          }}
          initial={{ y: 0, opacity: 1, rotate: 0 }}
          animate={{
            y: window.innerHeight + 100,
            opacity: 0,
            rotate: c.rotation * 3
          }}
          transition={{
            duration: 2 + Math.random(),
            ease: 'easeIn'
          }}
        />
      ))}
    </div>
  );
}

// Floating points animation
function FloatingPoints({ points }: { points: number }) {
  return (
    <motion.div
      className="fixed top-1/3 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none"
      initial={{ y: 0, opacity: 1, scale: 0.5 }}
      animate={{ y: -100, opacity: 0, scale: 1.5 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
    >
      <span className="text-6xl font-black text-green-500 drop-shadow-lg">
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
  const [showConfetti, setShowConfetti] = useState(false);
  const [showStars, setShowStars] = useState(false);
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

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    setShowFeedback(true);
    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;

    if (isCorrect) {
      setScore(score + 1);
      setStreak(streak + 1);
      setShowPoints(true);
      setShowConfetti(true);

      // Play success sound
      sounds.success();

      // Extra celebration for streaks
      if (streak > 0 && streak % 3 === 0) {
        setShowStars(true);
        sounds.celebration();
      } else if (streak > 0) {
        sounds.streak();
      }

      setTimeout(() => {
        setShowPoints(false);
        setShowConfetti(false);
        setShowStars(false);
      }, 2000);
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
      setShowConfetti(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setStreak(0);
    setIsComplete(false);
    setShowConfetti(false);
    setWrongAnswer(null);
  };

  const question = questions[currentQuestion];
  const isCorrect = selectedAnswer === question.correctAnswer;
  const points = 10 + (streak * 5); // Bonus points for streaks

  if (isComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    const getBadge = () => {
      if (percentage >= 90) return { emoji: '🏆', title: 'Gold Master!', color: 'from-yellow-400 to-yellow-600' };
      if (percentage >= 75) return { emoji: '🥈', title: 'Silver Star!', color: 'from-gray-300 to-gray-500' };
      if (percentage >= 60) return { emoji: '🥉', title: 'Bronze Badge!', color: 'from-orange-400 to-orange-600' };
      return { emoji: '⭐', title: 'Keep Trying!', color: 'from-blue-400 to-blue-600' };
    };
    const badge = getBadge();

    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl shadow-2xl p-8 relative overflow-hidden"
      >
        {showConfetti && <Confetti />}

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 0.6 }}
            className="text-9xl mb-4"
          >
            {badge.emoji}
          </motion.div>

          <h3 className={`text-4xl font-black mb-2 bg-gradient-to-r ${badge.color} bg-clip-text text-transparent`}>
            {badge.title}
          </h3>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
            className="text-6xl font-black text-blue-600 mb-4 drop-shadow-lg"
          >
            {score} / {questions.length}
          </motion.div>

          <p className="text-2xl text-gray-700 mb-2">
            {percentage >= 80 ? 'Amazing work! 🎉' : percentage >= 60 ? 'Great job! 👍' : 'Keep practicing! 💪'}
          </p>

          {percentage >= 90 && (
            <p className="text-lg text-purple-600 font-semibold">Perfect score streak! 🔥</p>
          )}
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRestart}
          className="w-full mt-8 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-black text-xl py-6 px-8 rounded-2xl shadow-xl transition-all duration-200 min-h-[70px]"
        >
          Try Again 🔄
        </motion.button>
      </motion.div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 relative">
      {showConfetti && <Confetti />}
      {showStars && <Stars />}
      {showPoints && <FloatingPoints points={points} />}

      {/* Sound Toggle Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setSoundEnabled(!soundEnabled)}
        className="absolute top-4 right-4 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg flex items-center justify-center touch-manipulation"
        title={soundEnabled ? 'Disable sounds' : 'Enable sounds'}
      >
        <span className="text-xl sm:text-2xl">
          {soundEnabled ? '🔊' : '🔇'}
        </span>
      </motion.button>

      {/* Header with streak */}
      <div className="mb-4 sm:mb-6">
        <div className="flex justify-between items-center mb-3">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-gray-800">Practice Quiz</h3>
            {streak > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-2 mt-1"
              >
                <span className="text-orange-500 text-base sm:text-xl">🔥</span>
                <span className="text-orange-500 text-sm sm:text-base font-bold">{streak} streak!</span>
              </motion.div>
            )}
          </div>
          <div className="text-right">
            <span className="text-xs sm:text-sm font-semibold text-gray-600">
              {currentQuestion + 1} of {questions.length}
            </span>
            <div className="text-xl sm:text-2xl font-bold text-blue-600">
              {score} ⭐
            </div>
          </div>
        </div>

        {/* Animated progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
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
          <p className="text-xl sm:text-2xl md:text-3xl text-gray-900 mb-6 sm:mb-8 font-bold leading-relaxed">
            {question.question}
          </p>

          {/* Answer Cards */}
          <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrectAnswer = index === question.correctAnswer;
              const isWrong = showFeedback && wrongAnswer === index;

              let cardClasses = "w-full text-left p-4 sm:p-5 md:p-6 rounded-2xl border-4 transition-all duration-200 min-h-[80px] sm:min-h-[90px] font-semibold text-base sm:text-lg touch-manipulation ";

              if (!showFeedback) {
                if (isSelected) {
                  cardClasses += "border-blue-500 bg-blue-500 text-white shadow-xl scale-[1.02]";
                } else {
                  cardClasses += "border-gray-300 bg-white text-gray-800 hover:border-blue-400 hover:shadow-lg hover:bg-blue-50";
                }
              } else {
                if (isCorrectAnswer) {
                  cardClasses += "border-green-500 bg-green-500 text-white shadow-xl";
                } else if (isWrong) {
                  cardClasses += "border-red-500 bg-red-500 text-white shadow-xl";
                } else {
                  cardClasses += "border-gray-200 bg-gray-50 text-gray-500 opacity-50";
                }
              }

              return (
                <motion.button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showFeedback}
                  className={cardClasses}
                  whileHover={!showFeedback ? { scale: 1.02 } : {}}
                  whileTap={!showFeedback ? { scale: 0.98 } : {}}
                  animate={isWrong ? {
                    x: [-10, 10, -10, 10, -5, 5, 0],
                    transition: { duration: 0.5 }
                  } : {}}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <span className={`flex-shrink-0 w-12 h-12 rounded-full border-3 flex items-center justify-center font-black text-lg ${
                        isSelected && !showFeedback ? 'border-white bg-white/20' :
                        (isCorrectAnswer && showFeedback) || (isWrong) ? 'border-white bg-white/20' :
                        'border-gray-400 bg-gray-100'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="flex-1">{option}</span>
                    </div>

                    {showFeedback && (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                      >
                        {isCorrectAnswer && (
                          <span className="text-4xl">✓</span>
                        )}
                        {isWrong && (
                          <span className="text-4xl">✗</span>
                        )}
                      </motion.div>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Feedback section */}
          <AnimatePresence>
            {showFeedback && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className={`mb-6 p-5 rounded-2xl border-4 ${
                  isCorrect
                    ? 'bg-green-50 border-green-500'
                    : 'bg-red-50 border-red-500'
                }`}
              >
                <p className={`font-black text-xl mb-2 ${
                  isCorrect ? 'text-green-800' : 'text-red-800'
                }`}>
                  {isCorrect ? '✓ Correct! Amazing! 🎉' : '✗ Not quite right'}
                </p>
                {question.explanation && (
                  <p className="text-gray-700 text-base leading-relaxed">{question.explanation}</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Button */}
          <div className="flex gap-3">
            {!showFeedback ? (
              <motion.button
                onClick={handleSubmit}
                disabled={selectedAnswer === null}
                className={`flex-1 font-black text-xl py-6 px-8 rounded-2xl transition-all duration-200 min-h-[70px] shadow-xl ${
                  selectedAnswer !== null
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                whileHover={selectedAnswer !== null ? { scale: 1.05 } : {}}
                whileTap={selectedAnswer !== null ? { scale: 0.95 } : {}}
                animate={selectedAnswer !== null ? {
                  boxShadow: [
                    '0 10px 30px rgba(59, 130, 246, 0.3)',
                    '0 10px 40px rgba(139, 92, 246, 0.4)',
                    '0 10px 30px rgba(59, 130, 246, 0.3)',
                  ]
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Check Answer ✨
              </motion.button>
            ) : (
              <motion.button
                onClick={handleNext}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-black text-xl py-6 px-8 rounded-2xl transition-all duration-200 min-h-[70px] shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                {currentQuestion < questions.length - 1 ? 'Next Question →' : 'See Results 🎯'}
              </motion.button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
