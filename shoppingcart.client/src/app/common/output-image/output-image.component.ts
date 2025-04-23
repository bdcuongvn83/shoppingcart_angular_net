import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-output-image',
  standalone: false,
  templateUrl: './output-image.component.html',

  styleUrl: './output-image.component.css',
})
export class OutputImageComponent {
  @Input() docId!: number; // dấu ! nói với TypeScript là chắc chắn sẽ có

  @Input() class?: string | undefined;
  @Input() style?: string | undefined;
  @Input() altText?: string;

  fileUrl: string | undefined;

  constructor(private http: HttpClient) {}
  ngonDestroy() {
    if (this.fileUrl) {
      URL.revokeObjectURL(this.fileUrl);
    }
    console.log('OutputImageComponent destroyed');
  }
  downloadFileImage(docId: number) {
    console.log('downloadFileImage called with docId:', docId);
    this.http
      .get(`/api/file/${docId}`, { responseType: 'blob' })
      .subscribe((data) => {
      const blob = new Blob([data]); // Thay đổi loại MIME nếu cần
       // const blob = new Blob([data], { type: 'image/jpeg' }); // hoặc 'image/png'
        this.fileUrl = URL.createObjectURL(blob);
        console.log(this.fileUrl);
      });
  }

  ngOnInit() {
    console.log('OutputImageComponent initialized');
    this.downloadFileImage(this.docId);
  }
}
