import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/user/home/home.component';
import { ProductComponent } from './components/admin/product/product.component';
import { ProductlistComponent } from './components/admin/productlist/productlist.component';

// const routes: Routes = [];
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirect to home
  { path: 'home', component: HomeComponent }, // Route for HomeComponent
  { path: 'productlist', component: ProductlistComponent }, // Route for AdminComponent
  { path: 'add-product', component: ProductComponent }, // Route for AdminComponent
  { path: 'edit-product/:id', component: ProductComponent }, // Route for AdminComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
