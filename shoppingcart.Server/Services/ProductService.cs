using System;
using System.Drawing;
using System.Drawing.Printing;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using shoppingcart.Server.models;
using shoppingcart.Server.utils;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace shoppingcart.Server.Controllers
{

    public class ProductService

    {
        private readonly AppDbContext _context;

        public ProductService(AppDbContext context)
        {
            _context = context;
        }
       
        public async Task<List<Product>> search(string sortOrder, string productName, int pageIndex)
        {
            var query = _context.Products.AsQueryable();

            //query = query.Include(e => e.Course)
            //    .Include(e => e.Student);

            if (!StringUtils.nullOrBlank(productName))
            {
                query = query.Where(e => e.ProductName.Contains(productName));
            }
            if (StringUtils.nullOrBlank(sortOrder))
            {
                query = query.OrderByDescending(s => s.Id);

            }
            else
            {
                switch (sortOrder)
                {
                    case "name_desc":
                        query = query.OrderByDescending(s => s.ProductName);
                        break;
                    case "name_asc":
                        query = query.OrderBy(s => s.ProductName);
                        break;
                    case "price_desc":
                        query = query.OrderByDescending(s => s.Price);
                        break;
                    default:
                        query = query.OrderByDescending(s => s.Id);
                        break;
                }

            }

            //ProductLst = await query.ToListAsync();
            int PageIndex = pageIndex != null ? pageIndex : 1;
            int PageSize = 100;

            var ProductLst = await PaginatedList<Product>.CreateAsync(
                query.AsNoTracking(), PageIndex, PageSize);

          
            return ProductLst;
        }


    }
}
