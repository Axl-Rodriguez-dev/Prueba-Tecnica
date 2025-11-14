using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ProductRepository(AppDbContext context) : IProductRepository
    {

        public async Task<List<AppProduct>> GetAll()
        {
            return await context.Products.ToListAsync();
        }

        public async Task<AppProduct?> GetById(int id)
        {
            return await context.Products.FindAsync(id);
        }

        public async Task<AppProduct> Add(AppProduct product)
        {
            context.Products.Add(product);
            await context.SaveChangesAsync();
            return product;
        }

        public async Task<AppProduct> Update(int id, AppProduct product)
        {
            var existingProduct = context.Products.Find(id) ?? throw new KeyNotFoundException("Product to update not found");
            
            var duplicateSku = await context.Products
                .AnyAsync(p => p.Sku == product.Sku && p.Id != id);
            
            if (duplicateSku)
                throw new InvalidOperationException("A product with the same SKU already exists.");
            
            existingProduct.Nombre = product.Nombre;
            existingProduct.Sku = product.Sku;
            existingProduct.Precio = product.Precio;
            existingProduct.Stock = product.Stock;
            existingProduct.Categoria = product.Categoria;
            
            context.Products.Update(existingProduct);
            await context.SaveChangesAsync();
            return existingProduct;
        }
    }
}