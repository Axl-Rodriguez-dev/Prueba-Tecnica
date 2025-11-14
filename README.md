# Prueba Técnica Junior – PERMODA (Full-Stack .NET + React)

## Objetivo

Validar fundamentos web/REST, CRUD simple en .NET 8 + EF Core, consumo desde React, principios SOLID.

## Preguntas Teóricas

1. Diferencia entre GET y POST.

   Estas son petiones HTTP, el cual el metodo GET es para obtener datos mientras que el post, envia datos

2. Códigos HTTP para: create, not found, internal server error.

create: 201
not found: 401
internal server error: 500

Las peticiones http se reconocen asi

si empiezan con 1 son respuestas informativas
si empiezan con 2 son respuestas exitosas
si empiezan con 3 son mensajes de redirecciones
si empiezan con 4 son respuestas de error de cliente
si empiezan con 5 son respuestas de error de servidor

3. ¿Qué es CORS y cuándo aparece?

CORS es un sistema que autoriza el acceso de un sitio a los recursos de un dominio diferente, aparece cuando vamos a realizar una peticion desde el front al back

4. Diferencia entre el modelo CodeFirst y DatabaseFirst?

CodeFirst: Es crear el modelo de base de datos mediante codigo, haciendo uso de ORM como EntityFrameworkCore
DatabaseFirst: Es crear nuestro codigo mediante una base de datos existente

5. ¿Qué es una migración en EF Core y cuándo crearías una nueva?

Es una herramienta para crontrolar las versiones de la base de datos y crearia una cuando cambie algun modelo/entidad de la base de datos cambie o algun elemento structural de la base de datos

6. DTO vs Entidad: ¿por qué no exponer entidades?

DTO (Data Transfer Object): Estos son objetos que transportan informacion de forma segura

Entidad: Una entidad es la representacion de un objeto del mundo real en el dominio de la aplicacion y contienen la logica de negocio

Las entidades no deben ser expuestas ya que estas pueden contener informacion sencible inlcuyendo la logica del negocio ya que estas se asignan directamente a una tabla en nuestra base de datos, mientras los DTO's, son un objeto simple y plano que se utilizan para transferir informacion mediante diferentes capas de una aplicacion

7. ¿Qué es inyección de dependencias (DI) y por qué se usa en ASP.NET Core?

La inteccion de dependencias es un patron de diseño el cual su objetivo es reducir el acoplamiento entre clases y mejorando la modularidad y se utiliza en ASP.NET Core ya Reduce la dependencia directa entre clases. Esto significa que si necesitas cambiar la implementación de un servicio, solo necesitas cambiar dónde se registra y se configura esa dependencia, no cada clase que la usa

8. Diferencia entre Props y State en React (caso simple).

Prop: Es informacion que se le pasa a un componente mediante sus propiedades
State: Es un valor que se almacena de forma local en un componente el cual afecta directamente el renderizado del mismo

Prop: El producto se le envia mediante las propiedades

export default function ProductDetail({ product }) {
if (!product) return <p className='text-sm text-gray-500'>Selecciona un producto.</p>
return (

<div className='space-y-2 text-sm'>
<h2 className='text-lg font-semibold'>Producto #{product.id}</h2>
<div>
<span className='font-medium'>Nombre:</span> {product.nombre}
</div>
<div>
<span className='font-medium'>SKU:</span> {product.sku}
</div>
<div>
<span className='font-medium'>Precio:</span> {product.precio}
</div>
<div>
<span className='font-medium'>Stock:</span> {product.stock}
</div>
<div>
<span className='font-medium'>Categoría:</span> {product.categoria}
</div>
</div>
)
}

export default function ProductDetail() {

const [products, setProducts] = useState(product()) // esta almacenando el valor que le devuelve la funcion product que puede venir de un estado global

if (!product) return <p className='text-sm text-gray-500'>Selecciona un producto.</p>
return (

<div className='space-y-2 text-sm'>
<h2 className='text-lg font-semibold'>Producto #{product.id}</h2>
<div>
<span className='font-medium'>Nombre:</span> {product.nombre}
</div>
<div>
<span className='font-medium'>SKU:</span> {product.sku}
</div>
<div>
<span className='font-medium'>Precio:</span> {product.precio}
</div>
<div>
<span className='font-medium'>Stock:</span> {product.stock}
</div>
<div>
<span className='font-medium'>Categoría:</span> {product.categoria}
</div>
</div>
)
}

