import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Iemailmodel } from '../interface/iface';


@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit {

  emailConfirmed: boolean = false;
  emailModel: Iemailmodel = {
    To: 'reziq337@gmail.com',
    Subject: 'Email confirm',
    Content: 'Your email confirmed '
  };
  constructor(private auth:AuthService, private route:ActivatedRoute,private _fb:FormBuilder,private _router:Router){
    this.myEmail=this._fb.group({
      email:this._fb.control('', [Validators.required, Validators.email])
    })
  }

  myEmail!:FormGroup
  
ngOnInit(): void{}


confirmEmail() {
  

  if (this.emailModel) {
    this.auth.confirmEmail(this.emailModel).subscribe(
      () => {
        
       
        alert('email confirmed!');
        this.emailConfirmed = true;
        this._router.navigate(['']);
        
        
      },
      (error) => {
        console.log(error);
        this.emailConfirmed = false;
      }
    );
  }
}

    

}
