import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.scss']
})
export class UserdashboardComponent implements OnInit {
  userData: any;
  currentPassword!: string;
  newPassword!: string;
  showPasswordForm: boolean = false;
 
  constructor(private auth: AuthService,private http: HttpClient,private route:Router ) {
    
  }
 
  ngOnInit() {
    const userDataStr = localStorage.getItem('userData');
    if (userDataStr) {
      this.userData = JSON.parse(userDataStr);
      console.log(this.userData);
    }
  }

  togglePasswordForm() {
    this.showPasswordForm = !this.showPasswordForm;
  }
  changePassword() {
    const requestBody = {
      id: this.userData.id,
      currentPassword: this.currentPassword,
      newPassword: this.newPassword
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    this.http.post('https://localhost:44346/api/User/api/change-password', requestBody, httpOptions)
      .subscribe(
        (response) => {
          console.log('Password changed successfully');
         
        },
        (error) => {
          console.error('Password change failed:', error);
         
        }
      );
  }
  
  
  
}
