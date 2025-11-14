import { MdInventory } from 'react-icons/md'

export default function ProductDetail({ product }) {
  if (!product)
    return (
      <div className='text-center py-12'>
        <MdInventory className='text-6xl text-gray-400 mx-auto mb-3' />
        <p className='text-sm text-gray-500 font-medium'>Selecciona un producto</p>
      </div>
    )
  return (
    <div className='space-y-6'>
      <div className='flex items-center gap-3 pb-4 border-b-2 border-gray-200'>
        <MdInventory className='text-4xl text-blue-600' />
        <h2 className='text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>Producto #{product.id}</h2>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='bg-linear-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border-l-4 border-blue-500 shadow-sm'>
          <span className='text-xs font-bold text-blue-600 uppercase tracking-wide'>Nombre</span>
          <p className='text-lg font-semibold text-gray-800 mt-1'>{product.nombre}</p>
        </div>
        <div className='bg-linear-to-br from-purple-50 to-pink-50 p-4 rounded-xl border-l-4 border-purple-500 shadow-sm'>
          <span className='text-xs font-bold text-purple-600 uppercase tracking-wide'>SKU</span>
          <p className='text-lg font-mono font-semibold text-gray-800 mt-1'>{product.sku}</p>
        </div>
        <div className='bg-linear-to-br from-green-50 to-emerald-50 p-4 rounded-xl border-l-4 border-green-500 shadow-sm'>
          <span className='text-xs font-bold text-green-600 uppercase tracking-wide'>Precio</span>
          <p className='text-2xl font-bold text-green-700 mt-1'>${parseFloat(product.precio).toFixed(2)}</p>
        </div>
        <div className='bg-linear-to-br from-yellow-50 to-orange-50 p-4 rounded-xl border-l-4 border-yellow-500 shadow-sm'>
          <span className='text-xs font-bold text-yellow-700 uppercase tracking-wide'>Stock</span>
          <p className='text-2xl font-bold text-gray-800 mt-1'>
            {product.stock} <span className='text-sm text-gray-600'>unidades</span>
          </p>
        </div>
        <div className='bg-linear-to-br from-pink-50 to-rose-50 p-4 rounded-xl border-l-4 border-pink-500 shadow-sm md:col-span-2'>
          <span className='text-xs font-bold text-pink-600 uppercase tracking-wide'>Categoría</span>
          <p className='text-lg font-semibold text-gray-800 mt-1'>{product.categoria}</p>
        </div>
      </div>
    </div>
  )
}
