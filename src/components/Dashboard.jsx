import { useState } from 'react'
import BarChart from './charts/BarChart'
import PieChartOffice from './charts/PieChartOffice'
import PieChartPayment from './charts/PieChartPayment'
import KPI from './KPI'

export default function Dashboard({ filters, setFilters }) {
  const [activeKPI, setActiveKPI] = useState(null)

  return (
    <main className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 relative" style={{ gridAutoRows: '1fr' }}>
        <KPI 
          title="Importations" 
          value="12.5M" 
          isActive={activeKPI === 'Importations'}
          onClick={() => setActiveKPI(activeKPI === 'Importations' ? null : 'Importations')}
          style={{ gridRow: 'span 2' }}
        />
        <KPI 
          title="Exportations" 
          value="8.2M" 
          isActive={activeKPI === 'Exportations'}
          onClick={() => setActiveKPI(activeKPI === 'Exportations' ? null : 'Exportations')}
          style={{ gridRow: 'span 2' }}
        />
        <KPI 
          title="Manifestes" 
          value="1.2K" 
          isActive={activeKPI === 'Manifestes'}
          onClick={() => setActiveKPI(activeKPI === 'Manifestes' ? null : 'Manifestes')}
          style={{ gridRow: 'span 2' }}
        />
        <KPI 
          title="Recettes Totales" 
          value="20.7M" 
          isActive={activeKPI === 'Recettes Totales'}
          onClick={() => setActiveKPI(activeKPI === 'Recettes Totales' ? null : 'Recettes Totales')}
          style={{ gridRow: 'span 2' }}
        />
      </div>

      <div className="mb-8">
        <BarChart filters={filters} setFilters={setFilters} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <PieChartOffice filters={filters} setFilters={setFilters} />
        <PieChartPayment filters={filters} setFilters={setFilters} />
      </div>
    </main>
  )
}
