import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthComponent } from '../auth/auth.component';
import { SharedServiceService } from '../service/shared-service.service';

import { Iface } from '../interface/iface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  docts: Iface[] = [];
  category = '';
  first_name = '';
  isMenuOpen = false;
  isMenuClosed = true;
  userData: any;

  constructor(
    private _route: Router,
    private dialog: MatDialog,
    private sharedService: SharedServiceService
  ) {}

  ngOnInit(): void {
    
  }

  getUserData() {
    const userDataStr = localStorage.getItem('userData');
    if (userDataStr) {
      return JSON.parse(userDataStr);
    }
    return null;
  }

  showLoginPopup(): void {
    const dialogRef = this.dialog.open(AuthComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The login popup was closed');
    });
  }

  searchDoctors(): void {
    this.sharedService.updateCategory(this.category.toLowerCase(), this.first_name.toLowerCase());
  }

  regPage(): void {
    this._route.navigate(['/register']);
  }

  toggleMenu():void {
    this.isMenuOpen  = !this.isMenuOpen ;
  }

  logout(){
    localStorage.removeItem('userData');
    alert('log out')
    this._route.navigate([''])
  }

  
}
