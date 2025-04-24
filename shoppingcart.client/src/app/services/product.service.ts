import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { ResponseData } from '../reponses/response.data';
import { SearchProductRequest } from '../requests/search.product.request';

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

  searchProduct(param: SearchProductRequest): Observable<Product[]> {
    const httpParams = new HttpParams({
      fromObject: this.convertObjectToString(param),
    });

    // return this.http.get<Product>(`/api/product/${id}`); // Thay đổi đường dẫn API theo yêu cầu của bạn
    return this.http.get<Product[]>('/api/product/search', {
      params: httpParams,
    });
  }

  private convertObjectToString(obj: any): Record<string, string> {
    const result: Record<string, string> = {};
    for (const key in obj) {
      if (obj[key] !== undefined && obj[key] !== null) {
        result[key] = obj[key].toString();
      }
    }
    return result;
  }
}
