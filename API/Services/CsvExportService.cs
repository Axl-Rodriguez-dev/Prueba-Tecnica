using System.Text;
using API.Interfaces;
using API.Models;

namespace API.Services
{
    public class CsvExportService : ICsvExportService
    {
        public byte[] ExportToCsv(IEnumerable<AppProduct> products)
        {
            var csv = new StringBuilder();
            
            // Headers
            csv.AppendLine("Id,Nombre,Sku,Precio,Stock,Categoria");
            
            // Data rows
            foreach (var product in products)
            {
                csv.AppendLine($"{product.Id},{EscapeCsvField(product.Nombre)},{EscapeCsvField(product.Sku)},{product.Precio},{product.Stock},{EscapeCsvField(product.Categoria)}");
            }
            
            return Encoding.UTF8.GetBytes(csv.ToString());
        }
        
        private static string EscapeCsvField(string field)
        {
            if (string.IsNullOrEmpty(field))
                return field;
            
            // Si el campo contiene comas, comillas o saltos de línea, debe ir entre comillas
            if (field.Contains(',') || field.Contains('"') || field.Contains('\n') || field.Contains('\r'))
            {
                // Escapar comillas dobles duplicándolas
                field = field.Replace("\"", "\"\"");
                return $"\"{field}\"";
            }
            
            return field;
        }
    }
}
