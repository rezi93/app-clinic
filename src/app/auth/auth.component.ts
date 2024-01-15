import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Ilogin } from '../interface/iface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, tap, concatMap, Subject, BehaviorSubject, of } from 'rxjs';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  getUserProfileData(email: string, password: string) {
    throw new Error('Method not implemented.');
  }
  loginform!: FormGroup;
  loguser: Ilogin[] = [];
  isuservalid: boolean = false;

  constructor(
    private _router: Router,
    private serv: AuthService,
    private _fb: FormBuilder,
    private dialog: MatDialog,
    private http: HttpClient,
    private dialogRef: MatDialogRef<AuthComponent>
  ) {}

  ngOnInit(): void {
    this.loginform = this._fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  close(): void {
    const dialogRef = this.dialog.closeAll();
  }

  
  onSubmit() {
    if (this.loginform.valid) {
      console.log(this.loginform.value);
      this.serv.login(this.loginform.value).subscribe({
        next: (res) => {
          alert(res.message);
          const { Email, Password } = this.loginform.value;
          if (res) {
            this.serv.getUserProfileData(this.loginform.value).subscribe({
              next: (userData) => {
                console.log(userData);
                localStorage.setItem('userData', JSON.stringify(userData));
                if (userData.category === 'user') {
                  this._router.navigate(['userboard'], { state: { userData } });
                  this.dialogRef.close();
                } else if (userData.category === 'admin') {
                  this._router.navigate(['adminboard']);
                  this.dialogRef.close();
                } 
              }
            }); 
          }
        }
      });
  
      this.serv.doclogin(this.loginform.value).subscribe({
        next: (docData) => {
          console.log(docData);
          const { Email, Password } = this.loginform.value;
          if (docData) {
            this.serv.getdocdata(Email,Password).subscribe({
              next: (doctorData) => {
                console.log(doctorData);
                localStorage.setItem('doctorData', JSON.stringify(doctorData));
                this._router.navigate(['docboard']);
                this.dialogRef.close();
              }
            });
          }
        }
      });
    } else {
      console.log('Form is not valid');
    }
  }
  
forgotpaswordpage(){
  this._router.navigate(['forgotpassword'])
}
}