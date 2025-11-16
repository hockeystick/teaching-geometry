import { useState } from 'react';
import Quiz, { type QuizQuestion } from '../components/Quiz';

export default function AreaTriangles() {
  const [base, setBase] = useState(10);
  const [height, setHeight] = useState(6);

  const area = (base * height) / 2;

  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "What is the formula for the area of a triangle?",
      options: [
        "base × height",
        "(base × height) ÷ 2",
        "base + height",
        "2 × (base + height)"
      ],
      correctAnswer: 1,
      explanation: "The area of a triangle is (base × height) ÷ 2. A triangle is half of a rectangle!"
    },
    {
      id: 2,
      question: "A triangle has a base of 8 cm and a height of 5 cm. What is its area?",
      options: [
        "13 cm²",
        "40 cm²",
        "20 cm²",
        "26 cm²"
      ],
      correctAnswer: 2,
      explanation: "Area = (8 × 5) ÷ 2 = 40 ÷ 2 = 20 cm²"
    },
    {
      id: 3,
      question: "The height of a triangle must be:",
      options: [
        "The longest side of the triangle",
        "Any side of the triangle",
        "Perpendicular (at a right angle) to the base",
        "Equal to the base"
      ],
      correctAnswer: 2,
      explanation: "The height must be perpendicular to the base, forming a right angle (90°)."
    },
    {
      id: 4,
      question: "If a triangle has an area of 24 square units and a base of 6 units, what is its height?",
      options: [
        "4 units",
        "8 units",
        "12 units",
        "2 units"
      ],
      correctAnswer: 1,
      explanation: "Since 24 = (6 × height) ÷ 2, then 48 = 6 × height, so height = 48 ÷ 6 = 8 units"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Area of Triangles</h2>

      {/* Explanation */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Understanding Triangle Area</h3>
        <div className="space-y-4 text-gray-700">
          <p>
            The <strong>area</strong> of a triangle is the amount of space inside it.
            Think of it as how much paint you would need to fill the triangle!
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="font-mono font-semibold text-lg mb-2">Area = (base × height) ÷ 2</p>
            <p className="text-sm">
              The base can be any side of the triangle, and the height is the perpendicular
              distance from that base to the opposite vertex (corner).
            </p>
          </div>

          <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4">
            <p className="font-semibold text-yellow-800 mb-2">💡 Fun Fact!</p>
            <p className="text-gray-700">
              A triangle has exactly half the area of a rectangle with the same base and height.
              That's why we divide by 2!
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Visualization */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Interactive Triangle Area Calculator</h3>

        <p className="text-gray-600 mb-6">Adjust the base and height to see how the area changes:</p>

        {/* Base Slider */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="base-slider" className="text-gray-700 font-semibold">
              Base:
            </label>
            <span className="text-2xl font-bold text-green-600">{base} units</span>
          </div>
          <input
            id="base-slider"
            type="range"
            min="4"
            max="16"
            value={base}
            onChange={(e) => setBase(Number(e.target.value))}
            className="w-full h-3 bg-green-200 rounded-lg appearance-none cursor-pointer"
            aria-label={`Triangle base slider. Current value: ${base} units`}
            aria-valuemin={4}
            aria-valuemax={16}
            aria-valuenow={base}
            aria-valuetext={`${base} units`}
          />
        </div>

        {/* Height Slider */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="height-slider" className="text-gray-700 font-semibold">
              Height:
            </label>
            <span className="text-2xl font-bold text-blue-600">{height} units</span>
          </div>
          <input
            id="height-slider"
            type="range"
            min="3"
            max="12"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="w-full h-3 bg-blue-200 rounded-lg appearance-none cursor-pointer"
            aria-label={`Triangle height slider. Current value: ${height} units`}
            aria-valuemin={3}
            aria-valuemax={12}
            aria-valuenow={height}
            aria-valuetext={`${height} units`}
          />
        </div>

        {/* SVG Triangle Visualization */}
        <div className="bg-gray-50 rounded-lg p-8">
          <svg
            width="100%"
            height="350"
            viewBox="0 0 500 350"
            className="max-w-full"
            role="img"
            aria-label={`Triangle with base ${base} units and height ${height} units. Area is ${area} square units.`}
          >
            {/* Grid background */}
            <defs>
              <pattern id="triangle-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E5E7EB" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="500" height="350" fill="url(#triangle-grid)" />

            <g transform="translate(250, 250)">
              {/* Helper rectangle (to show the relationship) */}
              <rect
                x={-base * 10}
                y={-height * 10}
                width={base * 20}
                height={height * 20}
                fill="#F3F4F6"
                stroke="#D1D5DB"
                strokeWidth="2"
                strokeDasharray="5,5"
              />

              {/* Triangle */}
              <polygon
                points={`${-base * 10},${height * 10} ${base * 10},${height * 10} 0,${-height * 10}`}
                fill="#3B82F680"
                stroke="#3B82F6"
                strokeWidth="3"
              />

              {/* Base dimension line */}
              <line
                x1={-base * 10}
                y1={height * 10 + 20}
                x2={base * 10}
                y2={height * 10 + 20}
                stroke="#10B981"
                strokeWidth="2"
              />
              <line
                x1={-base * 10}
                y1={height * 10 + 15}
                x2={-base * 10}
                y2={height * 10 + 25}
                stroke="#10B981"
                strokeWidth="2"
              />
              <line
                x1={base * 10}
                y1={height * 10 + 15}
                x2={base * 10}
                y2={height * 10 + 25}
                stroke="#10B981"
                strokeWidth="2"
              />
              <text
                x="0"
                y={height * 10 + 40}
                textAnchor="middle"
                fill="#10B981"
                fontSize="16"
                fontWeight="bold"
              >
                base = {base} units
              </text>

              {/* Height dimension line */}
              <line
                x1="0"
                y1={-height * 10}
                x2="0"
                y2={height * 10}
                stroke="#2563EB"
                strokeWidth="2"
                strokeDasharray="3,3"
              />
              <line
                x1="-5"
                y1={-height * 10}
                x2="5"
                y2={-height * 10}
                stroke="#2563EB"
                strokeWidth="2"
              />
              <line
                x1="-5"
                y1={height * 10}
                x2="5"
                y2={height * 10}
                stroke="#2563EB"
                strokeWidth="2"
              />

              {/* Right angle marker */}
              <rect
                x="-8"
                y={height * 10 - 8}
                width="8"
                height="8"
                fill="none"
                stroke="#2563EB"
                strokeWidth="2"
              />

              <text
                x="15"
                y="5"
                fill="#2563EB"
                fontSize="16"
                fontWeight="bold"
              >
                height = {height} units
              </text>

              {/* Vertices labels */}
              <circle cx={-base * 10} cy={height * 10} r="4" fill="#374151" />
              <circle cx={base * 10} cy={height * 10} r="4" fill="#374151" />
              <circle cx="0" cy={-height * 10} r="4" fill="#374151" />

              <text x={-base * 10 - 15} y={height * 10 + 5} fill="#374151" fontSize="14" fontWeight="bold">A</text>
              <text x={base * 10 + 10} y={height * 10 + 5} fill="#374151" fontSize="14" fontWeight="bold">B</text>
              <text x="0" y={-height * 10 - 10} textAnchor="middle" fill="#374151" fontSize="14" fontWeight="bold">C</text>
            </g>
          </svg>
        </div>

        {/* Result */}
        <div className="mt-6">
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border-2 border-purple-300">
            <div className="text-purple-600 text-sm font-semibold mb-2">AREA OF TRIANGLE</div>
            <div className="text-4xl font-bold text-purple-700 mb-3">{area} square units</div>
            <div className="text-gray-700 space-y-1">
              <div className="font-mono">
                Area = (base × height) ÷ 2
              </div>
              <div className="font-mono">
                Area = ({base} × {height}) ÷ 2
              </div>
              <div className="font-mono">
                Area = {base * height} ÷ 2
              </div>
              <div className="font-mono font-bold text-purple-700">
                Area = {area} square units
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-gray-700">
            <strong className="text-blue-700">Notice:</strong> The dotted rectangle has an area of{' '}
            {base * height} square units. The triangle is exactly half of that rectangle!
          </p>
        </div>
      </div>

      {/* Quiz */}
      <Quiz questions={quizQuestions} />
    </div>
  );
}
