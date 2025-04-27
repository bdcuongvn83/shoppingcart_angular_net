using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using shoppingcart.Server.models;
using shoppingcart.Server.Requests;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace shoppingcart.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AdminProductController : ControllerBase

    {
        private readonly ILogger<AdminProductController> _logger;

        private readonly AppDbContext _context;
        private readonly FileManagerService _fileManagerService;
        public AdminProductController(AppDbContext context, FileManagerService fileManagerService, ILogger<AdminProductController> logger)
        {
            _context = context;
            _fileManagerService = fileManagerService;
            _logger = logger;
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
        public async Task<IActionResult> CreateProduct(
        [FromForm] ProductRequest productReq)
        {
            try
            {
                int? docId = null;
                var file = productReq.file;
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
            catch (Exception ex)
            {
                // Ghi log ra console
                Console.WriteLine("Error during saving: " + ex.Message);

                // Hoặc log ra file bằng ILogger (nên dùng)
                _logger.LogError(ex, "An error occurred while saving data.");

                return BadRequest(new { message = ex.Message });
            }


        }

        // PUT api/<ValuesController>/5
        [HttpPut("{id}")]

        public async Task<IActionResult> Put(int id, [FromForm] ProductRequest productReq)
        {
            try
            {

                using var transaction = await _context.Database.BeginTransactionAsync();


                var product = await _context.Products.FindAsync(id);
                if (product != null)
                {
                    product.CategoryId = productReq.CategoryId;
                    product.Description = productReq.Description;
                    product.Price = productReq.Price;
                    product.ProductName = productReq.ProductName;
                    //product.DocId = docId;//not update docId
                    _context.Products.Update(product);
                }


                await _context.SaveChangesAsync();
                await transaction.CommitAsync();
                return Ok(new { message = "Updated successful" });
            }
            catch (Exception ex)
            {
                // Ghi log ra console
                Console.WriteLine("Error during saving: " + ex.Message);


                // Hoặc log ra file bằng ILogger (nên dùng)
                _logger.LogError(ex, "An error occurred while saving data.");

                //return StatusCode(500, "Internal server error: " + ex.Message);
                return BadRequest(new { message = ex.Message });
            }

        }


        // DELETE api/<ValuesController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)

        {
            try
            {
                using var transaction = await _context.Database.BeginTransactionAsync();
                var product = await _context.Products.FindAsync(id);
                if (product == null)
                {
                    return NotFound();
                }

                if (product != null)
                {
                    _context.Products.Remove(product);
                    await _context.SaveChangesAsync();
                    FileEntity file = null;
                    if (product.DocId > 0)
                    {
                        file = await _context.FileEntity.FindAsync(product.DocId);
                        if (file != null)
                        {
                            _context.FileEntity.Remove(file);
                        }
                        await _context.SaveChangesAsync();
                    }

                    await transaction.CommitAsync();
                }
                return Ok(new { message = "Updated successful" });
            }
            catch (Exception ex)
            {
                // Ghi log ra console
                Console.WriteLine("Error during saving: " + ex.Message);

                _logger.LogError(ex, "An error occurred while saving data.");

                //return StatusCode(500, "Internal server error: " + ex.Message);
                return BadRequest(new { message = ex.Message });
            }


        }
    }
}
