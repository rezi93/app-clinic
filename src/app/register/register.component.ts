import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Iuser } from '../interface/iface';
import { ServService } from '../service/serv.service';
import { v4 as uuidv4 } from 'uuid';
import { ConfirmEmailComponent } from '../confirm-email/confirm-email.component';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
 
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  //  Id = uuidv4();
  constructor(private _router: Router, private http: HttpClient, private serv: ServService,private _fb:FormBuilder,private auth:AuthService) {
    this.registerForm = this._fb.group({
      
      
      firstName: this._fb.control('', [Validators.required, Validators.minLength(5)]),
      lastName: this._fb.control('', Validators.required),
      email:this._fb.control('', [Validators.required, Validators.email]),
      password: this._fb.control('', [Validators.required, Validators.minLength(8)]),
      idnumber: this._fb.control('', Validators.required),
      category: this._fb.control('', Validators.required),
      role: this._fb.control('')
    });

  }

  ngOnInit(): void {}
  user:Iuser[]=[];
//   onSubmit() {
//     if (this.registerForm.valid) {
//         const url = 'https://localhost:44346/api/User/postuser';
//         const body = JSON.stringify(this.registerForm.value);
       
//         const options = this.httpOptions;
//         this.http.post<Iuser[]>(url, body, options)
//             .subscribe((data) => {
//                 this.user = data;
//                 console.log('User added successfully', this.user);
                
//                 this._router.navigate(['/Confirmemail'])
//             }, (error) => {
//                 console.log('Error adding user', error);
//             });
            
//     }
    
     
// }


onSubmit() {
  if (this.registerForm.valid) {
    const url = 'https://localhost:44346/api/User/postuser';
    const body = {
      ...this.registerForm.value,
      role: 'user'
    };
    const options = this.httpOptions;
    this.http.post<Iuser[]>(url, body, options)
      .subscribe((data) => {
        this.user = data;
        console.log('User added successfully', this.user);
        this._router.navigate(['/Confirmemail']);
      }, (error) => {
        console.log('Error adding user', error);
      });
  }
}

  
  
}


