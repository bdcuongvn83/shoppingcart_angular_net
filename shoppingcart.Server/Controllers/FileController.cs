using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.EntityFrameworkCore;
using shoppingcart.Server.models;
using shoppingcart.Server.Requests;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace shoppingcart.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase

    {
        private readonly AppDbContext _context;
        private readonly FileManagerService _fileManagerService;
        public FileController(AppDbContext context, FileManagerService fileManagerService)
        {
            _context = context;
            _fileManagerService = fileManagerService;
        }

        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetFile(int id)
        {
            var file = await _context.FileEntity.FindAsync(id);

            if (file == null)
            {
                return NotFound();
            }
            var contentType = GetContentType(file.OriginalName); // từ tên file suy ra loại ảnh

            return File(file.Buffer, contentType);
        }

        [HttpGet("basic/{id}")]
        public async Task<IActionResult> GetFileBasic(int id)
        {
            var file = await _context.FileEntity.FindAsync(id);

            if (file == null)
            {
                return NotFound();
            }

            return Ok(new { fileName = file.OriginalName, id = file.Id });

        }

        private string GetContentType(string fileName)
        {
            var pro = new FileExtensionContentTypeProvider();
            // string contentType = "";
            if (!pro.TryGetContentType(fileName, out string contentType))
            {
                contentType = "application/octet-stream"; // fallback nếu không xác định được
            }

            return contentType;
        }
    }
}
