import { Component,OnInit } from '@angular/core';
import { ServService } from '../service/serv.service';
import { Router } from '@angular/router';
import { Iface } from '../interface/iface';
import {InputTextModule} from 'primeng/inputtext';
import {MenuItem} from 'primeng/api';
import {TabViewModule} from 'primeng/tabview';

@Component({
  selector: 'app-doc-category',
  templateUrl: './doc-category.component.html',
  styleUrls: ['./doc-category.component.scss']
})
export class DocCategoryComponent implements OnInit {

  doctor:Iface[]=[]
  value: number = 5;
  doctors: Iface[] = [];

  constructor(private _service: ServService,
    private _route: Router){}

  ngOnInit(): void {
    this.getlist();
    }

    getlist(): void {
      this._service.getdoctList().subscribe((result: Iface[]) => {
        this.doctors = result;
        localStorage.setItem('doctors', JSON.stringify(this.doctors));
      });
    }
  
    delDoc(doctor: Iface): void {
      const index = this.doctors.indexOf(doctor);
      if (index !== -1) {
        this.doctors.splice(index, 1);
      }
    }

    goback(){
      this._route.navigate(['adminboard']);
    }
  
}
