import { useState } from 'react';
import Quiz, { type QuizQuestion } from '../components/Quiz';

export default function Angles() {
  const [angle, setAngle] = useState(45);

  const getAngleType = (degrees: number): { type: string; color: string } => {
    if (degrees === 0) return { type: 'Zero Angle', color: '#6B7280' };
    if (degrees < 90) return { type: 'Acute Angle', color: '#10B981' };
    if (degrees === 90) return { type: 'Right Angle', color: '#3B82F6' };
    if (degrees < 180) return { type: 'Obtuse Angle', color: '#F59E0B' };
    if (degrees === 180) return { type: 'Straight Angle', color: '#EF4444' };
    return { type: 'Reflex Angle', color: '#8B5CF6' };
  };

  const angleInfo = getAngleType(angle);

  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "What is an acute angle?",
      options: [
        "An angle that is exactly 90 degrees",
        "An angle less than 90 degrees",
        "An angle greater than 90 degrees",
        "An angle that is exactly 180 degrees"
      ],
      correctAnswer: 1,
      explanation: "An acute angle is any angle that measures less than 90 degrees. Think of it as 'a cute' little angle!"
    },
    {
      id: 2,
      question: "A right angle measures:",
      options: [
        "45 degrees",
        "90 degrees",
        "180 degrees",
        "360 degrees"
      ],
      correctAnswer: 1,
      explanation: "A right angle is exactly 90 degrees. You can see right angles in the corners of squares and rectangles!"
    },
    {
      id: 3,
      question: "If an angle measures 120 degrees, it is:",
      options: [
        "Acute",
        "Right",
        "Obtuse",
        "Straight"
      ],
      correctAnswer: 2,
      explanation: "An obtuse angle is any angle greater than 90 degrees but less than 180 degrees."
    },
    {
      id: 4,
      question: "What is a straight angle?",
      options: [
        "An angle of 90 degrees",
        "An angle of 180 degrees",
        "An angle of 360 degrees",
        "An angle of 0 degrees"
      ],
      correctAnswer: 1,
      explanation: "A straight angle is exactly 180 degrees - it looks like a straight line!"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Angles</h2>

      {/* Explanation */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Understanding Angles</h3>
        <div className="space-y-3 text-gray-700">
          <p>
            An angle is formed when two rays meet at a common endpoint called the vertex.
            We measure angles in degrees (°).
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded">
              <strong className="text-green-700">Acute Angle:</strong>
              <span className="text-gray-700"> Less than 90°</span>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
              <strong className="text-blue-700">Right Angle:</strong>
              <span className="text-gray-700"> Exactly 90°</span>
            </div>
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded">
              <strong className="text-yellow-700">Obtuse Angle:</strong>
              <span className="text-gray-700"> Between 90° and 180°</span>
            </div>
            <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
              <strong className="text-red-700">Straight Angle:</strong>
              <span className="text-gray-700"> Exactly 180°</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Visualization */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Interactive Angle Explorer</h3>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="angle-slider" className="text-gray-700 font-semibold">
              Adjust the angle:
            </label>
            <div className="text-right">
              <div className="text-3xl font-bold" style={{ color: angleInfo.color }}>
                {angle}°
              </div>
              <div className="text-sm font-semibold" style={{ color: angleInfo.color }}>
                {angleInfo.type}
              </div>
            </div>
          </div>

          <input
            id="angle-slider"
            type="range"
            min="0"
            max="180"
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, ${angleInfo.color} 0%, ${angleInfo.color} ${(angle / 180) * 100}%, #E5E7EB ${(angle / 180) * 100}%, #E5E7EB 100%)`
            }}
            aria-label={`Adjust angle from 0 to 180 degrees. Current value: ${angle} degrees, ${angleInfo.type}`}
            aria-valuemin={0}
            aria-valuemax={180}
            aria-valuenow={angle}
            aria-valuetext={`${angle} degrees - ${angleInfo.type}`}
          />

          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0°</span>
            <span>90°</span>
            <span>180°</span>
          </div>
        </div>

        {/* SVG Angle Visualization */}
        <div className="bg-gray-50 rounded-lg p-8 flex items-center justify-center" style={{ height: '300px' }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 400 300"
            className="max-w-full"
            role="img"
            aria-label={`Visual representation of a ${angle} degree angle, classified as ${angleInfo.type}`}
          >
            {/* Base ray (horizontal) */}
            <line
              x1="50"
              y1="200"
              x2="350"
              y2="200"
              stroke="#374151"
              strokeWidth="3"
            />

            {/* Rotating ray */}
            <line
              x1="200"
              y1="200"
              x2={200 + 150 * Math.cos((angle * Math.PI) / 180)}
              y2={200 - 150 * Math.sin((angle * Math.PI) / 180)}
              stroke="#374151"
              strokeWidth="3"
            />

            {/* Vertex point */}
            <circle cx="200" cy="200" r="6" fill="#374151" />

            {/* Angle arc */}
            <path
              d={`
                M ${200 + 60 * Math.cos(0)} ${200}
                A 60 60 0 ${angle > 180 ? 1 : 0} 0
                ${200 + 60 * Math.cos((angle * Math.PI) / 180)}
                ${200 - 60 * Math.sin((angle * Math.PI) / 180)}
              `}
              fill="none"
              stroke={angleInfo.color}
              strokeWidth="3"
            />

            {/* Right angle marker (if 90 degrees) */}
            {angle === 90 && (
              <rect
                x="200"
                y="185"
                width="15"
                height="15"
                fill="none"
                stroke={angleInfo.color}
                strokeWidth="2"
              />
            )}

            {/* Angle label */}
            <text
              x={200 + 80 * Math.cos((angle * Math.PI) / 360)}
              y={200 - 80 * Math.sin((angle * Math.PI) / 360) + 5}
              textAnchor="middle"
              fill={angleInfo.color}
              fontSize="20"
              fontWeight="bold"
            >
              {angle}°
            </text>

            {/* Labels for rays */}
            <text x="340" y="215" fill="#374151" fontSize="14">A</text>
            <text
              x={200 + 160 * Math.cos((angle * Math.PI) / 180)}
              y={200 - 160 * Math.sin((angle * Math.PI) / 180)}
              fill="#374151"
              fontSize="14"
            >
              B
            </text>
            <text x="200" y="225" textAnchor="middle" fill="#374151" fontSize="14">V</text>
          </svg>
        </div>
      </div>

      {/* Quiz */}
      <Quiz questions={quizQuestions} />
    </div>
  );
}
