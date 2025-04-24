namespace shoppingcart.Server.Requests
{
    public class ProductSearchRequest
    {
       
        public string? ProductName { get; set; }
        
        public decimal? Price { get; set; }

        public int? pageIndex { get; set; }

        public string? sortName { get; set; }
    }
}
