using API.Models;

namespace API.Interfaces
{
    public interface ICsvExportService
    {
        byte[] ExportToCsv(IEnumerable<AppProduct> products);
    }
}
