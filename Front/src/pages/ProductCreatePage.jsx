import { useNavigate } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa'
import { createProduct } from '../services/api'
import ProductForm from '../components/ProductForm'

export default function ProductCreatePage() {
  const navigate = useNavigate()
  async function handleCreate(values) {
    const payload = {
      Nombre: values.nombre,
      Sku: values.sku,
      Precio: Number(values.precio),
      Stock: Number(values.stock),
      Categoria: values.categoria
    }
    const created = await createProduct(payload)
    navigate(`/products/${created.id}`)
  }
  return (
    <div className='space-y-6'>
      <div className='flex items-center gap-3'>
        <FaPlus className='text-4xl text-green-600' />
        <h2 className='text-3xl font-bold bg-linear-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent'>Crear Producto</h2>
      </div>
      <div className='border border-gray-200 rounded-xl p-8 bg-white shadow-lg'>
        <ProductForm onSubmit={handleCreate} submitLabel='Crear Producto' />
      </div>
    </div>
  )
}
