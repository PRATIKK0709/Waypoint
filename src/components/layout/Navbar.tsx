import { Compass, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../theme/ThemeToggle';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="glass-morphism sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-indigo-500/10 dark:bg-indigo-500/20">
                <Compass className="h-6 w-6 text-indigo-500 dark:text-indigo-400" />
              </div>
              <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-blue-500 dark:from-indigo-400 dark:to-blue-400">
                Waypoint
              </span>
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link
              to="/share"
              className="hidden sm:flex items-center px-4 py-2 rounded-lg text-white bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg"
            >
              Share Location
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="sm:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden glass-morphism mt-1">
          <div className="px-4 py-3">
            <Link
              to="/share"
              className="block text-center px-4 py-2 rounded-lg text-white bg-gradient-to-r from-indigo-500 to-blue-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Share Location
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}