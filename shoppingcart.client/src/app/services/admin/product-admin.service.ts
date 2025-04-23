import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductAdminService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/api/adminProduct'); // Thay đổi đường dẫn API theo yêu cầu của bạn
  }

  registerProduct(formData: FormData): Observable<HttpResponse<any>> {
    return this.http.post('/api/adminProduct', formData, {
      observe: 'response',
    }); // Thay đổi đường dẫn API theo yêu cầu của bạn
  }

  updateProduct(id: number, formData: FormData): Observable<HttpResponse<any>> {
    return this.http.put(`/api/adminProduct/${id}`, formData, {
      observe: 'response',
    }); // Thay đổi đường dẫn API theo yêu cầu của bạn
  }

  deleteProduct(id: number): Observable<HttpResponse<any>> {
    return this.http.delete(`/api/adminProduct/${id}`, {
      observe: 'response',
    }); // Thay đổi đường dẫn API theo yêu cầu của bạn
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`/api/adminProduct/${id}`); // Thay đổi đường dẫn API theo yêu cầu của bạn
  }
}
