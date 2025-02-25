import { useTheme } from '../context/ThemeContext'

    export default function Navbar() {
      const { darkMode, setDarkMode } = useTheme()

      return (
        <nav className="bg-white dark:bg-gray-800 shadow p-4">
          <div className="container mx-auto flex justify-center items-center space-x-4">
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">
              Activités des Douanes
            </h1>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
            >
              {darkMode ? '🌞' : '🌙'}
            </button>
          </div>
        </nav>
      )
    }
