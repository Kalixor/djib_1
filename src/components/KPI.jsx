import { useState, useEffect, useRef } from 'react'

const KPI = ({ title, value, isActive, onClick }) => {
  const [sortAscending, setSortAscending] = useState(true)
  const kpiRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (kpiRef.current && !kpiRef.current.contains(event.target)) {
        if (isActive) {
          onClick()
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isActive, onClick])

  const getIcon = () => {
    switch(title) {
      case 'Importations': return 'fas fa-boxes-packing'
      case 'Exportations': return 'fas fa-truck-fast'
      case 'Manifestes': return 'fas fa-clipboard-list'
      case 'Recettes Totales': return 'fas fa-coins'
      default: return 'fas fa-circle-info'
    }
  }

  const getSubItemIcon = (label) => {
    switch(label) {
      case 'Produits agricoles': return 'fas fa-wheat-awn'
      case 'Matériel industriel': return 'fas fa-industry'
      case 'Produits chimiques': return 'fas fa-flask'
      case 'Textiles': return 'fas fa-tshirt'
      case 'Produits pétroliers': return 'fas fa-gas-pump'
      case 'Métaux': return 'fas fa-cubes'
      case 'Maritimes': return 'fas fa-ship'
      case 'Aériens': return 'fas fa-plane'
      case 'Terrestres': return 'fas fa-truck'
      case 'Droits de douane': return 'fas fa-file-invoice-dollar'
      case 'Taxes': return 'fas fa-percent'
      case 'Amendes': return 'fas fa-gavel'
      default: return 'fas fa-circle-info'
    }
  }

  const getSubItems = () => {
    const items = {
      'Importations': [
        { label: 'Produits agricoles', value: '4.2M', percentage: '34%' },
        { label: 'Matériel industriel', value: '3.8M', percentage: '30%' },
        { label: 'Produits chimiques', value: '2.5M', percentage: '20%' },
        { label: 'Autres', value: '2.0M', percentage: '16%' }
      ],
      'Exportations': [
        { label: 'Textiles', value: '3.0M', percentage: '37%' },
        { label: 'Produits pétroliers', value: '2.5M', percentage: '30%' },
        { label: 'Métaux', value: '1.7M', percentage: '21%' },
        { label: 'Autres', value: '1.0M', percentage: '12%' }
      ],
      'Manifestes': [
        { label: 'Maritimes', value: '800', percentage: '67%' },
        { label: 'Aériens', value: '300', percentage: '25%' },
        { label: 'Terrestres', value: '100', percentage: '8%' }
      ],
      'Recettes Totales': [
        { label: 'Droits de douane', value: '12.5M', percentage: '60%' },
        { label: 'Taxes', value: '5.2M', percentage: '25%' },
        { label: 'Amendes', value: '2.0M', percentage: '10%' },
        { label: 'Autres', value: '1.0M', percentage: '5%' }
      ]
    }

    return (items[title] || []).sort((a, b) => {
      const valueA = parseFloat(a.value)
      const valueB = parseFloat(b.value)
      return sortAscending ? valueA - valueB : valueB - valueA
    })
  }

  const toggleSort = (e) => {
    e.stopPropagation()
    setSortAscending(!sortAscending)
  }

  return (
    <div 
      ref={kpiRef}
      className={`group bg-white dark:bg-gray-800 p-4 rounded-lg shadow ${
        isActive 
          ? 'shadow-lg dark:shadow-[0_0_15px_5px_rgba(255,255,0,0.3)]' 
          : 'hover:shadow-lg dark:hover:shadow-[0_0_15px_5px_rgba(255,255,0,0.3)]'
      } border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-300 cursor-pointer relative`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
        </div>
        <i className={`${getIcon()} text-3xl ${
          isActive
            ? 'text-yellow-400'
            : 'text-gray-300 dark:text-gray-600 group-hover:text-yellow-400'
        } transition-colors duration-300`} />
      </div>

      {isActive && (
        <>
          <button
            onClick={toggleSort}
            className="absolute bottom-1 right-20 p-[0.25rem] rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300"
          >
            <i className={`fas ${sortAscending ? 'fa-sort-amount-down-alt' : 'fa-sort-amount-up'} text-xs text-gray-800 dark:text-gray-200`} />
          </button>

          <div className="absolute z-50 top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <div className="p-3 space-y-2">
              {getSubItems().map((item, index) => (
                <div 
                  key={index} 
                  className="group/subitem grid grid-cols-[minmax(120px,1fr)_80px_32px] items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300 truncate">{item.label}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.percentage}</p>
                  </div>
                  <p className="text-lg font-medium text-gray-800 dark:text-gray-200 text-center">
                    {item.value}
                  </p>
                  <i className={`${getSubItemIcon(item.label)} text-xl text-gray-300 dark:text-gray-600 group-hover/subitem:text-yellow-400 transition-colors duration-300`} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default KPI
