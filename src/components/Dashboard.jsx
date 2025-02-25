import BarChart from './charts/BarChart'
    import PieChartOffice from './charts/PieChartOffice'
    import PieChartPayment from './charts/PieChartPayment'
    import KPI from './KPI'

    export default function Dashboard({ filters, setFilters }) {
      return (
        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <KPI title="Importations" value="12.5M" />
            <KPI title="Exportations" value="8.2M" />
            <KPI title="Manifestes" value="1.2K" />
            <KPI title="Recettes Totales" value="20.7M" />
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
