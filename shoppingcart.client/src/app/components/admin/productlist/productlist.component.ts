import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product.model';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-productlist',
  standalone: false,
  templateUrl: './productlist.component.html',
  styleUrl: './productlist.component.scss',
})
export class ProductlistComponent implements OnInit {
  constructor(private router: Router, private productService: ProductService) {} // Inject Router

  products: Product[] = [];
  /*************  ✨ Windsurf Command ⭐  *************/
  /**
   * Khởi tạo ProductlistComponent View
   * Gọi API để lấy danh sách sản phẩm từ server
   *
   * @returns void
   */
  /*******  94d2f625-5724-4c55-9adf-4f908128f3a0  *******/
  ngOnInit(): void {
    // Gọi API để lấy danh sách sản phẩm từ server
    // Ví dụ: this.productService.getProducts().subscribe(products => this.products = products);
    console.log(' ProductlistComponent View đã được khởi tạo');
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      console.log(' call api getProducts');
      console.log(`data = ${data}`);
    });

    // this.productService.getImage(1).subscribe((data) => {
    //   console.log(data);
    //throw new Error('Method not implemented.');
  }

  handleAdd() {
    console.log('Add product clicked');
    //throw new Error('Method not implemented.');
    this.router.navigate(['/add-product']); // Điều hướng đến route '/add-product'
  }
  handleDelete(productId: number) {
    console.log(productId);
    //throw new Error('Method not implemented.');
  }
  handleEdit(product: Product) {
    console.log(product);

    this.router.navigate(['/edit-product', product.id]); // Điều hướng đến route '/edit-product' với id sản phẩm
    //throw new Error('Method not implemented.');
  }

  // products: Product[] = [
  //   {
  //     id: 1,
  //     name: 'Product 1',
  //     category: 'Category 1',
  //     price: 100,
  //     image: '/favicon.ico',
  //   },
  //   {
  //     id: 2,
  //     name: 'Product 2',
  //     category: 'Category 2',
  //     price: 200,
  //     image: '/favicon.ico',
  //   },
  // ];
}
