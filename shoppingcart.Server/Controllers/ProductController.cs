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
        public ProductController(AppDbContext context, FileManagerService fileManagerService)
        {
            _context = context;
            _fileManagerService = fileManagerService;
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

        // public void Post([FromBody] string value)
        // POST api/<ValuesController>
        [HttpPost]
        [Consumes("multipart/form-data")]
        [ApiExplorerSettings(IgnoreApi = true)]
        public async Task<IActionResult> CreateProduct(
        [FromForm] ProductRequest productReq,
        [FromForm] IFormFile? file)
        {
            int? docId = null;

            if (file != null)
            {
                var fileEntity = await _fileManagerService.SaveFileAsync(file);
                docId = fileEntity.Id;
            }
            var product = new Product
            {
                CategoryId = productReq.CategoryId,
                Description = productReq.Description,
                Price = productReq.Price,
                ProductName = productReq.ProductName,
                DocId = docId
            };

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return Created("", new { message = "Insert successful", id = product.Id });

        }

        // PUT api/<ValuesController>/5
        [HttpPut("{id}")]
        [ApiExplorerSettings(IgnoreApi = true)]
        public async Task<IActionResult> Put(int id, [FromForm] ProductRequest productReq,
        [FromForm] IFormFile? file)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            //1.insert newdoc
            int? docId = null;
            if (file != null)
            {
                var fileEntity = await _fileManagerService.SaveFileAsync(file);
                docId = fileEntity.Id;
            }

            //2.update product with new docId   

            var product = await _context.Products.FindAsync(id);
            if (product != null)
            {
                product.CategoryId = productReq.CategoryId;
                product.Description = productReq.Description;
                product.Price = productReq.Price;
                product.ProductName = productReq.ProductName;
                product.DocId = docId;
                _context.Products.Update(product);
            }

            //3.remove doc, product
            if (productReq.docId > 0)
            {
                await _fileManagerService.deleteFile((int)productReq.docId);
            }

            await _context.SaveChangesAsync();
            await transaction.CommitAsync();
            return Ok(new { message = "Updated successful" });

        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
