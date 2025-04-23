import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';
import { HttpResponse } from '@angular/common/http';
import { FileService } from '../../../services/file.service';
import { BaseComponent } from '../../../common/base.component';

@Component({
  standalone: false, // Đảm bảo đây là standalone component
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent extends BaseComponent {
  selectedFile: File | null = null; // Biến lưu trữ file được chọn
  errorMessage: string | null = null; // Biến lưu thông báo lỗi
  formErrors: string[] = [];
  productId: number = 0; // Biến lưu trữ ID sản phẩm (nếu cần thiết)
  fileUrl: string | undefined; // Biến lưu trữ URL của file đã tải lên
  myForm = new FormGroup({
    productName: new FormControl('', Validators.required),
    productPrice: new FormControl(0, {
      validators: [Validators.required, Validators.max(99999)],
      // validators: [Validators.required],
      updateOn: 'blur', // Chỉ kiểm tra validator khi người dùng rời khỏi trường
    }),
    categoryId: new FormControl(0, Validators.required),
    categoryName: new FormControl(''),
    description: new FormControl(''),
    docId: new FormControl(0),
    file: new FormControl(null), // Thêm trường file vào form
  });
  editMode: boolean = false;
  fileName: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private fileService: FileService
  ) {
    super();
  }

  ngOnInit() {
    console.log('ProductComponent initialized');
    this.productId = Number(this.route.snapshot.paramMap.get('id'));

    // Gọi API để lấy danh sách danh mục từ server
    if (this.productId) {
      this.productService.getProductById(this.productId).subscribe((data) => {
        console.log('call api getCategories');
        console.log(`data = ${data}`);
        this.editMode = true;
        this.editMyForm(data);
        this.downloadFileImage(data.docId);
      });
    }
  }

  downloadFileImage(docId: number) {
    console.log('downloadFileImage called with docId:', docId);
    this.fileService.getFile(docId).subscribe((data) => {
      //console.log('downloadFileImage data:', data);

      //  const blob = new Blob([data]); // Thay đổi loại MIME nếu cần
      const blob = new Blob([data], { type: 'image/jpeg' }); // hoặc 'image/png'
      this.fileUrl = URL.createObjectURL(blob);
      console.log(`fileUrl:${this.fileUrl}`);
    });

    this.fileService.getFileBasic(docId).subscribe((data) => {
      console.log('downloadFileImage data:', data);
      this.fileName = data.fileName;
    });
  }

  onCancel() {
    console.log('Cancel button clicked');
    this.myForm.reset(); // Đặt lại form về trạng thái ban đầu
    this.selectedFile = null; // Đặt lại file đã chọn
    this.errorMessage = null; // Đặt lại thông báo lỗi
    // Xử lý khi người dùng nhấn nút hủy
    this.router.navigate(['/productlist']); // Điều hướng đến route '/productlist'
  }
  handleChange() {
    throw new Error('Method not implemented.');
  }

  // Gọi API để lấy danh sách sản phẩm từ server

  handleSubmitForm() {
    console.log('handleSubmitForm called');
    console.log(this.myForm.value);
    if (this.myForm.valid) {
      console.log('Form submitted:', this.myForm.value);
      this.formErrors = []; // Clear errors if any
    } else {
      this.formErrors = this.collectFormErrors(this.myForm);
      console.log('Form errors:', this.formErrors);
      this.myForm.markAllAsTouched(); // Để highlight các ô lỗi
      return;
    }

    console.log(' handleSubmitForm  submit');
    const formDataToSend = this.prepareFormData();
    if (this.productId > 0) {
      console.log(' update');
      //update
      this.productService
        .updateProduct(this.productId, formDataToSend)
        .subscribe({
          next: (res: HttpResponse<any>) => {
            console.log('Update product:', res);
            console.log('Update product res.status:', res.status);
            if (res.status === 200) {
              console.log('Update  successfully:', res);
              this.router.navigate(['/productlist']);
            }
          },
          error: (err) => {
            console.error('Error during registration:', err);
          },
        });
    } else {
      this.productService.registerProduct(formDataToSend).subscribe({
        next: (res: HttpResponse<any>) => {
          console.log('registerProduct product res.status:', res.status);
          if (res.status === 201) {
            console.log('Product registered successfully:', res);
            this.router.navigate(['/productlist']);
          }
        },
        error: (err) => {
          console.error('Error during registration:', err);
        },
      });
    }

    //throw new Error('Method not implemented.');
  }
  prepareFormData(): FormData {
    const formDataToSend = new FormData();
    formDataToSend.append(
      'productName',
      this.myForm.get('productName')?.value || ''
    );
    formDataToSend.append(
      'description',
      this.myForm.get('description')?.value || ''
    );

    formDataToSend.append(
      'categoryId',
      this.myForm.get('categoryId')?.value?.toString() || '0'
    );
    formDataToSend.append(
      'price',
      this.myForm.get('productPrice')?.value?.toString() || '0'
    );
    formDataToSend.append(
      'docId',
      this.myForm.get('docId')?.value?.toString() || ''
    );
    if (this.selectedFile) {
      formDataToSend.append('file', this.selectedFile);
    }

    return formDataToSend;
  }

  // Method to get error messages
  // getErrorMessage(controlName: string): string | null {
  //   console.log('getErrorMessage:' + controlName);
  //   const control = this.productForm.get(controlName);
  //   console.log(control);
  //   if (control?.hasError('required')) {
  //     return `${controlName} is required.`;
  //   }
  //   if (control?.hasError('max')) {
  //     return `${controlName}  must be greater than 0.`;
  //   }
  //   return null;
  // }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // Kiểm tra loại file
      if (!file.type.startsWith('image/')) {
        this.errorMessage = 'Only image files are allowed.';
        this.selectedFile = null; // Xóa file nếu không hợp lệ
        return;
      }

      // Nếu hợp lệ, lưu file
      this.selectedFile = file;
      this.errorMessage = null;
      console.log('Selected file:', this.selectedFile);
    }
  }
  editMyForm(data: Product) {
    // Gán giá trị cho các trường trong form từ dữ liệu sản phẩm
    this.myForm.get('productName')?.setValue(data.productName);
    this.myForm.get('productPrice')?.setValue(data.price);
    this.myForm.get('categoryId')?.setValue(data.categoryId);
    this.myForm.get('description')?.setValue(data.description);
    this.myForm.get('categoryName')?.setValue(data.categoryName);
    this.myForm.get('docId')?.setValue(data.docId);

    console.log('editMyForm called with data:', data);
    // Gán giá trị cho các trường trong form từ dữ liệu sản phẩm
    // throw new Error('Function not implemented.');
  }

  ngOnDestroy() {
    console.log('ProductComponent destroyed');
    if (this.fileUrl) {
      URL.revokeObjectURL(this.fileUrl);
    }
  }
}
