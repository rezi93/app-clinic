import { Component,EventEmitter,OnInit, Output } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { SharedServiceService } from '../service/shared-service.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.scss']
})
export class AdmindashboardComponent implements OnInit {
  
  
  userData: any;
  constructor(private auth: AuthService, private route:Router,private sharedService: SharedServiceService){}

  

   ngOnInit() {
    const userDataStr = localStorage.getItem('userData');
    if (userDataStr) {
      this.userData = JSON.parse(userDataStr);
      console.log(this.userData);
      
    }
  
   
  }
  


  godocPage(){
  this.route.navigate(['doccategory'])
  }

  goDocPage(){
    this.route.navigate(['docboard'])
    }

    goUserPage(){
      this.route.navigate(['userlist'])
      }

      goAdminPage(){
        this.route.navigate(['adminboard'])
        }
        
    

      }
    