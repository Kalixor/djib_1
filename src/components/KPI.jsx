import React, { useState, useEffect, useRef } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Text } from 'recharts'

const KPI = ({ title, value, isActive, onClick }) => {
  const [sortAscending, setSortAscending] = useState(true)
  const [isChartView, setIsChartView] = useState(false)
  const [activeIndex, setActiveIndex] = useState(null)
  const kpiRef = useRef(null)

  // Variantes de jaune
  const YELLOW_COLORS = [
    '#FFD700', // Or
    '#FFC300', // Jaune vif
    '#FFA500', // Orange
    '#FF8C00', // Orange foncé
    '#FFD700', // Or
    '#FFC300', // Jaune vif
    '#FFA500', // Orange
    '#FF8C00'  // Orange foncé
  ]

  const onPieEnter = (_, index) => {
    setActiveIndex(index)
  }

  const onPieLeave = () => {
    setActiveIndex(null)
  }

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill="#333"
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontSize: '0.8rem',
          fontWeight: 'bold',
          pointerEvents: 'none',  // Empêche l'interaction avec les labels
          opacity: 1,  // Opacité constante
          transition: 'none'  // Pas d'animation
        }}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  const renderCenterLabel = () => {
    if (activeIndex === null) return null
    
    const activeItem = getSubItems()[activeIndex]
    return (
      <text
        x="50%"
        y="50%"
        fill="#FFC300"  // Jaune flashy
        textAnchor="middle"
        dominantBaseline="middle"
        style={{
          fontSize: '1.2rem',  // Taille légèrement augmentée
          fontWeight: 'bold',
          textShadow: '0 0 4px rgba(255,195,0,0.8)',  // Ombre portée jaune
          filter: 'none'  // Suppression du flou
        }}
      >
        {activeItem.name}
      </text>
    )
  }

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
        { name: 'Produits agricoles', value: 4.2 },
        { name: 'Matériel industriel', value: 3.8 },
        { name: 'Produits chimiques', value: 2.5 },
        { name: 'Autres', value: 2.0 }
      ],
      'Exportations': [
        { name: 'Textiles', value: 3.0 },
        { name: 'Produits pétroliers', value: 2.5 },
        { name: 'Métaux', value: 1.7 },
        { name: 'Autres', value: 1.0 }
      ],
      'Manifestes': [
        { name: 'Maritimes', value: 800 },
        { name: 'Aériens', value: 300 },
        { name: 'Terrestres', value: 100 }
      ],
      'Recettes Totales': [
        { name: 'Droits de douane', value: 12.5 },
        { name: 'Taxes', value: 5.2 },
        { name: 'Amendes', value: 2.0 },
        { name: 'Autres', value: 1.0 }
      ]
    }

    const data = items[title] || []
    return data.sort((a, b) => {
      return sortAscending ? a.value - b.value : b.value - a.value
    })
  }

  const toggleSort = (e) => {
    e.stopPropagation()
    setSortAscending(!sortAscending)
  }

  const toggleView = (e) => {
    e.stopPropagation()
    setIsChartView(!isChartView)
  }

  const renderChart = () => {
    const data = getSubItems()

    return (
      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              fill="#FFD700"
              paddingAngle={5}
              dataKey="value"
              label={renderCustomizedLabel}
              labelLine={false}
              isAnimationActive={false}  // Désactive les animations
              activeIndex={activeIndex}
              activeShape={{
                outerRadius: 130,
                innerRadius: 70,
                fill: '#FFC300'
              }}
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={YELLOW_COLORS[index % YELLOW_COLORS.length]}
                  strokeWidth={activeIndex === index ? 2 : 1}
                  stroke="#FF8C00"
                />
              ))}
            </Pie>
            {renderCenterLabel()}
          </PieChart>
        </ResponsiveContainer>
      </div>
    )
  }

  const renderList = () => {
    const data = getSubItems()

     return (
      <div className="p-3 space-y-2">
        {data.map((item, index) => (
          <div 
            key={index} 
            className="group/subitem grid grid-cols-[minmax(120px,1fr)_80px_32px] items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300 truncate">{item.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{((item.value / data.reduce((sum, i) => sum + i.value, 0)) * 100).toFixed(0)}%</p>
            </div>
            <p className="text-lg font-medium text-gray-800 dark:text-gray-200 text-center">
              {item.value}M
            </p>
            <i className={`${getSubItemIcon(item.name)} text-xl text-gray-300 dark:text-gray-600 group-hover/subitem:text-yellow-400 transition-colors duration-300`} />
          </div>
        ))}
      </div>
    )
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
          <div className="absolute bottom-1 right-20 flex gap-2">
            <button
              onClick={toggleView}
              className="p-[0.35rem] rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300"
              title="Toggle View"
            >
              <i className={`fas ${isChartView ? 'fa-list' : 'fa-chart-pie'} text-xs text-gray-800 dark:text-gray-200`} />
            </button>
            <button
              onClick={toggleSort}
              className="p-[0.35rem] rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300"
              title="Sort"
            >
              <i className={`fas ${sortAscending ? 'fa-sort-amount-down-alt' : 'fa-sort-amount-up'} text-xs text-gray-800 dark:text-gray-200`} />
            </button>
          </div>

          <div className="absolute z-50 top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            {isChartView ? renderChart() : renderList()}
          </div>
        </>
      )}
    </div>
  )
}

export default KPI
