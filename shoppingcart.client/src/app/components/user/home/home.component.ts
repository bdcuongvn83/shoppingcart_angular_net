import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product.service';

import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from '../../../common/confirm-delete-dialog/confirm-delete-dialog.component';
import { HttpResponse } from '@angular/common/http';
import { SearchProductRequest } from '../../../requests/search.product.request';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  productName: string | null = null; // Biến lưu trữ tên sản phẩm

  products: Product[] = [];
  isLoading: boolean = true;
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    // Gọi API để lấy danh sách sản phẩm từ server
    // Ví dụ: this.productService.getProducts().subscribe(products => this.products = products);
    // console.log(' ProductlistComponent View đã được khởi tạo');
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.isLoading = false;
      //  console.log(' call api getProducts done');
      // console.log(`data = ${data}`);
    });
  }

  onSearch() {
    let searchParam: SearchProductRequest = {
      ProductName: this.productName || '',
      pageIndex: 1,
      sortName: 'name_desc',
    };
    this.isLoading = true;
    this.productService.searchProduct(searchParam).subscribe((data) => {
      this.products = data;
      this.isLoading = false;
      //console.log(' call searchProduct  done');
      //console.log(`data = ${data}`);
    });
    //throw new Error('Method not implemented.');
  }
}
