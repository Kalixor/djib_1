import { createContext, useContext, useState } from 'react'

const PeriodContext = createContext()

export const PeriodProvider = ({ children }) => {
  const [period, setPeriod] = useState('Annuelles')

  const togglePeriod = () => {
    const periods = ['Annuelles', 'Mensuelles', 'Hebdomadaires', 'Journalières']
    const currentIndex = periods.indexOf(period)
    const nextIndex = (currentIndex + 1) % periods.length
    setPeriod(periods[nextIndex])
  }

  return (
    <PeriodContext.Provider value={{ period, togglePeriod }}>
      {children}
    </PeriodContext.Provider>
  )
}

export const usePeriod = () => useContext(PeriodContext)
