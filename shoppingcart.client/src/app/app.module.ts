import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { OutputImageComponent } from './common/output-image/output-image.component';
import { ProductlistComponent } from './components/admin/productlist/productlist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './components/admin/product/product.component';
import { ConfirmDeleteDialogComponent } from './common/confirm-delete-dialog/confirm-delete-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyPipe } from '@angular/common';
import { HomeComponent } from './components/user/home/home.component';
import { LoginComponent } from './components/user/login/login.component';
import { AuthInterceptor } from './auth.interceptor';
import { AboutComponent } from './components/about/about.component';
import { SettingComponent } from './components/admin/setting/setting.component';

@NgModule({
  declarations: [
    AppComponent,
    OutputImageComponent,
    ProductlistComponent,
    ProductComponent,
    ConfirmDeleteDialogComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    AboutComponent,
    SettingComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FooterComponent,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
  ],
  providers: [
    CurrencyPipe,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
