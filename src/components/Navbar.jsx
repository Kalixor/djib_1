import { useTheme } from '../context/ThemeContext'
import { usePeriod } from '../context/PeriodContext'
import { useState } from 'react'

export default function Navbar() {
  const { darkMode, setDarkMode } = useTheme()
  const { period, togglePeriod } = usePeriod()
  const [greenToneIndex, setGreenToneIndex] = useState(0)

  // Tableau de classes Tailwind CSS pour les différentes nuances de vert
  const greenTones = [
    { light: 'bg-green-100 hover:bg-green-200 border-green-200 text-green-800',
      dark: 'dark:bg-green-700 dark:hover:bg-green-600 dark:border-green-700 dark:text-green-200' },
    { light: 'bg-emerald-100 hover:bg-emerald-200 border-emerald-200 text-emerald-800',
      dark: 'dark:bg-emerald-700 dark:hover:bg-emerald-600 dark:border-emerald-700 dark:text-emerald-200' },
    { light: 'bg-lime-100 hover:bg-lime-200 border-lime-200 text-lime-800',
      dark: 'dark:bg-lime-700 dark:hover:bg-lime-600 dark:border-lime-700 dark:text-lime-200' },
    { light: 'bg-teal-100 hover:bg-teal-200 border-teal-200 text-teal-800',
      dark: 'dark:bg-teal-700 dark:hover:bg-teal-600 dark:border-teal-700 dark:text-teal-200' }
  ]

  const handlePeriodToggle = () => {
    togglePeriod()
    // Change le ton de vert à chaque clic
    setGreenToneIndex((prevIndex) => (prevIndex + 1) % greenTones.length)
  }

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
        <div className="w-36"></div>

        <h1 className="text-xl font-bold text-gray-800 dark:text-white text-center absolute left-1/2 transform -translate-x-1/2">
          Activités des Douanes
					<p className="text-sm text-gray-400"> Au {getCurrentDate()}</p>
        </h1>
				
        <div className="flex items-center gap-4">
          <button
            onClick={handlePeriodToggle}
            className={`px-6 py-1.5 rounded-full text-sm font-medium transition-all duration-300
              ${greenTones[greenToneIndex].light} ${greenTones[greenToneIndex].dark}
              hover:scale-105 active:scale-95 w-36 text-center whitespace-nowrap`}
          >
            {period}
          </button>

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
