import { useEffect, useState } from 'react'
import { FaSearch, FaSync, FaFileExport, FaPlus } from 'react-icons/fa'
import { exportProduct, listProducts } from '../services/api'
import ProductList from '../components/ProductList'
import { Link } from 'react-router-dom'

export default function ProductsListPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')

  async function load() {
    setLoading(true)
    try {
      setProducts(await listProducts())
    } finally {
      setLoading(false)
    }
  }

  async function handleExport() {
    try {
      const url = await exportProduct()
      const link = document.createElement('a')
      link.href = url
      link.download = `products_${new Date().getTime()}.csv`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error al exportar:', error)
      alert('Error al exportar el archivo CSV')
    }
  }

  useEffect(() => {
    load()
  }, [])

  const filtered = products.filter((p) => {
    const s = search.toLowerCase()
    return p.nombre.toLowerCase().includes(s) || p.sku.toLowerCase().includes(s)
  })

  return (
    <div className='space-y-6'>
      <div className='flex items-center gap-3 flex-wrap'>
        <div className='relative flex-1 min-w-[250px] max-w-md'>
          <FaSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Buscar nombre o SKU...'
            className='w-full border border-gray-300 pl-10 pr-4 py-2.5 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
          />
        </div>
        <button onClick={() => setSearch('')} className='px-4 py-2.5 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm font-medium cursor-pointer transition-all duration-200 shadow-sm hover:shadow'>
          Limpiar
        </button>
        <button
          onClick={load}
          disabled={loading}
          className='px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-medium cursor-pointer transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center gap-2'
        >
          <FaSync className={loading ? 'animate-spin' : ''} /> {loading ? 'Cargando...' : 'Refrescar'}
        </button>
        <button
          onClick={handleExport}
          className='px-4 py-2.5 rounded-lg bg-linear-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 flex items-center gap-2'
        >
          <FaFileExport /> Exportar CSV
        </button>
        <Link
          to='/products/new'
          className='ml-auto px-4 py-2.5 rounded-lg bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 flex items-center gap-2'
        >
          <FaPlus /> Nuevo
        </Link>
      </div>
      <div className='border border-gray-200 rounded-xl p-6 bg-white shadow-lg'>
        <ProductList products={filtered} />
      </div>
    </div>
  )
}
