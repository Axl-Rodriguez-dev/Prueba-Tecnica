namespace API.Models;

public class AppProduct
{
    public int Id { get; set; }
    public required string Nombre { get; set; } = string.Empty;
    public required string Sku { get; set; } = string.Empty;
    public required decimal Precio { get; set; }
    public required int Stock { get; set; }
    public required string Categoria { get; set; } = string.Empty;
}