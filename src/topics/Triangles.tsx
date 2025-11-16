import { useState } from 'react';
import Quiz, { type QuizQuestion } from '../components/Quiz';

interface Point {
  x: number;
  y: number;
}

export default function Triangles() {
  const [points, setPoints] = useState<[Point, Point, Point]>([
    { x: 200, y: 50 },
    { x: 100, y: 200 },
    { x: 300, y: 200 }
  ]);

  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  const handleMouseDown = (index: number) => {
    setDraggingIndex(index);
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (draggingIndex === null) return;

    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 400;
    const y = ((e.clientY - rect.top) / rect.height) * 250;

    // Constrain to SVG bounds
    const constrainedX = Math.max(20, Math.min(380, x));
    const constrainedY = Math.max(20, Math.min(230, y));

    const newPoints = [...points] as [Point, Point, Point];
    newPoints[draggingIndex] = { x: constrainedX, y: constrainedY };
    setPoints(newPoints);
  };

  const handleMouseUp = () => {
    setDraggingIndex(null);
  };

  // Calculate side lengths
  const distance = (p1: Point, p2: Point) => {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  };

  const side1 = distance(points[0], points[1]);
  const side2 = distance(points[1], points[2]);
  const side3 = distance(points[2], points[0]);

  // Classify by sides
  const classifyBySides = () => {
    const sides = [side1, side2, side3].sort((a, b) => a - b);
    const tolerance = 5; // pixels

    if (Math.abs(sides[0] - sides[1]) < tolerance && Math.abs(sides[1] - sides[2]) < tolerance) {
      return { type: 'Equilateral', color: '#10B981', description: 'All three sides are equal' };
    } else if (
      Math.abs(sides[0] - sides[1]) < tolerance ||
      Math.abs(sides[1] - sides[2]) < tolerance ||
      Math.abs(sides[0] - sides[2]) < tolerance
    ) {
      return { type: 'Isosceles', color: '#3B82F6', description: 'Two sides are equal' };
    } else {
      return { type: 'Scalene', color: '#F59E0B', description: 'All sides are different lengths' };
    }
  };

  const triangleType = classifyBySides();

  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "What type of triangle has all three sides equal?",
      options: [
        "Scalene",
        "Isosceles",
        "Equilateral",
        "Right"
      ],
      correctAnswer: 2,
      explanation: "An equilateral triangle has all three sides equal in length, and all three angles are also equal (60° each)."
    },
    {
      id: 2,
      question: "An isosceles triangle has:",
      options: [
        "No equal sides",
        "Exactly two equal sides",
        "All three sides equal",
        "No equal angles"
      ],
      correctAnswer: 1,
      explanation: "An isosceles triangle has exactly two sides that are the same length."
    },
    {
      id: 3,
      question: "A triangle with all different side lengths is called:",
      options: [
        "Equilateral",
        "Isosceles",
        "Scalene",
        "Obtuse"
      ],
      correctAnswer: 2,
      explanation: "A scalene triangle has all three sides of different lengths."
    },
    {
      id: 4,
      question: "A right triangle has:",
      options: [
        "Three acute angles",
        "One angle that is exactly 90 degrees",
        "Three equal sides",
        "No equal angles"
      ],
      correctAnswer: 1,
      explanation: "A right triangle has one angle that measures exactly 90 degrees."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Triangles</h2>

      {/* Explanation */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Types of Triangles</h3>
        <div className="space-y-3 text-gray-700">
          <p>
            Triangles are three-sided shapes. We can classify them by their sides or by their angles.
          </p>

          <div className="mt-4">
            <h4 className="font-semibold text-gray-800 mb-2">By Sides:</h4>
            <div className="space-y-2 ml-4">
              <p>
                <strong className="text-green-600">Equilateral:</strong> All three sides are equal
              </p>
              <p>
                <strong className="text-blue-600">Isosceles:</strong> Two sides are equal
              </p>
              <p>
                <strong className="text-yellow-600">Scalene:</strong> All sides are different
              </p>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="font-semibold text-gray-800 mb-2">By Angles:</h4>
            <div className="space-y-2 ml-4">
              <p>
                <strong className="text-purple-600">Acute:</strong> All angles are less than 90°
              </p>
              <p>
                <strong className="text-blue-600">Right:</strong> One angle is exactly 90°
              </p>
              <p>
                <strong className="text-red-600">Obtuse:</strong> One angle is greater than 90°
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Visualization */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Interactive Triangle Builder</h3>

        <div className="mb-4 p-4 rounded-lg" style={{ backgroundColor: `${triangleType.color}15`, borderLeft: `4px solid ${triangleType.color}` }}>
          <div className="flex items-center justify-between">
            <div>
              <span className="font-bold text-lg" style={{ color: triangleType.color }}>
                {triangleType.type} Triangle
              </span>
              <p className="text-gray-600 text-sm mt-1">{triangleType.description}</p>
            </div>
          </div>
        </div>

        <p className="text-gray-600 mb-4 text-sm">
          🖱️ Drag the points to change the triangle shape!
        </p>

        {/* SVG Triangle Visualization */}
        <div className="bg-gray-50 rounded-lg p-4">
          <svg
            width="100%"
            height="250"
            viewBox="0 0 400 250"
            className="max-w-full cursor-move"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Triangle */}
            <polygon
              points={`${points[0].x},${points[0].y} ${points[1].x},${points[1].y} ${points[2].x},${points[2].y}`}
              fill={`${triangleType.color}30`}
              stroke={triangleType.color}
              strokeWidth="3"
            />

            {/* Side length labels */}
            <text
              x={(points[0].x + points[1].x) / 2 - 20}
              y={(points[0].y + points[1].y) / 2}
              fill="#374151"
              fontSize="12"
              fontWeight="bold"
            >
              {Math.round(side1)}
            </text>
            <text
              x={(points[1].x + points[2].x) / 2}
              y={(points[1].y + points[2].y) / 2 + 20}
              fill="#374151"
              fontSize="12"
              fontWeight="bold"
            >
              {Math.round(side2)}
            </text>
            <text
              x={(points[2].x + points[0].x) / 2 + 20}
              y={(points[2].y + points[0].y) / 2}
              fill="#374151"
              fontSize="12"
              fontWeight="bold"
            >
              {Math.round(side3)}
            </text>

            {/* Draggable points */}
            {points.map((point, index) => (
              <g key={index}>
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="10"
                  fill={draggingIndex === index ? triangleType.color : '#3B82F6'}
                  stroke="white"
                  strokeWidth="2"
                  onMouseDown={() => handleMouseDown(index)}
                  className="cursor-pointer hover:opacity-80"
                />
                <text
                  x={point.x}
                  y={point.y - 15}
                  textAnchor="middle"
                  fill="#374151"
                  fontSize="14"
                  fontWeight="bold"
                  style={{ pointerEvents: 'none' }}
                >
                  {String.fromCharCode(65 + index)}
                </text>
              </g>
            ))}
          </svg>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm">
          <div className="bg-gray-100 rounded p-2">
            <div className="text-gray-600">Side AB</div>
            <div className="font-bold text-gray-800">{Math.round(side1)} px</div>
          </div>
          <div className="bg-gray-100 rounded p-2">
            <div className="text-gray-600">Side BC</div>
            <div className="font-bold text-gray-800">{Math.round(side2)} px</div>
          </div>
          <div className="bg-gray-100 rounded p-2">
            <div className="text-gray-600">Side CA</div>
            <div className="font-bold text-gray-800">{Math.round(side3)} px</div>
          </div>
        </div>
      </div>

      {/* Quiz */}
      <Quiz questions={quizQuestions} />
    </div>
  );
}
