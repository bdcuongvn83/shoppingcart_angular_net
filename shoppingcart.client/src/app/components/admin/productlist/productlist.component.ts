import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product.model';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from '../../../common/confirm-delete-dialog/confirm-delete-dialog.component';
import { HttpResponse } from '@angular/common/http';
import { ProductAdminService } from '../../../services/admin/product-admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {} // Inject Router

  products: Product[] = [];

  ngOnInit(): void {
    // Gọi API để lấy danh sách sản phẩm từ server

    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  handleAdd() {
    this.router.navigate(['/add-product']); // Điều hướng đến route '/add-product'
  }
  handleDelete(productId: number, productName: string) {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '300px',
      data: { name: productName },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // nếu người dùng xác nhận xóa
        this.productService.deleteProduct(productId).subscribe({
          next: (res: HttpResponse<any>) => {
            if (res.status === 200) {
              this.products = this.products.filter((p) => p.id !== productId);

              this.snackbar.open('delete successfully!', 'OK', {
                duration: 2000,
                verticalPosition: 'top',
                horizontalPosition: 'center',
                panelClass: ['snackbar-success'],
              });
            }
          },
          error: (err) => {
            console.error('Error during registration:', err);
          },
        });
      }
    });
  }
  handleEdit(product: Product) {
    this.router.navigate(['/edit-product', product.id]); // Điều hướng đến route '/edit-product' với id sản phẩm
  }
}
