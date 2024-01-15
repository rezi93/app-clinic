import { Component, OnInit, Inject,  HostListener, ViewChild } from '@angular/core';

import { Router,ActivatedRoute } from '@angular/router';
import { ServService } from '../service/serv.service';
import { Iface,IMenuItem } from '../interface/iface';
import { Observable, map, tap, concatMap, Subject,BehaviorSubject } from 'rxjs';
import {TabViewModule} from 'primeng/tabview';
import {MenuItem} from 'primeng/api';





@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],

})
export class BookingComponent implements OnInit {

  doct: Iface[] = [];
  docdata:any
  docID:any
  value: number = 5;
  counter = 6;
  constructor(private _serv: ServService,
    private _route: Router,private _act: ActivatedRoute,){}

    ngOnInit(): void {
      this.docID = this._act.snapshot.paramMap.get("id");
        this.getuserById(this.docID)
    }

  loadMore() {
    this.counter += 4;
  }

  goback() {
    this._route.navigate([''])
  }

  getuserById(docID: any) {
    this._serv.getuser(docID)
      .subscribe(data => { this.docdata = data })

  }


   
}