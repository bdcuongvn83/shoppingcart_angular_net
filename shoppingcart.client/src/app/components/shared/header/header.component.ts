import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthloginService } from '../../../services/authlogin.service';

@Component({
  selector: 'app-header',
  standalone: false, // Đảm bảo đây là standalone component

  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public isLoggedIn: boolean = false;
  public loginUser: any = {}; // Để lưu thông tin người dùng đã đăng nhập

  constructor(private authService: AuthloginService, private router: Router) {}

  logout() {
    this.authService.isLoggedInNow();

    this.authService.logout();

    this.authService.isLoggedInNow();
  }
  /*************  ✨ Windsurf Command ⭐  *************/
  /**
 * Lifecycle hook that is called after data-bound properties of a directive

/*******  3c218047-6ddd-48d4-a43e-7fcf17f51430  *******/
  ngOnInit() {
    this.authService.isLoggedInNow();
    // Subscribe vào isLoggedIn$ để nhận giá trị khi nó thay đổi
    this.authService.isLoggedIn$.subscribe((status: boolean) => {
      this.isLoggedIn = status; // Cập nhật trạng thái login
    });
    this.authService.userLogin$.subscribe((user: any) => {
      this.loginUser = user; // Cập nhật thông tin người dùng
    });

    this.authService.isLoggedInNow();
  }
}
