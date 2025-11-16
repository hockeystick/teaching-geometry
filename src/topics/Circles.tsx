import { useState } from 'react';
import Quiz, { type QuizQuestion } from '../components/Quiz';

export default function Circles() {
  const [radius, setRadius] = useState(6);

  const diameter = radius * 2;
  const circumference = 2 * Math.PI * radius;

  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "What is the radius of a circle?",
      options: [
        "The distance around the circle",
        "The distance from the center to any point on the circle",
        "The distance across the circle through the center",
        "Half of the circumference"
      ],
      correctAnswer: 1,
      explanation: "The radius is the distance from the center of the circle to any point on the edge."
    },
    {
      id: 2,
      question: "The diameter of a circle is:",
      options: [
        "Half of the radius",
        "The same as the radius",
        "Twice the radius",
        "Three times the radius"
      ],
      correctAnswer: 2,
      explanation: "The diameter is the distance across the circle through the center. It's always twice the radius!"
    },
    {
      id: 3,
      question: "What is the circumference of a circle?",
      options: [
        "The area inside the circle",
        "The distance from the center to the edge",
        "The distance around the circle",
        "The diameter of the circle"
      ],
      correctAnswer: 2,
      explanation: "The circumference is the distance around the outside of the circle, like its perimeter."
    },
    {
      id: 4,
      question: "If a circle has a radius of 5 cm, what is its diameter?",
      options: [
        "2.5 cm",
        "5 cm",
        "10 cm",
        "15 cm"
      ],
      correctAnswer: 2,
      explanation: "The diameter is always twice the radius. So diameter = 2 × 5 = 10 cm"
    },
    {
      id: 5,
      question: "Which special number (approximately 3.14) is used to calculate the circumference?",
      options: [
        "Phi",
        "Pi (π)",
        "E",
        "Delta"
      ],
      correctAnswer: 1,
      explanation: "Pi (π) is approximately 3.14159... We use it to calculate circumference: C = 2πr or C = πd"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Circles</h2>

      {/* Explanation */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Understanding Circles</h3>
        <div className="space-y-4 text-gray-700">
          <p>
            A <strong>circle</strong> is a perfectly round shape. Every point on the circle
            is the same distance from the center.
          </p>

          <div className="space-y-3">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
              <strong className="text-blue-700">Radius (r):</strong>
              <span> The distance from the center to any point on the circle</span>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded">
              <strong className="text-purple-700">Diameter (d):</strong>
              <span> The distance across the circle through the center</span>
              <p className="font-mono text-sm mt-1">d = 2 × r</p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded">
              <strong className="text-green-700">Circumference (C):</strong>
              <span> The distance around the circle</span>
              <p className="font-mono text-sm mt-1">C = 2 × π × r  or  C = π × d</p>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4">
            <p className="font-semibold text-yellow-800 mb-2">💡 What is Pi (π)?</p>
            <p className="text-gray-700">
              Pi (π) is a special number approximately equal to 3.14. It represents the ratio
              of a circle's circumference to its diameter. No matter how big or small the circle,
              this ratio is always the same!
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Visualization */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Interactive Circle Explorer</h3>

        <p className="text-gray-600 mb-6">Adjust the radius to see how it affects the diameter and circumference:</p>

        {/* Radius Slider */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="radius-slider" className="text-gray-700 font-semibold">
              Radius:
            </label>
            <span className="text-2xl font-bold text-blue-600">{radius} units</span>
          </div>
          <input
            id="radius-slider"
            type="range"
            min="2"
            max="12"
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="w-full h-3 bg-blue-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* SVG Circle Visualization */}
        <div className="bg-gray-50 rounded-lg p-8">
          <svg width="100%" height="400" viewBox="0 0 500 400" className="max-w-full">
            {/* Grid background */}
            <defs>
              <pattern id="circle-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E5E7EB" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="500" height="400" fill="url(#circle-grid)" />

            <g transform="translate(250, 200)">
              {/* Circle */}
              <circle
                cx="0"
                cy="0"
                r={radius * 15}
                fill="#3B82F680"
                stroke="#3B82F6"
                strokeWidth="3"
              />

              {/* Center point */}
              <circle cx="0" cy="0" r="5" fill="#374151" />
              <text x="0" y="-10" textAnchor="middle" fill="#374151" fontSize="14" fontWeight="bold">
                Center
              </text>

              {/* Radius line */}
              <line
                x1="0"
                y1="0"
                x2={radius * 15}
                y2="0"
                stroke="#2563EB"
                strokeWidth="3"
              />
              <circle cx={radius * 15} cy="0" r="4" fill="#2563EB" />
              <text
                x={radius * 7.5}
                y="-10"
                textAnchor="middle"
                fill="#2563EB"
                fontSize="14"
                fontWeight="bold"
              >
                radius = {radius}
              </text>

              {/* Diameter line */}
              <line
                x1={-radius * 15}
                y1="0"
                x2={radius * 15}
                y2="0"
                stroke="#7C3AED"
                strokeWidth="2"
                strokeDasharray="5,5"
                opacity="0.7"
              />
              <circle cx={-radius * 15} cy="0" r="4" fill="#7C3AED" />
              <text
                x="0"
                y="25"
                textAnchor="middle"
                fill="#7C3AED"
                fontSize="14"
                fontWeight="bold"
              >
                diameter = {diameter}
              </text>

              {/* Circumference arc labels */}
              <text
                x="0"
                y={-radius * 15 - 15}
                textAnchor="middle"
                fill="#10B981"
                fontSize="14"
                fontWeight="bold"
              >
                circumference ≈ {circumference.toFixed(2)}
              </text>

              {/* Angle markers to show full circle */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
                const rads = (angle * Math.PI) / 180;
                const x = Math.cos(rads) * radius * 15;
                const y = Math.sin(rads) * radius * 15;
                return (
                  <circle
                    key={angle}
                    cx={x}
                    cy={y}
                    r="3"
                    fill="#10B981"
                  />
                );
              })}
            </g>
          </svg>
        </div>

        {/* Results */}
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border-2 border-blue-300">
            <div className="text-blue-600 text-xs font-semibold mb-1">RADIUS</div>
            <div className="text-2xl font-bold text-blue-700 mb-1">{radius} units</div>
            <div className="text-xs text-gray-600">Center to edge</div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border-2 border-purple-300">
            <div className="text-purple-600 text-xs font-semibold mb-1">DIAMETER</div>
            <div className="text-2xl font-bold text-purple-700 mb-1">{diameter} units</div>
            <div className="text-xs text-gray-600">2 × radius = {diameter}</div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border-2 border-green-300">
            <div className="text-green-600 text-xs font-semibold mb-1">CIRCUMFERENCE</div>
            <div className="text-2xl font-bold text-green-700 mb-1">{circumference.toFixed(2)}</div>
            <div className="text-xs text-gray-600">2 × π × {radius} ≈ {circumference.toFixed(2)}</div>
          </div>
        </div>

        <div className="mt-4 bg-indigo-50 border border-indigo-200 rounded-lg p-4">
          <p className="text-sm text-gray-700">
            <strong className="text-indigo-700">Try this:</strong> No matter what radius you choose,
            if you divide the circumference by the diameter, you always get π (about 3.14)!
          </p>
          <p className="text-sm text-gray-600 mt-2 font-mono">
            {circumference.toFixed(2)} ÷ {diameter} = {(circumference / diameter).toFixed(4)} ≈ π
          </p>
        </div>
      </div>

      {/* Quiz */}
      <Quiz questions={quizQuestions} />
    </div>
  );
}
