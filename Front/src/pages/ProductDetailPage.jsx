import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FaArrowLeft, FaEdit } from 'react-icons/fa'
import { ImSpinner2 } from 'react-icons/im'
import { getProduct } from '../services/api'
import ProductDetail from '../components/ProductDetail'

export default function ProductDetailPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(false)

  async function load() {
    setLoading(true)
    try {
      setProduct(await getProduct(id))
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    load()
  }, [id])

  return (
    <div className='space-y-6'>
      <div className='flex items-center gap-3'>
        <Link
          to='/products'
          className='px-4 py-2.5 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm font-medium shadow-sm hover:shadow transition-all duration-200 transform hover:-translate-y-0.5 flex items-center gap-2'
        >
          <FaArrowLeft /> Volver
        </Link>
        {product && (
          <Link
            to={`/products/${product.id}/edit`}
            className='px-4 py-2.5 rounded-lg bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 flex items-center gap-2'
          >
            <FaEdit /> Editar
          </Link>
        )}
      </div>
      <div className='border border-gray-200 rounded-xl p-8 bg-white shadow-lg'>
        {loading ? (
          <div className='text-center py-12'>
            <ImSpinner2 className='inline-block animate-spin text-5xl text-blue-600 mb-4' />
            <p className='text-sm text-gray-600 font-medium'>Cargando producto...</p>
          </div>
        ) : (
          <ProductDetail product={product} />
        )}
      </div>
    </div>
  )
}
