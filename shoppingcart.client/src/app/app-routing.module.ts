import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/user/home/home.component';
import { ProductComponent } from './components/admin/product/product.component';
import { ProductlistComponent } from './components/admin/productlist/productlist.component';
import { LoginComponent } from './components/user/login/login.component';
import { AuthGuard } from './auth.guard';
import { AboutComponent } from './components/about/about.component';
import { SettingComponent } from './components/admin/setting/setting.component';
import { LoginRegisterComponent } from './components/user/loginregister/loginregister.component';

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
  { path: 'about', component: AboutComponent }, // Route for HomeComponent
  { path: 'setting', component: SettingComponent, canActivate: [AuthGuard] }, // Route for SettingComponent

  { path: 'register', component: LoginRegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
