import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <Link to="/" className="hover:opacity-80 transition-opacity">
          <h1 className="text-2xl md:text-3xl font-bold">
            📐 Geometry Playground
          </h1>
        </Link>
      </div>
    </header>
  );
}
