import { useTheme } from '../context/ThemeContext'

    export default function Navbar() {
      const { darkMode, setDarkMode } = useTheme()

      return (
        <nav className="bg-white dark:bg-gray-800 shadow p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800 dark:text-white text-center flex-1">
              Activités des Douanes
            </h1>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300"
            >
              <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'} text-xl text-gray-800 dark:text-gray-200`} />
            </button>
          </div>
        </nav>
      )
    }
