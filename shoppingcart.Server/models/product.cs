using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace shoppingcart.Server.models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        public string? ProductName { get; set; }
        public string? Description { get; set; }

        public decimal Price { get; set; }
        public int? DocId { get; set; }
        public int? CategoryId { get; set; }

        [NotMapped]
        public int? CategoryName { get; set; }
        public DateTime UpdateDateTime { get; set; }

    }
}
