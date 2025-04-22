using System.ComponentModel.DataAnnotations;

namespace shoppingcart.Server.models
{

    public class Category
    {

        [Key]
        public int Id { get; set; }

        [Required]
        public string CategoryName { get; set; }

        public DateTime UpdateDateTime { get; set; }

    }
}
