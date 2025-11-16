import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-white border-b-2 border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="text-4xl">📐</div>
            <div>
              <h1 className="text-xl md:text-2xl font-extrabold text-gray-900">
                Geometry Playground
              </h1>
              <p className="text-xs text-gray-500 hidden md:block">Learn. Play. Explore.</p>
            </div>
          </Link>

          {/* Simple Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="text-base font-semibold text-gray-700 hover:text-blue-600 transition-colors"
            >
              Home
            </Link>
            <a
              href="#topics"
              className="text-base font-semibold text-gray-700 hover:text-blue-600 transition-colors"
            >
              Topics
            </a>
          </nav>

          {/* Mobile Menu Icon (optional - for future) */}
          <Link
            to="/"
            className="md:hidden text-3xl hover:opacity-80 transition-opacity"
            aria-label="Home"
          >
            🏠
          </Link>
        </div>
      </div>
    </header>
  );
}
