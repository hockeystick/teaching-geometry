import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { topics } from '../data/topics';

export default function HomePage() {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Easy':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Intermediate':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      </div>

      {/* Main Container with proper padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Hero Section - Clear starting point */}
      <motion.div
        className="text-center py-12 sm:py-16 md:py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          For 6th Grade Students 🎓
        </motion.div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 sm:mb-6 leading-tight">
          Learn Geometry the
          <motion.span
            className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
            animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Fun Way! 🎉
          </motion.span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed">
          Explore shapes, angles, and formulas with interactive games and quizzes
        </p>

        {/* Primary CTA */}
        <motion.a
          href="#topics"
          className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-base sm:text-lg md:text-xl font-bold px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-200 touch-manipulation"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Learning Now ✨
        </motion.a>

        {/* Quick Stats - Visual engagement with animations */}
        <motion.div
          className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-2xl mx-auto mt-10 sm:mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <motion.div
            className="bg-white rounded-xl p-3 sm:p-4 md:p-6 shadow-md hover:shadow-lg transition-shadow"
            whileHover={{ y: -4 }}
          >
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600">6</div>
            <div className="text-xs sm:text-sm md:text-base text-gray-600 mt-1">Topics</div>
          </motion.div>
          <motion.div
            className="bg-white rounded-xl p-3 sm:p-4 md:p-6 shadow-md hover:shadow-lg transition-shadow"
            whileHover={{ y: -4 }}
          >
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-600">25+</div>
            <div className="text-xs sm:text-sm md:text-base text-gray-600 mt-1">Quizzes</div>
          </motion.div>
          <motion.div
            className="bg-white rounded-xl p-3 sm:p-4 md:p-6 shadow-md hover:shadow-lg transition-shadow"
            whileHover={{ y: -4 }}
          >
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-600">100%</div>
            <div className="text-xs sm:text-sm md:text-base text-gray-600 mt-1">Fun</div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Topics Section - Clear visual hierarchy */}
      <div id="topics" className="py-12 sm:py-16">
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
            Choose Your Adventure 🚀
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            Pick a topic below to start exploring!
          </p>
        </motion.div>

        {/* Topic Cards Grid - Kid-friendly design with touch feedback and animations */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {topics.map((topic) => (
            <motion.div
              key={topic.id}
              variants={{
                hidden: { y: 50, opacity: 0 },
                visible: { y: 0, opacity: 1 }
              }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
              whileHover={{ y: -8 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to={`/topic/${topic.id}`}
                className="block group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-shadow duration-300 overflow-hidden border-2 border-transparent hover:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-300 relative touch-manipulation"
              >
              {/* Topic Number Badge */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white text-blue-600 font-bold text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full shadow-md z-10 border-2 border-blue-200">
                #{topic.order}
              </div>

              {/* Card Header with Icon */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 sm:p-6 text-center pt-6 sm:pt-8">
                <div className="text-5xl sm:text-6xl mb-2 group-hover:scale-110 transition-transform duration-300 inline-block">
                  {topic.icon}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors">
                  {topic.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed">
                  {topic.description}
                </p>

                {/* Metadata Badges */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5">
                  <span className={`text-[10px] sm:text-xs font-semibold px-2 sm:px-2.5 py-1 rounded-full border ${getDifficultyColor(topic.difficulty)}`}>
                    {topic.difficulty}
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold px-2 sm:px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200 flex items-center gap-0.5 sm:gap-1">
                    <span>⏱️</span>
                    {topic.timeEstimate}
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold px-2 sm:px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200 flex items-center gap-0.5 sm:gap-1">
                    <span>📝</span>
                    {topic.activities} {window.innerWidth >= 640 ? 'activities' : 'acts'}
                  </span>
                </div>

                {/* CTA Button inside card - Larger touch target */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 group-hover:from-blue-600 group-hover:to-purple-600 text-white font-bold text-sm sm:text-base py-3 sm:py-4 px-4 sm:px-5 rounded-xl transition-colors text-center shadow-lg">
                  Start Learning ✨
                </div>
              </div>
            </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Minimal Tips Section - Simplified */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 md:p-8 border-2 border-green-200">
          <div className="text-center mb-6">
            <div className="text-3xl mb-2">💡</div>
            <h3 className="text-2xl font-bold text-gray-900">Quick Tips</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 bg-white/50 rounded-lg p-3">
              <span className="text-green-500 text-xl flex-shrink-0">✓</span>
              <span className="text-gray-700 text-base">Try all interactive features</span>
            </div>
            <div className="flex items-center gap-3 bg-white/50 rounded-lg p-3">
              <span className="text-green-500 text-xl flex-shrink-0">✓</span>
              <span className="text-gray-700 text-base">Complete practice quizzes</span>
            </div>
            <div className="flex items-center gap-3 bg-white/50 rounded-lg p-3">
              <span className="text-green-500 text-xl flex-shrink-0">✓</span>
              <span className="text-gray-700 text-base">Mistakes help you learn</span>
            </div>
            <div className="flex items-center gap-3 bg-white/50 rounded-lg p-3">
              <span className="text-green-500 text-xl flex-shrink-0">✓</span>
              <span className="text-gray-700 text-base">Have fun exploring</span>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
