import { useState } from 'react';
import Quiz, { type QuizQuestion } from '../components/Quiz';

export default function PerimeterAreaRectangles() {
  const [width, setWidth] = useState(8);
  const [height, setHeight] = useState(5);

  const perimeter = 2 * (width + height);
  const area = width * height;

  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "What is the formula for the perimeter of a rectangle?",
      options: [
        "length × width",
        "2 × (length + width)",
        "length + width",
        "4 × length"
      ],
      correctAnswer: 1,
      explanation: "The perimeter is the distance around the rectangle. Since there are 2 lengths and 2 widths, we use: 2 × (length + width)"
    },
    {
      id: 2,
      question: "What is the formula for the area of a rectangle?",
      options: [
        "2 × (length + width)",
        "length + width",
        "length × width",
        "length × 4"
      ],
      correctAnswer: 2,
      explanation: "The area is the space inside the rectangle. We find it by multiplying: length × width"
    },
    {
      id: 3,
      question: "A rectangle has a length of 10 cm and width of 4 cm. What is its perimeter?",
      options: [
        "14 cm",
        "20 cm",
        "28 cm",
        "40 cm"
      ],
      correctAnswer: 2,
      explanation: "Perimeter = 2 × (10 + 4) = 2 × 14 = 28 cm"
    },
    {
      id: 4,
      question: "A rectangle has a length of 6 meters and width of 3 meters. What is its area?",
      options: [
        "9 square meters",
        "18 square meters",
        "12 square meters",
        "15 square meters"
      ],
      correctAnswer: 1,
      explanation: "Area = 6 × 3 = 18 square meters"
    },
    {
      id: 5,
      question: "If a rectangle has an area of 24 square units and a width of 4 units, what is its length?",
      options: [
        "4 units",
        "6 units",
        "8 units",
        "12 units"
      ],
      correctAnswer: 1,
      explanation: "Since Area = length × width, we have 24 = length × 4, so length = 24 ÷ 4 = 6 units"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Perimeter & Area of Rectangles</h2>

      {/* Explanation */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">What You'll Learn</h3>
        <div className="space-y-4 text-gray-700">
          <div>
            <h4 className="font-semibold text-lg text-blue-600 mb-2">Perimeter</h4>
            <p>
              The <strong>perimeter</strong> is the distance around the outside of a shape.
              For a rectangle, you add up all four sides.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-3 mt-2 rounded">
              <p className="font-mono font-semibold">Perimeter = 2 × (length + width)</p>
              <p className="text-sm mt-1">or: length + length + width + width</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-purple-600 mb-2">Area</h4>
            <p>
              The <strong>area</strong> is the amount of space inside a shape.
              For a rectangle, you multiply the length by the width.
            </p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3 mt-2 rounded">
              <p className="font-mono font-semibold">Area = length × width</p>
              <p className="text-sm mt-1">Area is measured in square units (like cm² or m²)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Visualization */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Interactive Rectangle Calculator</h3>

        <p className="text-gray-600 mb-6">Use the sliders to change the rectangle's dimensions:</p>

        {/* Width Slider */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="width-slider" className="text-gray-700 font-semibold">
              Width:
            </label>
            <span className="text-2xl font-bold text-blue-600">{width} units</span>
          </div>
          <input
            id="width-slider"
            type="range"
            min="2"
            max="15"
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
            className="w-full h-3 bg-blue-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Height Slider */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="height-slider" className="text-gray-700 font-semibold">
              Height:
            </label>
            <span className="text-2xl font-bold text-purple-600">{height} units</span>
          </div>
          <input
            id="height-slider"
            type="range"
            min="2"
            max="12"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="w-full h-3 bg-purple-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* SVG Rectangle Visualization */}
        <div className="bg-gray-50 rounded-lg p-8">
          <svg width="100%" height="300" viewBox="0 0 400 300" className="max-w-full">
            {/* Grid background */}
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E5E7EB" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="400" height="300" fill="url(#grid)" />

            {/* Calculate rectangle position to center it */}
            <g transform="translate(200, 150)">
              {/* Rectangle */}
              <rect
                x={-width * 10}
                y={-height * 10}
                width={width * 20}
                height={height * 20}
                fill="#3B82F680"
                stroke="#3B82F6"
                strokeWidth="3"
              />

              {/* Width dimension line */}
              <line
                x1={-width * 10}
                y1={height * 10 + 20}
                x2={width * 10}
                y2={height * 10 + 20}
                stroke="#2563EB"
                strokeWidth="2"
              />
              <line
                x1={-width * 10}
                y1={height * 10 + 15}
                x2={-width * 10}
                y2={height * 10 + 25}
                stroke="#2563EB"
                strokeWidth="2"
              />
              <line
                x1={width * 10}
                y1={height * 10 + 15}
                x2={width * 10}
                y2={height * 10 + 25}
                stroke="#2563EB"
                strokeWidth="2"
              />
              <text
                x="0"
                y={height * 10 + 40}
                textAnchor="middle"
                fill="#2563EB"
                fontSize="16"
                fontWeight="bold"
              >
                {width} units
              </text>

              {/* Height dimension line */}
              <line
                x1={width * 10 + 20}
                y1={-height * 10}
                x2={width * 10 + 20}
                y2={height * 10}
                stroke="#7C3AED"
                strokeWidth="2"
              />
              <line
                x1={width * 10 + 15}
                y1={-height * 10}
                x2={width * 10 + 25}
                y2={-height * 10}
                stroke="#7C3AED"
                strokeWidth="2"
              />
              <line
                x1={width * 10 + 15}
                y1={height * 10}
                x2={width * 10 + 25}
                y2={height * 10}
                stroke="#7C3AED"
                strokeWidth="2"
              />
              <text
                x={width * 10 + 45}
                y="5"
                textAnchor="middle"
                fill="#7C3AED"
                fontSize="16"
                fontWeight="bold"
              >
                {height}
              </text>
            </g>
          </svg>
        </div>

        {/* Results */}
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border-2 border-blue-300">
            <div className="text-blue-600 text-sm font-semibold mb-1">PERIMETER</div>
            <div className="text-3xl font-bold text-blue-700 mb-2">{perimeter} units</div>
            <div className="text-sm text-gray-600">
              2 × ({width} + {height}) = 2 × {width + height} = {perimeter}
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border-2 border-purple-300">
            <div className="text-purple-600 text-sm font-semibold mb-1">AREA</div>
            <div className="text-3xl font-bold text-purple-700 mb-2">{area} sq units</div>
            <div className="text-sm text-gray-600">
              {width} × {height} = {area}
            </div>
          </div>
        </div>
      </div>

      {/* Quiz */}
      <Quiz questions={quizQuestions} />
    </div>
  );
}