9. Nombre una buena práctica de commits.

Usa el verbo imperativo (Add, Change, Fix, Remove, etc)
Añadir una descripcion consisa en el cuerpo del commit
asegurarse de que los commits sean semánticos, legibles y sigan una convención que elijas.

10. ¿Qué son los principios SOLID? Da ejemplos de cada uno

Los principios SOLID son cinco principios de diseño orientado a objetos que ayudan a crear software más mantenible, escalable y flexible.

---

### **S - Single Responsibility Principle (Principio de Responsabilidad Única)**

Un método o clase debe tener una única razón para su modificación / deben cumplir con una única función.

**❌ Incorrecto:**

```csharp
public static void TocarGuitarra()
{
    Console.WriteLine("Afinar Guitarra");
    Console.WriteLine("Sonido de Guitarra");
}
```

**✅ Correcto:**

```csharp
public static void TocarGuitarra()
{
    Console.WriteLine("Sonido de Guitarra");
}
```

---

### **O - Open/Closed Principle (Principio Abierto/Cerrado)**

Un método o función está abierto para su expansión pero cerrado para su modificación.

**Ejemplo:**

```csharp
public interface IProductRepository
{
    Task<List<AppProduct>> GetAll();
}

public class ProductRepository(AppDbContext context) : IProductRepository
{
    public async Task<List<AppProduct>> GetAll()
    {
        return await context.Products.ToListAsync();
    }
}
```

---

### **L - Liskov Substitution Principle (Principio de Sustitución de Liskov)**

Si tenemos una herencia, las instancias de las clases hijas y las instancias de las clases padres deben poder ser intercambiables sin producir resultados inesperados.

**❌ Incorrecto:**

```csharp
public class Pajaro
{
    public virtual void Volar()
    {
        Console.WriteLine("Volando");
    }
}

public class Pinguino : Pajaro
{
    // Los pingüinos no pueden volar, pero hereda el método
    public override void Volar()
    {
        throw new Exception("Los pingüinos no vuelan");
    }
}

// Problema: rompe el principio porque no se puede sustituir
Pajaro ave = new Pinguino();
ave.Volar(); // Lanza excepción inesperada
```

**✅ Correcto:**

```csharp
public abstract class Animal
{
    public abstract void Moverse();
}

public class Pajaro : Animal
{
    public override void Moverse()
    {
        Console.WriteLine("Volando");
    }
}

public class Pinguino : Animal
{
    public override void Moverse()
    {
        Console.WriteLine("Nadando");
    }
}

// Ahora ambos son intercambiables sin problemas
Animal animal1 = new Pajaro();
Animal animal2 = new Pinguino();
animal1.Moverse(); // Volando
animal2.Moverse(); // Nadando
```

---

### **I - Interface Segregation Principle (Principio de Segregación de Interfaces)**

Los clientes/clases no pueden verse obligadas a usar interfaces que no utilizan.

**❌ Incorrecto:**

```csharp
public interface IAnimal
{
    void Volar();
    void Nadar();
    void Caminar();
}

public class Pajaro : IAnimal
{
    public void Volar() { Console.WriteLine("Volando"); }
    public void Nadar() { throw new NotImplementedException(); } // No usado
    public void Caminar() { Console.WriteLine("Caminando"); }
}

public class Pez : IAnimal
{
    public void Volar() { throw new NotImplementedException(); } // No usado
    public void Nadar() { Console.WriteLine("Nadando"); }
    public void Caminar() { throw new NotImplementedException(); } // No usado
}
```

**✅ Correcto:**

