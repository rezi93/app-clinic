import { Component,OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { ActivatedRoute,Router } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {InputTextModule} from 'primeng/inputtext';
import {MenuItem} from 'primeng/api';
import {TabViewModule} from 'primeng/tabview';

@Component({
  selector: 'app-docboard',
  templateUrl:  './docboard.component.html',
  styleUrls: ['./docboard.component.scss']
})
export class DocboardComponent implements OnInit {
doctorData:any
currentPassword!: string;
newPassword!: string;
showPasswordForm: boolean = false;
value: number = 5;
  constructor(private auth: AuthService,private http: HttpClient,private route:Router){}

  ngOnInit(){
    const docDataStr = localStorage.getItem('doctorData');
    if (docDataStr) {
      this.doctorData = JSON.parse(docDataStr);
      console.log(this.doctorData);
    }

  }

  togglePasswordForm() {
    this.showPasswordForm = !this.showPasswordForm;
  }
  changePassword() {
    const requestBody = {
      id: this.doctorData.id,
      currentPassword: this.currentPassword,
      newPassword: this.newPassword
    };
  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  
    this.http.post('https://localhost:44346/api/change-password', requestBody, httpOptions)
      .subscribe(
        (response) => {
          console.log('Password changed successfully');
         
        },
        (error) => {
          console.error('Password change failed:', error);
         
        }
      );
  }
  
  logout(){
    localStorage.removeItem('doctorData');
    alert('log out')
    this.route.navigate([''])
  }
  
}

