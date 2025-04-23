import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private http: HttpClient) {}
  /**
   * thong tin file tra ve gom bynary data cua file
   * @param id
   * @returns
   */
  //TODO bi loi khong lay duoc thong tin
  // getFile(id: number): Observable<File> {
  //   return this.http.get<File>(`/api/file/${id}`); // Thay đổi đường dẫn API theo yêu cầu của bạn
  // }
  getFile(docId: number): Observable<Blob> {
    return this.http.get(`api/file/${docId}`, { responseType: 'blob' });
  }
  /**
   * thong tin file tra ve chi co name va id
   * @param id
   * @returns
   */
  getFileBasic(id: number): Observable<any> {
    return this.http.get<any>(`/api/file/basic/${id}`); // Thay đổi đường dẫn API theo yêu cầu của bạn
  }
}
