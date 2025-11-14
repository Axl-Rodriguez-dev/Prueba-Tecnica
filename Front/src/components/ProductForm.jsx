import { useForm } from 'react-hook-form'
import { FaCheck, FaExclamationTriangle } from 'react-icons/fa'
import { ImSpinner2 } from 'react-icons/im'

export default function ProductForm({ defaultValues, onSubmit, submitLabel }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: defaultValues || { nombre: '', sku: '', precio: '', stock: '', categoria: '' }
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='flex flex-col gap-2'>
          <label className='text-sm font-semibold text-gray-700'>Nombre del Producto</label>
          <input
            className='border-2 border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:border-gray-400'
            {...register('nombre', { required: 'Nombre requerido' })}
            placeholder='Ej: Laptop Dell XPS 13'
          />
          {errors.nombre && (
            <p className='text-xs text-red-600 font-medium flex items-center gap-1'>
              <FaExclamationTriangle /> {errors.nombre.message}
            </p>
          )}
        </div>
        <div className='flex flex-col gap-2'>
          <label className='text-sm font-semibold text-gray-700'>SKU</label>
          <input
            className='border-2 border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:border-gray-400 font-mono'
            {...register('sku', { required: 'SKU requerido' })}
            placeholder='Ej: PROD-001'
          />
          {errors.sku && (
            <p className='text-xs text-red-600 font-medium flex items-center gap-1'>
              <FaExclamationTriangle /> {errors.sku.message}
            </p>
          )}
        </div>
        <div className='flex flex-col gap-2'>
          <label className='text-sm font-semibold text-gray-700'>Precio ($)</label>
          <input
            type='number'
            step='0.01'
            className='border-2 border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 shadow-sm hover:border-gray-400'
            {...register('precio', { required: 'Precio requerido', min: { value: 0, message: 'Debe ser >= 0' } })}
            placeholder='0.00'
          />
          {errors.precio && (
            <p className='text-xs text-red-600 font-medium flex items-center gap-1'>
              <FaExclamationTriangle /> {errors.precio.message}
            </p>
          )}
        </div>
        <div className='flex flex-col gap-2'>
          <label className='text-sm font-semibold text-gray-700'>Stock (unidades)</label>
          <input
            type='number'
            className='border-2 border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 shadow-sm hover:border-gray-400'
            {...register('stock', { required: 'Stock requerido', min: { value: 0, message: 'Debe ser >= 0' } })}
            placeholder='0'
          />
          {errors.stock && (
            <p className='text-xs text-red-600 font-medium flex items-center gap-1'>
              <FaExclamationTriangle /> {errors.stock.message}
            </p>
          )}
        </div>
        <div className='flex flex-col gap-2 md:col-span-2'>
          <label className='text-sm font-semibold text-gray-700'>Categoría</label>
          <input
            className='border-2 border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 shadow-sm hover:border-gray-400'
            {...register('categoria', { required: 'Categoría requerida' })}
            placeholder='Ej: Electrónica, Ropa, Alimentos...'
          />
          {errors.categoria && (
            <p className='text-xs text-red-600 font-medium flex items-center gap-1'>
              <FaExclamationTriangle /> {errors.categoria.message}
            </p>
          )}
        </div>
      </div>
      <button
        disabled={isSubmitting}
        className='bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-3 rounded-lg text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 disabled:cursor-not-allowed flex items-center gap-2 justify-center'
      >
        {isSubmitting ? (
          <>
            <ImSpinner2 className='animate-spin' /> Enviando...
          </>
        ) : (
          <>
            <FaCheck /> {submitLabel}
          </>
        )}
      </button>
    </form>
  )
}
