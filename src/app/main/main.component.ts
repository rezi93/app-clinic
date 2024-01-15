import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Iface } from '../interface/iface';
import { ServService, } from '../service/serv.service';

import { SharedServiceService } from '../service/shared-service.service';
import {InputTextModule} from 'primeng/inputtext';
import {MenuItem} from 'primeng/api';
import {TabViewModule} from 'primeng/tabview';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  value: number = 5;
  doct: Iface[] = [];
  originalDoct:Iface[]=[]

  constructor(private _service: ServService,
    private _route: Router,private sharedService: SharedServiceService){}

  ngOnInit() {
    this.getlist();
    
  

  }
  counter = 6;

  loadMore() {
    this.counter += 4;
  }

  
  
  getlist() {
    this.sharedService.selectedCategory.subscribe((selectedCategory: string) => {
      this.filterDoctors();
    });

    this.sharedService.selectedFirstName.subscribe((selectedFirstName: string) => {
      this.filterDoctors();
    });

    this._service.getdoctList().subscribe((result: Iface[]) => {
      this.doct = result;
      this.originalDoct = result;
      this.filterDoctors();
    });
  }

  filterDoctors() {
    const selectedCategory = this.sharedService.selectedCategory.getValue();
    const selectedFirstName = this.sharedService.selectedFirstName.getValue();
  
    if (selectedCategory || selectedFirstName) {
      this.doct = this.originalDoct.filter((item: Iface) => {
        const categoryMatch = !selectedCategory || item.category.toLowerCase().includes(selectedCategory);
        const firstNameMatch = !selectedFirstName || item.first_name.toLowerCase().includes(selectedFirstName);
        return categoryMatch && firstNameMatch;
      });
    } else {
      this.doct = this.originalDoct;
    }
  }
  

  

  bookingPage(docID:number){
    this._route.navigate(['/doctor/',docID])
    
    
     }

}
