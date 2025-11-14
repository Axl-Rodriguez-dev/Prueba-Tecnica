import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://localhost:5001/api'
})

function normalize(p) {
  if (!p) return null
  return {
    id: p.id ?? p.Id,
    nombre: p.nombre ?? p.Nombre ?? '',
    sku: p.sku ?? p.Sku ?? '',
    precio: p.precio ?? p.Precio ?? 0,
    stock: p.stock ?? p.Stock ?? 0,
    categoria: p.categoria ?? p.Categoria ?? ''
  }
}

export const listProducts = async () => {
  const data = (await api.get('/products')).data
  return Array.isArray(data) ? data.map(normalize) : []
}
export const getProduct = async (id) => normalize((await api.get(`/products/${id}`)).data)
export const createProduct = async (payload) => normalize((await api.post('/products', payload)).data)
export const updateProduct = async (id, payload) => normalize((await api.put(`/products/${id}`, payload)).data)

export const exportProduct = async () => {
  const response = await api.get('/products/export', { responseType: 'blob' })
  const blob = new Blob([response.data], { type: 'text/csv' })
  return window.URL.createObjectURL(blob)
}

export default api
