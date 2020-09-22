import { Injectable } from '@angular/core';
import {BehaviorSubject} from'rxjs'
@Injectable({
  providedIn: 'root'
})
export class GlobalService {
 logindata= new BehaviorSubject<{}>({});
 userlogindata = this.logindata.asObservable();
  constructor(){
    
   }


getlogindataonglobal(data:any){ 
this.logindata.next(data);
  }

}