```csharp
public interface IVolador
{
    void Volar();
}

public interface INadador
{
    void Nadar();
}

public interface ICaminante
{
    void Caminar();
}

public class Pajaro : IVolador, ICaminante
{
    public void Volar() { Console.WriteLine("Volando"); }
    public void Caminar() { Console.WriteLine("Caminando"); }
}

public class Pez : INadador
{
    public void Nadar() { Console.WriteLine("Nadando"); }
}

// Cada clase implementa solo lo que necesita
```

---

### **D - Dependency Inversion Principle (Principio de Inversión de Dependencias)**

Las clases de alto nivel no pueden depender por las de bajo nivel, sino que ambas deben depender de abstracciones y los detalles deben depender de abstracciones y no al revés.

**Ejemplo:**

```csharp
public interface IProductRepository
{
    Task<List<AppProduct>> GetAll();
}

public class ProductRepository(AppDbContext context) : IProductRepository
{
    public async Task<List<AppProduct>> GetAll()
    {
        return await context.Products.ToListAsync();
    }
}

// El controlador depende de la abstracción, no de la implementación concreta
public class ProductsController(IProductRepository repository) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<AppProduct>>> Get()
    {
        return Ok(await repository.GetAll());
    }
}
```

---

11. Normalización básica: ¿cuándo evitarías la duplicación de datos?

Evitaria la duplicacion siempre, para evitar la redundancia, garantizar la integridad y consistencia de la información y optimizar el espacio de almacenamiento, exeptuando las excepciones

12. ¿Qué es una FK y por qué es importante?

    Cuando se habla de FK nos referimos las llaves foraneas de las bases de datos, las cuales permiten la relacion entre dos o mas tablas

# ¿Cual es el ciclo de vida de un servicio?

El ciclo de vida de un servicio (duracion en la aplicacion)

Trasient: Se instacia cada vez que se solicita
Scoped: Se crea una instancia por solicitud HTTP. La misma instancia se usa en toda la solicitud, pero distintas solicitudes obtienen diferentes instancias
Singleton: Se crea una única instancia del servicio una vez que la aplicación se inicia y se comparte en toda la aplicación.

## Práctica

Desarrolla un sistema de catalogo de productos, donde cada producto tenga un código sku único, y sobre cada producto se pueda realizar las operaciones CRUD(create, read, update, delete), adicionalmente esto debe ser entregado en un repositorio git con su respectivo archivo readme con instrucciones de uso.

### Modelo Producto

- **id**: int
- **nombre**: string\* (requerido)
- **sku**: string\* (único, requerido)
- **precio**: decimal >= 0
- **stock**: int >= 0
- **categoria**: string\* (requerido)

### Back-end – Endpoints (.NET)

- GET /api/products (lista)
- GET /api/products/{id}
- POST /api/products (valida campos y sku único)
- PUT /api/products/{id}
- Swagger habilitado
- Migración inicial
- Cargue de 5 productos

### Front-end (React)

- Página con DataGrid consumiendo GET /api/products
- Búsqueda por nombre/sku
- Formulario para crear producto (valida y refresca grilla; mensaje simple éxito/error)

### Bonus opcional (elige 1)

- Auth/JWT
- Node.js: script que convierte CSV→JSON normalizado
- Python: script que detecte skus potencialmente duplicados

---

## Cómo Iniciar el Proyecto

### Requisitos Previos

#### Para el Backend (.NET)

