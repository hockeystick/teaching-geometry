import LinesAndRays from '../topics/LinesAndRays';
import Angles from '../topics/Angles';
import Triangles from '../topics/Triangles';
import PerimeterAreaRectangles from '../topics/PerimeterAreaRectangles';
import AreaTriangles from '../topics/AreaTriangles';
import Circles from '../topics/Circles';

export interface Topic {
  id: string;
  title: string;
  description: string;
  icon: string;
  component: React.ComponentType;
  difficulty: 'Beginner' | 'Easy' | 'Intermediate';
  timeEstimate: string;
  activities: number;
  order: number;
}

export const topics: Topic[] = [
  {
    id: 'lines-and-rays',
    title: 'Points, Lines & Rays',
    description: 'Learn about points, lines, line segments, and rays',
    icon: '📏',
    component: LinesAndRays,
    difficulty: 'Beginner',
    timeEstimate: '10 min',
    activities: 4,
    order: 1,
  },
  {
    id: 'angles',
    title: 'Angles',
    description: 'Explore acute, right, obtuse, and straight angles',
    icon: '📐',
    component: Angles,
    difficulty: 'Beginner',
    timeEstimate: '12 min',
    activities: 5,
    order: 2,
  },
  {
    id: 'triangles',
    title: 'Triangles',
    description: 'Discover different types of triangles by sides and angles',
    icon: '△',
    component: Triangles,
    difficulty: 'Easy',
    timeEstimate: '15 min',
    activities: 5,
    order: 3,
  },
  {
    id: 'perimeter-area-rectangles',
    title: 'Rectangles: Perimeter & Area',
    description: 'Calculate perimeter and area of rectangles',
    icon: '▭',
    component: PerimeterAreaRectangles,
    difficulty: 'Easy',
    timeEstimate: '12 min',
    activities: 6,
    order: 4,
  },
  {
    id: 'area-triangles',
    title: 'Area of Triangles',
    description: 'Find the area of triangles using base and height',
    icon: '🔺',
    component: AreaTriangles,
    difficulty: 'Intermediate',
    timeEstimate: '12 min',
    activities: 5,
    order: 5,
  },
  {
    id: 'circles',
    title: 'Circles',
    description: 'Understand radius, diameter, and circumference',
    icon: '⭕',
    component: Circles,
    difficulty: 'Intermediate',
    timeEstimate: '15 min',
    activities: 6,
    order: 6,
  },
];

export function getTopicById(id: string): Topic | undefined {
  return topics.find((topic) => topic.id === id);
}

export function getNextTopic(currentId: string): Topic | undefined {
  const currentTopic = getTopicById(currentId);
  if (!currentTopic) return undefined;

  const nextOrder = currentTopic.order + 1;
  return topics.find((topic) => topic.order === nextOrder);
}

export function getPreviousTopic(currentId: string): Topic | undefined {
  const currentTopic = getTopicById(currentId);
  if (!currentTopic) return undefined;

  const prevOrder = currentTopic.order - 1;
  return topics.find((topic) => topic.order === prevOrder);
}
