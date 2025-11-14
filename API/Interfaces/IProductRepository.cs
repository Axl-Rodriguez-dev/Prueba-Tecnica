using API.Models;

namespace API.Data
{
    public interface IProductRepository
    {
        Task<List<AppProduct>> GetAll();
        Task<AppProduct?> GetById(int id);
        Task<AppProduct> Add(AppProduct product);
        Task<AppProduct> Update(int id, AppProduct product);
    }
}