import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AuthComponent } from './auth/auth.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';

import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { MenubarModule } from 'primeng/menubar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RatingModule } from 'primeng/rating';
import { MatDialogModule } from '@angular/material/dialog';
import { BookingComponent } from './booking/booking.component';
import { CalendarModule, DateAdapter,MOMENT } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import { SchedulerModule } from 'angular-calendar-scheduler';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { NgProgressModule } from 'ngx-progressbar';
import { registerLocaleData } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';

import { CategoryComponent } from './category/category.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import * as moment from 'moment';
import { CalendarComponent } from './calendar/calendar.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { DoctorCategoryComponent } from './doctor-category/doctor-category.component';
import { DocboardComponent } from './docboard/docboard.component';
import { DocCategoryComponent } from './doc-category/doc-category.component';
import { SharedServiceService } from './service/shared-service.service';

import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { UserListComponent } from './user-list/user-list.component';
import { ContactComponent } from './contact/contact.component';






export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AuthComponent,
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
   
    
    RegisterComponent,
    BookingComponent,
    CategoryComponent,
    ConfirmEmailComponent,
    CalendarComponent,
    UserdashboardComponent,
    AdmindashboardComponent,
    DoctorCategoryComponent,
    DocboardComponent,
    DocCategoryComponent,
    
    ForgotpasswordComponent,
         UserListComponent,
         ContactComponent,
  
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    InputTextModule,
    CardModule,
    TabViewModule,
    MenubarModule,
    FullCalendarModule,
  
 
    BrowserAnimationsModule,
    RatingModule,
    MatDialogModule,
    NgProgressModule,
    BsDatepickerModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: ['localhost:4200'],
        disallowedRoutes: ['https://localhost:44346/api/User/login/']
      }
    }),
   
  ],
  providers: [
    { provide: 'moment', useFactory: () => moment },
    [SharedServiceService ]
  ],
  
 
  
  bootstrap: [AppComponent]
})
export class AppModule { }
