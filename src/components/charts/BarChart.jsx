import { BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

    export default function BarChart({ filters, setFilters }) {
      const data = [
        { name: 'Janvier', value: 4200 },
        { name: 'Février', value: 3800 },
        { name: 'Mars', value: 4500 },
        { name: 'Avril', value: 4100 },
        { name: 'Mai', value: 4700 },
        { name: 'Juin', value: 4900 },
        { name: 'Juillet', value: 5100 },
        { name: 'Août', value: 4800 },
        { name: 'Septembre', value: 4600 },
        { name: 'Octobre', value: 4400 },
        { name: 'Novembre', value: 4300 },
        { name: 'Décembre', value: 5000 },
      ]

      return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Évolution des recettes
            </h3>
            <select
              value={filters.period}
              onChange={(e) => setFilters({ ...filters, period: e.target.value })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            >
              <option value="day">Jour</option>
              <option value="week">Semaine</option>
              <option value="month">Mois</option>
              <option value="year">Année</option>
            </select>
          </div>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <ReBarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="name" stroke="#888888" />
                <YAxis stroke="#888888" />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </ReBarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )
    }
