import { useState } from 'react';
import Quiz, { type QuizQuestion } from '../components/Quiz';

export default function LinesAndRays() {
  const [selectedType, setSelectedType] = useState<'point' | 'line' | 'segment' | 'ray'>('point');

  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "What is a point in geometry?",
      options: [
        "A location in space with no size",
        "A short line",
        "A dot with a specific size",
        "The end of a line"
      ],
      correctAnswer: 0,
      explanation: "A point is an exact location in space. It has no length, width, or thickness - just a position!"
    },
    {
      id: 2,
      question: "What makes a line segment different from a line?",
      options: [
        "A line segment is curved",
        "A line segment has two endpoints, a line goes on forever",
        "They are the same thing",
        "A line segment is shorter"
      ],
      correctAnswer: 1,
      explanation: "A line segment has two endpoints and a specific length. A line extends infinitely in both directions!"
    },
    {
      id: 3,
      question: "How many endpoints does a ray have?",
      options: [
        "Zero endpoints",
        "One endpoint",
        "Two endpoints",
        "Three endpoints"
      ],
      correctAnswer: 1,
      explanation: "A ray has exactly one endpoint and extends infinitely in one direction."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Points, Lines, Segments & Rays</h2>

      {/* Explanation */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">What You'll Learn</h3>
        <div className="space-y-3 text-gray-700">
          <p>
            <strong className="text-blue-600">Point:</strong> A point is an exact location in space.
            We usually name points with capital letters, like point A or point B.
          </p>
          <p>
            <strong className="text-blue-600">Line:</strong> A line is perfectly straight and goes on
            forever in both directions. It has no endpoints!
          </p>
          <p>
            <strong className="text-blue-600">Line Segment:</strong> A line segment is the part of a line
            between two endpoints. It has a specific length you can measure.
          </p>
          <p>
            <strong className="text-blue-600">Ray:</strong> A ray starts at one endpoint and goes on
            forever in one direction, like a beam of light!
          </p>
        </div>
      </div>

      {/* Interactive Visualization */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Interactive Explorer</h3>

        <div className="mb-6">
          <p className="text-gray-700 mb-3">Select a type to see how it looks:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3" role="group" aria-label="Geometry type selector">
            {(['point', 'line', 'segment', 'ray'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                  selectedType === type
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                aria-pressed={selectedType === type}
                aria-label={`Show ${type} visualization`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* SVG Visualization */}
        <div className="bg-gray-50 rounded-lg p-8 flex items-center justify-center" style={{ height: '250px' }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 400 150"
            className="max-w-full"
            role="img"
            aria-label={`Visual representation of a ${selectedType}`}
          >
            {selectedType === 'point' && (
              <>
                <circle cx="200" cy="75" r="6" fill="#3B82F6" />
                <text x="200" y="100" textAnchor="middle" fill="#374151" fontSize="16" fontWeight="bold">
                  Point A
                </text>
                <text x="200" y="130" textAnchor="middle" fill="#6B7280" fontSize="14">
                  A single location in space
                </text>
              </>
            )}

            {selectedType === 'line' && (
              <>
                <defs>
                  <marker id="arrow-left" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                    <path d="M 10 5 L 0 0 L 0 10 Z" fill="#3B82F6" />
                  </marker>
                  <marker id="arrow-right" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                    <path d="M 0 5 L 10 0 L 10 10 Z" fill="#3B82F6" />
                  </marker>
                </defs>
                <line
                  x1="20" y1="75" x2="380" y2="75"
                  stroke="#3B82F6"
                  strokeWidth="3"
                  markerStart="url(#arrow-left)"
                  markerEnd="url(#arrow-right)"
                />
                <circle cx="150" cy="75" r="4" fill="#374151" />
                <circle cx="250" cy="75" r="4" fill="#374151" />
                <text x="150" y="60" textAnchor="middle" fill="#374151" fontSize="14">A</text>
                <text x="250" y="60" textAnchor="middle" fill="#374151" fontSize="14">B</text>
                <text x="200" y="110" textAnchor="middle" fill="#6B7280" fontSize="14">
                  Goes on forever in both directions
                </text>
              </>
            )}

            {selectedType === 'segment' && (
              <>
                <line x1="100" y1="75" x2="300" y2="75" stroke="#3B82F6" strokeWidth="3" />
                <circle cx="100" cy="75" r="6" fill="#374151" />
                <circle cx="300" cy="75" r="6" fill="#374151" />
                <text x="100" y="60" textAnchor="middle" fill="#374151" fontSize="14" fontWeight="bold">A</text>
                <text x="300" y="60" textAnchor="middle" fill="#374151" fontSize="14" fontWeight="bold">B</text>
                <text x="200" y="110" textAnchor="middle" fill="#6B7280" fontSize="14">
                  Has two endpoints and a specific length
                </text>
              </>
            )}

            {selectedType === 'ray' && (
              <>
                <defs>
                  <marker id="arrow" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                    <path d="M 0 5 L 10 0 L 10 10 Z" fill="#3B82F6" />
                  </marker>
                </defs>
                <line
                  x1="100" y1="75" x2="380" y2="75"
                  stroke="#3B82F6"
                  strokeWidth="3"
                  markerEnd="url(#arrow)"
                />
                <circle cx="100" cy="75" r="6" fill="#374151" />
                <text x="100" y="60" textAnchor="middle" fill="#374151" fontSize="14" fontWeight="bold">A</text>
                <text x="200" y="110" textAnchor="middle" fill="#6B7280" fontSize="14">
                  Starts at one point, goes on forever
                </text>
              </>
            )}
          </svg>
        </div>
      </div>

      {/* Quiz */}
      <Quiz questions={quizQuestions} />
    </div>
  );
}
