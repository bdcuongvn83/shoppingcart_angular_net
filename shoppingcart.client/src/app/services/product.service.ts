import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { ResponseData } from '../reponses/response.data';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  //private apiUrl = 'https://your-dotnet-api.com/api/products';](https://your-dotnet-api.com/api/products';)

  constructor(private http: HttpClient) {}
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/api/product'); // Thay đổi đường dẫn API theo yêu cầu của bạn
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`/api/product/${id}`); // Thay đổi đường dẫn API theo yêu cầu của bạn
  }
}
