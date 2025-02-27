import { useTheme } from '../context/ThemeContext'
import { usePeriod } from '../context/PeriodContext'

export default function Navbar() {
  const { darkMode, setDarkMode } = useTheme()
  const { period, togglePeriod } = usePeriod()

	const getCurrentDate = () => {
		const now = new Date()
		const day = String(now.getDate()).padStart(2, '0')
		const month = String(now.getMonth() + 1).padStart(2, '0')
		const year = now.getFullYear()
		const hours = String(now.getHours()).padStart(2, '0')
		const minutes = String(now.getMinutes()).padStart(2, '0')
		return `${day}/${month}/${year} ${hours}:${minutes}`
	}

  return (
    <nav className="bg-white dark:bg-gray-800 shadow p-4 relative">
      <div className="container mx-auto flex justify-between items-center">
        {/* Conteneur des boutons à gauche (vide pour équilibrer l'espace) */}
        <div className="w-36"></div>

        {/* Titre centré absolument */}
        <h1 className="text-xl font-bold text-gray-800 dark:text-white text-center absolute left-1/2 transform -translate-x-1/2">
          Activités des Douanes
          <h2 className="text-sm text-gray-400"> Au {getCurrentDate()}</h2>
        </h1>
        {/* Conteneur des boutons à droite */}
        <div className="flex items-center gap-4">
          {/* Bouton sélecteur de période */}
          <button
            onClick={togglePeriod}
            className="px-6 py-1.5 rounded-full text-sm font-medium transition-all duration-300
              bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600
              text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700
              hover:scale-105 active:scale-95 w-36 text-center whitespace-nowrap"
          >
            {period}
          </button>

          {/* Bouton mode nuit */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300"
          >
            <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'} text-xl text-gray-800 dark:text-gray-200`} />
          </button>
        </div>
      </div>
    </nav>
  )
}
