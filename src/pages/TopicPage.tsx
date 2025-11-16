import { useParams, Link, Navigate } from 'react-router-dom';
import { getTopicById, getNextTopic, getPreviousTopic, topics } from '../data/topics';

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
  const nextTopic = getNextTopic(id);
  const previousTopic = getPreviousTopic(id);
  const totalTopics = topics.length;
  const progressPercentage = (topic.order / totalTopics) * 100;

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

      {/* Progress Indicator */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-8 border-2 border-blue-100">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="text-2xl">{topic.icon}</div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">{topic.title}</h2>
              <p className="text-xs text-gray-600">Topic {topic.order} of {totalTopics}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 border border-blue-200">
              {topic.difficulty}
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200 flex items-center gap-1">
              ⏱️ {topic.timeEstimate}
            </span>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
            role="progressbar"
            aria-valuenow={topic.order}
            aria-valuemin={1}
            aria-valuemax={totalTopics}
            aria-label={`Learning progress: Topic ${topic.order} of ${totalTopics}`}
          />
        </div>
      </div>

      {/* Render the topic component */}
      <TopicComponent />

      {/* Topic Navigation */}
      <div className="mt-12 pt-8 border-t-2 border-gray-100">
        <div className="flex justify-between items-center gap-4">
          {/* Previous Topic Button */}
          {previousTopic ? (
            <Link
              to={`/topic/${previousTopic.id}`}
              className="flex-1 group bg-white hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-400 rounded-xl p-4 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl group-hover:scale-110 transition-transform">
                  ←
                </div>
                <div className="text-left">
                  <div className="text-xs text-gray-500 font-semibold mb-1">
                    PREVIOUS
                  </div>
                  <div className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {previousTopic.title}
                  </div>
                </div>
              </div>
            </Link>
          ) : (
            <div className="flex-1"></div>
          )}

          {/* Next Topic Button */}
          {nextTopic ? (
            <Link
              to={`/topic/${nextTopic.id}`}
              className="flex-1 group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl p-4 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              <div className="flex items-center justify-end gap-3">
                <div className="text-right">
                  <div className="text-xs text-blue-100 font-semibold mb-1">
                    NEXT
                  </div>
                  <div className="text-sm font-bold">
                    {nextTopic.title}
                  </div>
                </div>
                <div className="text-2xl group-hover:scale-110 transition-transform">
                  →
                </div>
              </div>
            </Link>
          ) : (
            <Link
              to="/"
              className="flex-1 group bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl p-4 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300"
            >
              <div className="flex items-center justify-end gap-3">
                <div className="text-right">
                  <div className="text-xs text-green-100 font-semibold mb-1">
                    COMPLETED!
                  </div>
                  <div className="text-sm font-bold">
                    Back to Topics
                  </div>
                </div>
                <div className="text-2xl group-hover:scale-110 transition-transform">
                  ✓
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
