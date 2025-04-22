using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using shoppingcart.Server.models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace shoppingcart.Server.Controllers
{

    public class FileManagerService

    {
        private readonly AppDbContext _context;

        public FileManagerService(AppDbContext context)
        {
            _context = context;
        }
        public async Task deleteFile(int docId)
        {
           
            FileEntity file = await _context.FileEntity.FindAsync(docId);

            if (file != null)
            {
                _context.FileEntity.Remove(file);
               // await _context.SaveChangesAsync();
            }

        }

        public async Task<FileEntity> SaveFileAsync(IFormFile file)
        {
            //using var ms = new MemoryStream();
            //await file.CopyToAsync(ms);
            byte[] buffer;
            using (var ms = new MemoryStream())
            {
                await file.CopyToAsync(ms);
                buffer = ms.ToArray();
            }
            var fileEntity = new FileEntity
            {
                OriginalName = file.FileName,
                Buffer = buffer,
                UpdateDateTime = DateTime.UtcNow
            };

            _context.FileEntity.Add(fileEntity);
            await _context.SaveChangesAsync();

            return fileEntity;
            //return await _context.Products.ToListAsync();
            //  return new string[] { "value1", "value2" };
        }
    }
}
