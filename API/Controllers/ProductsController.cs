using API.Data;
using API.Interfaces;
using API.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController(IProductRepository repository, ICsvExportService csvExportService) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<List<AppProduct>>> Get()
        {
            var products = await repository.GetAll();
            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<AppProduct>>> Get(int id)
        {
            var products = await repository.GetById(id);
            return Ok(products);
        }

        [HttpPost]
        public async Task<ActionResult<AppProduct>> Post([FromBody] AppProduct product)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var existing = (await repository.GetAll()).FirstOrDefault(p => p.Sku == product.Sku);
            if (existing is not null)
                return Conflict("A product with the same SKU already exists.");

            return StatusCode(201, await repository.Add(product));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<AppProduct>> Put(int id, [FromBody] AppProduct product)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var updated = await repository.Update(id, product);
                return Ok(updated);
            }
            catch (KeyNotFoundException)
            {
                return NotFound("Product not found.");
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(ex.Message);
            }
        }

        [HttpGet("export")]
        public async Task<IActionResult> ExportToCsv()
        {
            var products = await repository.GetAll();
            var csvData = csvExportService.ExportToCsv(products);
            
            return File(csvData, "text/csv", $"products_{DateTime.Now:yyyyMMddHHmmss}.csv");
        }
    }
}
