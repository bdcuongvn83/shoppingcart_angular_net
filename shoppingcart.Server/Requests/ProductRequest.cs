using Microsoft.AspNetCore.Mvc;

namespace shoppingcart.Server.Requests
{
    public class ProductRequest
    {
        public int? Id { get; set; }
        public int? docId { get; set; }
        public string ProductName { get; set; }
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public int? CategoryId { get; set; }
        public IFormFile? file { get; set; } // For file upload
       
        //IFormFile? file


    }
}
