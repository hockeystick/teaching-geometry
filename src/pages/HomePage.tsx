import { Link } from 'react-router-dom';
import { topics } from '../data/topics';

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Welcome Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Welcome to Geometry Playground! 🎉
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Get ready to explore the amazing world of geometry! Learn about shapes, angles,
          and measurements through fun interactive lessons and quizzes.
        </p>
      </div>

      {/* Topics Grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Choose a Topic to Explore:</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic) => (
            <Link
              key={topic.id}
              to={`/topic/${topic.id}`}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-1"
            >
              <div className="p-6">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {topic.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {topic.title}
                </h3>
                <p className="text-gray-600 mb-4">{topic.description}</p>
                <div className="flex items-center text-blue-500 font-semibold group-hover:text-blue-700">
                  Start Learning
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-100">
        <h3 className="text-xl font-bold text-gray-800 mb-3">💡 Learning Tips</h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">✓</span>
            <span>Take your time with each topic and try all the interactive features</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">✓</span>
            <span>Complete the practice quizzes to test your understanding</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">✓</span>
            <span>Don't worry about getting things wrong - that's how we learn!</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">✓</span>
            <span>Have fun exploring and experimenting with the shapes!</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
