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
}

export const topics: Topic[] = [
  {
    id: 'lines-and-rays',
    title: 'Points, Lines & Rays',
    description: 'Learn about points, lines, line segments, and rays',
    icon: '📏',
    component: LinesAndRays,
  },
  {
    id: 'angles',
    title: 'Angles',
    description: 'Explore acute, right, obtuse, and straight angles',
    icon: '📐',
    component: Angles,
  },
  {
    id: 'triangles',
    title: 'Triangles',
    description: 'Discover different types of triangles by sides and angles',
    icon: '△',
    component: Triangles,
  },
  {
    id: 'perimeter-area-rectangles',
    title: 'Rectangles: Perimeter & Area',
    description: 'Calculate perimeter and area of rectangles',
    icon: '▭',
    component: PerimeterAreaRectangles,
  },
  {
    id: 'area-triangles',
    title: 'Area of Triangles',
    description: 'Find the area of triangles using base and height',
    icon: '🔺',
    component: AreaTriangles,
  },
  {
    id: 'circles',
    title: 'Circles',
    description: 'Understand radius, diameter, and circumference',
    icon: '⭕',
    component: Circles,
  },
];

export function getTopicById(id: string): Topic | undefined {
  return topics.find((topic) => topic.id === id);
}
