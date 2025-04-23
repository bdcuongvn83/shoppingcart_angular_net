import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product.model';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from '../../../common/confirm-delete-dialog/confirm-delete-dialog.component';
import { HttpResponse } from '@angular/common/http';
import { ProductAdminService } from '../../../services/admin/product-admin.service';

@Component({
  selector: 'app-productlist',
  standalone: false,
  templateUrl: './productlist.component.html',
  styleUrl: './productlist.component.scss',
})
export class ProductlistComponent implements OnInit {
  constructor(
    private router: Router,
    private productService: ProductAdminService,
    private dialog: MatDialog
  ) {} // Inject Router

  products: Product[] = [];

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
  handleDelete(productId: number, productName: string) {
    console.log('handleDelete clicked with product:', productId);
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '300px',
      data: { name: productName },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // nếu người dùng xác nhận xóa
        this.productService.deleteProduct(productId).subscribe({
          next: (res: HttpResponse<any>) => {
            console.log('delete product:', res);
            console.log('delete product res.status:', res.status);
            if (res.status === 200) {
              console.log('delete  successfully:', res);
              this.products = this.products.filter((p) => p.id !== productId);
              //this.router.navigate(['/productlist']);//TODO
            }
          },
          error: (err) => {
            console.error('Error during registration:', err);
          },
        });
      }
    });
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
