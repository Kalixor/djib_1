import { useState } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { PeriodProvider } from './context/PeriodContext'
import Dashboard from './components/Dashboard'
import Navbar from './components/Navbar'

function App() {
  const [filters, setFilters] = useState({
    period: 'month',
    office: 'all',
    payment: 'all'
  })

  return (
    <ThemeProvider>
      <PeriodProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <Navbar />
          <Dashboard filters={filters} setFilters={setFilters} />
        </div>
      </PeriodProvider>
    </ThemeProvider>
  )
}

export default App