- [.NET 10 SDK](https://dotnet.microsoft.com/es-es/download) o superior
- Visual Studio 2022 / Visual Studio Code / Rider (opcional)

#### Para el Frontend (React)

- [Node.js](https://nodejs.org/) (versión 18 o superior)
- npm o yarn

---

## Configuración del Backend (.NET API)

### 1. Navegar a la carpeta del proyecto API

```powershell
cd API
```

### 2. Restaurar dependencias

```powershell
dotnet restore
```

### 3. Aplicar migraciones a la base de datos

El proyecto usa SQLite, por lo que no necesitas configurar cadena de conexión. La base de datos `products.db` se creará automáticamente:

```powershell
dotnet ef database update
```

Si no tienes la herramienta `dotnet ef` instalada, ejecuta:

```powershell
dotnet tool install --global dotnet-ef
```

### 4. Ejecutar la API

```powershell
dotnet run
```

La API estará disponible en:

- **HTTPS**: `https://localhost:5001`
- **Swagger**: `https://localhost:5001/swagger`

> **Nota**: La base de datos SQLite (`products.db`) se crea automáticamente en la carpeta `API` al ejecutar las migraciones.

---

## Configuración del Frontend (React + Vite + Tailwind)

El proyecto usa Vite con React y Tailwind CSS 4.

### 1. Navegar a la carpeta del proyecto

```powershell
cd front
```

### 2. Crear archivo de variables de entorno

```powershell
copy .env.example .env
```

O créalo manualmente con el siguiente contenido:

```env
VITE_API_URL=https://localhost:5001/api
```

### 3. Instalar dependencias

```powershell
npm install
```

### 4. Ejecutar el servidor de desarrollo

```powershell
npm run dev
```

La aplicación estará disponible en: `http://localhost:5173`

### Scripts

- `npm run dev`: inicia servidor de desarrollo Vite
- `npm run build`: build producción
- `npm run preview`: sirve build estático para verificación

### Estructura

```
front/
├── index.html
├── package.json
├── .env.example
├── tailwind.config.js
├── postcss.config.js
└── src/
  ├── App.jsx
  ├── main.jsx
  ├── index.css
  ├── services/api.js
  └── components/
    ├── ProductList.jsx
    ├── ProductForm.jsx
    └── ProductDetail.jsx
```

### Funcionalidad Cubierta

- Lista productos (`GET /api/products`)
- Ver detalle (`GET /api/products/{id}`)
- Crear producto (`POST /api/products`) con validaciones cliente
- Editar producto (`PUT /api/products/{id}`) seleccionando y luego "Editar"
- Búsqueda local por nombre / SKU
- Manejo básico de errores de API (muestra mensaje en el formulario)

---

## Estructura del Proyecto

```
Prueba-Tecnica/
├── API/                          # Backend .NET
│   ├── Controllers/              # Controladores API
│   ├── Data/                     # DbContext y Migraciones
│   ├── Models/                   # Modelos/Entidades
│   ├── Services/                 # Repositorios e Implementaciones
│   ├── Interfaces/               # Interfaces para DI
│   ├── products.db               # Base de datos SQLite
│   └── Program.cs                # Punto de entrada
│
└── front/                        # Frontend React + Vite + Tailwind
    ├── src/
    │   ├── components/           # Componentes React
    │   ├── pages/                # Páginas con React Router
    │   ├── services/             # Servicios API (Axios)
    │   └── App.jsx               # Componente principal
    ├── package.json
    └── .env                      # Variables de entorno
```

---

## Endpoints Disponibles

| Método | Endpoint           | Descripción                     |
| ------ | ------------------ | ------------------------------- |
| GET    | /api/products      | Obtiene todos los productos     |
| GET    | /api/products/{id} | Obtiene un producto por ID      |
| POST   | /api/products      | Crea un nuevo producto          |
| PUT    | /api/products/{id} | Actualiza un producto existente |
| DELETE | /api/products/{id} | Elimina un producto             |

---

## Troubleshooting

### Error de migraciones

Si tienes problemas con las migraciones, puedes recrear la base de datos:

```powershell
dotnet ef database drop
dotnet ef database update
```

### Puerto ocupado

Si los puertos están ocupados, puedes cambiarlos en:

- Backend: `Properties/launchSettings.json`
- Frontend: variable de entorno `PORT=3001 npm start`

---

## Tecnologías Utilizadas

### Backend

- .NET 10.0
- ASP.NET Core Web API
- Entity Framework Core
- SQLite
- Swagger/OpenAPI

### Frontend

- React
- Axios (para llamadas HTTP)
- Tailwindcss
- React-Router-Dom
- React-Hook-Form

---

## Autor Axl Rodriguez

Desarrollado como parte de la Prueba Técnica Junior para PERMODA.
