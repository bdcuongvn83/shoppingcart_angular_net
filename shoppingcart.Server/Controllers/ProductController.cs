using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using shoppingcart.Server.models;
using shoppingcart.Server.Requests;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace shoppingcart.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase

    {


        private readonly AppDbContext _context;
        private readonly FileManagerService _fileManagerService;
        private readonly ProductService _productService;
        public ProductController(AppDbContext context, FileManagerService fileManagerService, ProductService productService)
        {
            _context = context;
            _fileManagerService = fileManagerService;
            _productService = productService;
        }

        // GET: api/<ValuesController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            return await _context.Products.ToListAsync();
            //  return new string[] { "value1", "value2" };
        }

        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<Product>>> SearchProducts([FromQuery] Requests.ProductSearchRequest request)
        {
            return await _productService.search(request.sortName??null, request.ProductName, request.pageIndex??1);
            //  return new string[] { "value1", "value2" };
        }

    }
}
