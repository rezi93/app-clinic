import { Component ,OnInit} from '@angular/core';
import { AuthService } from '../service/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Iemailmodel } from '../interface/iface';



@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {

 forgotpass!:FormGroup
 forgotPassword: boolean = false;
 
 
 emailModel: Iemailmodel = {
  To: 'reziq337@gmail.com',
  Subject: 'Forgot Password',
  Content: 'Your new password is: '
};

  constructor(private auth:AuthService, private route:ActivatedRoute,private _fb:FormBuilder,private _router:Router){
    this.forgotpass=this._fb.group({
      email:this._fb.control('', [Validators.required, Validators.email])
    })
  }

  ngOnInit(): void{}

  
forgotpassword() {
 

  if (this.emailModel) {
   
    this.auth.forgotpass(this.emailModel).subscribe(
      () => {
        
        this.forgotPassword = true;
        
        
        
      },
      (error) => {
        console.log(error);
        this.forgotPassword = false;
      }
    );
  }
  alert('New password sent!');
  this._router.navigate(['/']);
}


}
