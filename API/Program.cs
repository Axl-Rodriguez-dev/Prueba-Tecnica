using API.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("Connect"))
);
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddControllers();

var app = builder.Build();

app.MapControllers();

app.Run();
