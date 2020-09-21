import { Component, OnInit,Input,OnChanges } from '@angular/core';
import {GlobalService} from '../global.service'
import { Router} from '@angular/router'
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  userData: any; 

  constructor(
    private glservice:GlobalService,
    private routes:Router
  ) { 
  this.glservice.userlogindata.subscribe((data)=>{
   // console.log('data on userpage',data)
     this.userData =data['responce']
     console.log('data on user page again', this.userData);
     
  })
  
   }
   goToHome(){
this.routes.navigate(['home'])

   }
  ngOnInit() {
  }
  ngOnChanges(){
   
  }
  
 
}
