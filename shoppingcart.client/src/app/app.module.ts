import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { OutputImageComponent } from './common/output-image/output-image.component';
import { ProductlistComponent } from './components/admin/productlist/productlist.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './components/admin/product/product.component';

@NgModule({
  declarations: [
    AppComponent,
    OutputImageComponent,
    ProductlistComponent,
    ProductComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    HeaderComponent,
    FooterComponent,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
