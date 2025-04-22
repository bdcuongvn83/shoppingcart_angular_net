using System.ComponentModel.DataAnnotations;

namespace shoppingcart.Server.models
{

    public class FileEntity
    {

        [Key]
        public int Id { get; set; }

        [Required]
        public string OriginalName { get; set; }

        public byte[] Buffer { get; set; }

        public DateTime UpdateDateTime { get; set; }

    }
}
