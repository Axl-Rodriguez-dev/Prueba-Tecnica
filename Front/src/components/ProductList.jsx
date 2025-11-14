import { useNavigate } from 'react-router-dom'
import { MdInventory } from 'react-icons/md'

export default function ProductList({ products }) {
  const navigate = useNavigate()
  if (!products.length)
    return (
      <div className='text-center py-12'>
        <MdInventory className='text-6xl text-gray-400 mx-auto mb-3' />
        <p className='text-sm text-gray-500 font-medium'>No hay productos disponibles</p>
      </div>
    )
  return (
    <div className='overflow-x-auto'>
      <table className='w-full text-sm'>
        <thead>
          <tr className='border-b-2 border-gray-300 bg-linear-to-r from-gray-50 to-gray-100'>
            <th className='py-3 px-4 text-left font-bold text-gray-700'>ID</th>
            <th className='py-3 px-4 text-left font-bold text-gray-700'>Nombre</th>
            <th className='py-3 px-4 text-left font-bold text-gray-700'>SKU</th>
            <th className='py-3 px-4 text-left font-bold text-gray-700'>Precio</th>
            <th className='py-3 px-4 text-left font-bold text-gray-700'>Stock</th>
            <th className='py-3 px-4 text-left font-bold text-gray-700'>Categoría</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, idx) => (
            <tr
              key={p.id}
              onClick={() => navigate(`/products/${p.id}`)}
              className={`border-b border-gray-200 hover:bg-blue-50 transition-colors duration-150 cursor-pointer ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
            >
              <td className='py-3 px-4 font-medium text-gray-600'>#{p.id}</td>
              <td className='py-3 px-4'>
                <span className='text-blue-600 hover:text-blue-800 font-semibold hover:underline transition-colors duration-150'>{p.nombre}</span>
              </td>
              <td className='py-3 px-4 text-gray-700 font-mono text-xs'>{p.sku}</td>
              <td className='py-3 px-4 text-green-700 font-bold'>${parseFloat(p.precio).toFixed(2)}</td>
              <td className='py-3 px-4'>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    p.stock > 50 ? 'bg-green-100 text-green-800' : p.stock > 20 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                  }`}
                >
                  {p.stock}
                </span>
              </td>
              <td className='py-3 px-4'>
                <span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800'>{p.categoria}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
