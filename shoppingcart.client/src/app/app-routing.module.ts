import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/user/home/home.component';
import { ProductComponent } from './components/admin/product/product.component';
import { ProductlistComponent } from './components/admin/productlist/productlist.component';
import { LoginComponent } from './components/user/login/login.component';
import { AuthGuard } from './auth.guard';

// const routes: Routes = [];
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirect to home
  { path: 'home', component: HomeComponent }, // Route for HomeComponent
  {
    path: 'productlist',
    component: ProductlistComponent,
    canActivate: [AuthGuard],
  }, // Route for AdminComponent
  {
    path: 'add-product',
    component: ProductComponent,
    canActivate: [AuthGuard],
  }, // Route for AdminComponent
  {
    path: 'edit-product/:id',
    component: ProductComponent,
    canActivate: [AuthGuard],
  }, // Route for AdminComponent
  { path: 'login', component: LoginComponent }, // Route for AdminComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
