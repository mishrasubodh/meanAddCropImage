import { Injectable } from '@angular/core';
// import {BehaviorSubject} from 'rxjs/BehaviorSubject'
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';


@Injectable({
  providedIn: 'root'
})
export class BasicService {
public message = new BehaviorSubject<string>('this is  basic servicve')
telicast = this.message.asObservable();
  constructor() { }

  edit(messge){
    this.message.next(messge) 
    
  }

}
