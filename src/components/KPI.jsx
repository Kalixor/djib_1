export default function KPI({ title, value }) {
      return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg dark:hover:shadow-white/10 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-300 hover:scale-95">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
        </div>
      )
    }
