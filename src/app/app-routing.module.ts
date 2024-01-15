import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { BookingComponent } from './booking/booking.component';
import { RegisterComponent } from './register/register.component';
import { AuthComponent } from './auth/auth.component';

import { CategoryComponent } from './category/category.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { DocboardComponent } from './docboard/docboard.component';
import { DocCategoryComponent } from './doc-category/doc-category.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { UserListComponent } from './user-list/user-list.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  {
    path:"",
    component:MainComponent
  },
  {
    
    path:'doctor/:id',
    component:BookingComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {path:'login',
  component:AuthComponent
},
{
  path:"category",
  component:CategoryComponent
},
{
  path:"Confirmemail",
  component:ConfirmEmailComponent
},
{
  path:"userboard",
  component:UserdashboardComponent
},
{
  path:"adminboard",
  component:AdmindashboardComponent
},
{
  path:"docboard",
  component:DocboardComponent
},
{
  path:"doccategory",
  component:DocCategoryComponent
},
{
  path:"forgotpassword",
  component:ForgotpasswordComponent
},
{
  path:"userlist",
  component:UserListComponent
},
{
  path:"contact",
  component:ContactComponent
}



 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
