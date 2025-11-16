import { useParams, Link, Navigate } from 'react-router-dom';
import { getTopicById } from '../data/topics';

export default function TopicPage() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <Navigate to="/" replace />;
  }

  const topic = getTopicById(id);

  if (!topic) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center py-12">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Topic Not Found</h2>
          <p className="text-gray-600 mb-6">
            We couldn't find the topic you're looking for.
          </p>
          <Link
            to="/"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const TopicComponent = topic.component;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back to Home Link */}
      <Link
        to="/"
        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold mb-6 transition-colors"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Topics
      </Link>

      {/* Render the topic component */}
      <TopicComponent />
    </div>
  );
}
