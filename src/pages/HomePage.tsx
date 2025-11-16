import { Link } from 'react-router-dom';
import { topics } from '../data/topics';

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section - Clear starting point */}
      <div className="text-center py-12 md:py-16 px-4">
        <div className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
          For 6th Grade Students
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
          Learn Geometry the
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Fun Way!
          </span>
        </h1>

        <p className="text-lg md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
          Explore shapes, angles, and formulas with interactive games and quizzes
        </p>

        {/* Primary CTA */}
        <a
          href="#topics"
          className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-xl font-bold px-12 py-5 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
        >
          Start Learning Now! 🚀
        </a>

        {/* Quick Stats - Visual engagement */}
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mt-12">
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="text-3xl md:text-4xl font-bold text-blue-600">6</div>
            <div className="text-sm md:text-base text-gray-600 mt-1">Topics</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="text-3xl md:text-4xl font-bold text-purple-600">25+</div>
            <div className="text-sm md:text-base text-gray-600 mt-1">Quizzes</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="text-3xl md:text-4xl font-bold text-green-600">100%</div>
            <div className="text-sm md:text-base text-gray-600 mt-1">Fun</div>
          </div>
        </div>
      </div>

      {/* Topics Section - Clear visual hierarchy */}
      <div id="topics" className="py-12 px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Choose Your Adventure
          </h2>
          <p className="text-lg text-gray-600">
            Pick a topic below to start exploring!
          </p>
        </div>

        {/* Topic Cards Grid - Kid-friendly design */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {topics.map((topic) => (
            <Link
              key={topic.id}
              to={`/topic/${topic.id}`}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2 border-2 border-transparent hover:border-blue-400"
            >
              {/* Card Header with Icon */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 text-center border-b-2 border-gray-100">
                <div className="text-7xl mb-2 group-hover:scale-125 transition-transform duration-300 inline-block">
                  {topic.icon}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {topic.title}
                </h3>
                <p className="text-base text-gray-600 mb-6 leading-relaxed">
                  {topic.description}
                </p>

                {/* CTA Button inside card */}
                <div className="flex items-center justify-center bg-blue-500 group-hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-colors">
                  <span>Start Topic</span>
                  <svg
                    className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Minimal Tips Section - Simplified */}
      <div className="py-12 px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border-2 border-green-200">
          <div className="flex items-start gap-4">
            <div className="text-4xl flex-shrink-0">💡</div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Quick Tips</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-2">
                  <span className="text-green-500 text-xl flex-shrink-0">✓</span>
                  <span className="text-gray-700 text-base">Try all the interactive features</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 text-xl flex-shrink-0">✓</span>
                  <span className="text-gray-700 text-base">Complete the practice quizzes</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 text-xl flex-shrink-0">✓</span>
                  <span className="text-gray-700 text-base">Mistakes help you learn!</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 text-xl flex-shrink-0">✓</span>
                  <span className="text-gray-700 text-base">Have fun exploring!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
