import { Routes, Route, Link, Navigate } from 'react-router-dom'
import { MdInventory } from 'react-icons/md'
import ProductsListPage from './pages/ProductsListPage'
import ProductCreatePage from './pages/ProductCreatePage'
import ProductDetailPage from './pages/ProductDetailPage'
import ProductEditPage from './pages/ProductEditPage'

export default function App() {
  return (
    <div className='mx-auto flex min-h-screen max-w-screen flex-col overflow-x-hidden bg-linear-to-br from-gray-50 via-blue-50 to-gray-100'>
      <header className='bg-white/80 backdrop-blur-md shadow-md border-b border-gray-200 sticky top-0 z-50'>
        <div className='max-w-7xl mx-auto px-6 py-4 flex items-center gap-8'>
          <Link
            to='/products'
            className='text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2'
          >
            <MdInventory className='text-blue-600' /> Catálogo
          </Link>
          <nav className='flex gap-6 text-sm font-medium'>
            <Link to='/products' className='hover:text-blue-600 transition-colors duration-200 hover:scale-105 transform'>
              Productos
            </Link>
            <Link to='/products/new' className='hover:text-purple-600 transition-colors duration-200 hover:scale-105 transform'>
              Nuevo
            </Link>
          </nav>
        </div>
      </header>
      <main className='max-w-7xl mx-auto px-6 py-8 flex-1'>
        <Routes>
          <Route path='/' element={<Navigate to='/products' replace />} />
          <Route path='/products' element={<ProductsListPage />} />
          <Route path='/products/new' element={<ProductCreatePage />} />
          <Route path='/products/:id' element={<ProductDetailPage />} />
          <Route path='/products/:id/edit' element={<ProductEditPage />} />
        </Routes>
      </main>
      <footer className='text-xs text-gray-500 text-center py-8 bg-white/50 backdrop-blur-sm border-t border-gray-200 mt-auto'>
        Autor Axl Rodriguez Desarrollado como parte de la Prueba Técnica Junior para PERMODA.
      </footer>
    </div>
  )
}
