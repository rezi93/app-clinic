import { Component , OnInit} from '@angular/core';

import { ServService } from '../service/serv.service';
import { Router } from '@angular/router';
import { IUser } from '../interface/iface';
import {InputTextModule} from 'primeng/inputtext';
import {MenuItem} from 'primeng/api';
import {TabViewModule} from 'primeng/tabview';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  Users: IUser[] = [];
  constructor(private _service: ServService,
    private _route: Router){}

    getuserlist(): void {
      this._service.getUserList().subscribe((result: IUser[]) => {
        this.Users = result;
        localStorage.setItem('Users', JSON.stringify(this.Users));
      });
    }

    deluser(user: IUser): void {
      const userDataString = localStorage.getItem('userData');
      const userData = userDataString ? JSON.parse(userDataString) : null;
    
      if (userData && userData.category === 'admin') {
        this._service.deleteUser(user.id).subscribe(() => {
          const index = this.Users.indexOf(user);
          if (index !== -1) {
            this.Users.splice(index, 1);
          }
        });
      } else {
        alert("You must be logged in as an admin.");
      }
    }
    
    
    
  

    goback(){
      this._route.navigate(['adminboard']);
    }

    ngOnInit(): void {
      this.getuserlist()
      }
}
