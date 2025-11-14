import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { FaTimes, FaEdit } from 'react-icons/fa'
import { ImSpinner2 } from 'react-icons/im'
import { getProduct, updateProduct } from '../services/api'
import ProductForm from '../components/ProductForm'

export default function ProductEditPage() {
  const { id } = useParams()
  const navigate = useNavigate()
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

  async function handleUpdate(values) {
    const payload = {
      Nombre: values.nombre,
      Sku: values.sku,
      Precio: Number(values.precio),
      Stock: Number(values.stock),
      Categoria: values.categoria
    }
    const updated = await updateProduct(id, payload)
    navigate(`/products/${updated.id}`)
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center gap-3'>
        <Link
          to={`/products/${id}`}
          className='px-4 py-2.5 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm font-medium shadow-sm hover:shadow transition-all duration-200 transform hover:-translate-y-0.5 flex items-center gap-2'
        >
          <FaTimes /> Cancelar
        </Link>
      </div>
      <div className='flex items-center gap-3'>
        <FaEdit className='text-4xl text-blue-600' />
        <h2 className='text-3xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>Editar Producto</h2>
      </div>
      <div className='border border-gray-200 rounded-xl p-8 bg-white shadow-lg'>
        {loading ? (
          <div className='text-center py-12'>
            <ImSpinner2 className='inline-block animate-spin text-5xl text-blue-600 mb-4' />
            <p className='text-sm text-gray-600 font-medium'>Cargando producto...</p>
          </div>
        ) : (
          <ProductForm
            defaultValues={
              product && {
                nombre: product.nombre,
                sku: product.sku,
                precio: product.precio,
                stock: product.stock,
                categoria: product.categoria
              }
            }
            onSubmit={handleUpdate}
            submitLabel='Guardar Cambios'
          />
        )}
      </div>
    </div>
  )
}
