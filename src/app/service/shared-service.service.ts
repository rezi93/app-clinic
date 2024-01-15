import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  

  selectedCategory: BehaviorSubject<string> = new BehaviorSubject<string>('');
  selectedFirstName: BehaviorSubject<string> = new BehaviorSubject<string>('');
  Category: any;
  
  updateCategory(category: string, firstName: string) {
    this.selectedCategory.next(category.toLowerCase());
    this.selectedFirstName.next(firstName.toLowerCase());
  }


  
  constructor() { }
}
