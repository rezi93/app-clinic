import { Injectable } from '@angular/core';
import { Iface,Ilogin,Iuser,Igetuser,Iemailmodel } from '../interface/iface';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable, map, tap, concatMap, Subject,BehaviorSubject, of } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { NgProgressRef } from 'ngx-progressbar';
import{JwtHelperService} from'@auth0/angular-jwt'
import { Header } from 'primeng/api';
import { T } from '@fullcalendar/core/internal-common';




@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  
  
   jwtHelper = new JwtHelperService();
   currentUser: Ilogin = { 
    Email: '',
   Password:''
   
  };
  
  progressRef!: NgProgressRef;
  defaultColor: string = '#007bff';
  successColor: string = '#13b955';
  failureColor: string = '#fc3939';
  currentColor: string = this.defaultColor;
 header:any

  constructor(private _http: HttpClient, private _route: ActivatedRoute,) { }

 




login(loginobj: any): Observable<any> {
 
  return this._http.post<any>('https://localhost:44346/api/User/login/', loginobj);
}

private apiUrl = 'https://localhost:44346/api/user';

doclogin(loginobj: any): Observable<Ilogin> {
 
  return this._http.post<Ilogin>('https://localhost:44346/api/doc/login', loginobj);
}

getdocdata(email:string,password:string):Observable<Iface>{
  const params={email,password};
  return this._http.get<Iface>('https://localhost:44346/api/doct',{params});
}






getUserProfileData(loginobj: any): Observable<any> {
  return this._http.get<any>(`${this.apiUrl}`, { params: loginobj });
}



  
 

  // email confirm

 
  confirmEmail(emailModel: Iemailmodel): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(emailModel);
    return this._http.post<any>('https://localhost:44346/api/User/emailconfirm', body, { headers: headers });
  }

  

  forgotpass(emailModel: Iemailmodel): Observable<any> {
    
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(emailModel);
    return this._http.post<any>('https://localhost:44346/api/User/forgotpassword', body, { headers: headers });
  
}
  
  
  
  
}