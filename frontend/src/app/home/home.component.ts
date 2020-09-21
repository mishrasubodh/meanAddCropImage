import { Component, OnInit, Output,ViewChild ,Inject, ChangeDetectorRef,} from '@angular/core';
import {UsersService } from '../users.service'
import {Config } from '../config'
import {MatPaginator, MatTableDataSource,MatDialogRef, MatDialog, MAT_DIALOG_DATA} from '@angular/material';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {BasicService } from "../basic.service"
import { EditusermodalComponent } from '../modal/editusermodal/editusermodal.component';
import { DeleteusermodalComponent } from '../modal/deleteusermodal/deleteusermodal.component';



export interface PeriodicElement {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  button: string;
  button1: string;
}
export interface DialogData {
  animal: string;
  name: string;
}
export interface Deleteuserid {
  id: number;
  
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  p:number = 1;
  myControl : FormControl;
  displayedColumns: string[] = ['_id','firstName', 'lastName', 'username', 'button', 'button1'];
  dataSource; 
  id: any;
  onlydata: string;
    constructor(
      public service:UsersService,
    public basicservice :BasicService,
      public config :Config,
      private dialog: MatDialog,
      private Router:Router,
    
     //  private cd:ChangeDetectorRef
     
    ) {
      const users = Array.from({length: 100});
    this. getallusersdata();
    this.basicservice.telicast.subscribe((data)=>{
      console.log("ghghgghghghghghghghhghgh",data)
      this.onlydata= data
    })
     }

  ngOnInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }
  changData(obj){
    this.basicservice.edit(obj)

  }
getallusersdata(){     
  this.service.getallusersdata().subscribe((data)=>{
    console.log("22222",data);
    this.dataSource = data;
    console.log("33333",this.dataSource);
    // this.con.markForCheck();
  })
}

  
openDialog(id) {
  console.log("333333333",id)
this.service.getdatabyid(id).then((dataPassed)=>{
 
  const dialogRef = this.dialog.open(EditusermodalComponent, {
    width: '660px',
    height: '490px',
    panelClass: 'EditusermodalComponent',
    data: {dataPassed },
    position: {
      top: '50px'
    }
  });

  dialogRef.afterClosed().subscribe((result) => {
    this.id = result;
    console.log("33333",this.id);  
    if(this.id!==undefined|| this.id!==null){
      this.getallusersdata();
    }
  //  window.location.reload();
  });
})
}

deletedata(id){
  console.log("id in delete page",id)
  const dialogRef = this.dialog.open(DeleteusermodalComponent, {
    width: '410px',
    height: '200px',
    panelClass: 'DeleteusermodalComponent',
    data: {id},
    position: {
      top: '130px'
    }
  });

  dialogRef.afterClosed().subscribe((result) => {
    this.id = result;
    console.log("33333",this.id);  
   if(this.id !== undefined || this.id !==null){
    this.getallusersdata();
   }
  });

}
backtologin(){
 this.Router.navigate(['login'])
}
gotoregistration(){
  this.Router.navigate(['registration'])
}

serchInput(eventPassed){ 
  console.log('%%%%%%%%%%%%%%%%%%%%%111',eventPassed.target.value)
  
  if(eventPassed.target.value.length > 2 ){
    this.service.searchText(eventPassed.target.value).then((res:any)=>{
      console.log('%%%%%%%%%%%%%%%%%%%%%2222res',res)
  });
  }
}

}



// @Component({
//   selector: 'dialogbox',
//   templateUrl: 'dialogbox.html',
//   styleUrls: ['dialogbox.scss'],
// })
// export class dialogbox {

//   dataSource;
//   loginForm = this.fb.group({
//     id:[null],
//     firstname:[null],
//     lastname:[null],
//     username: [null],
//   });
//   editabledata: DialogData;
//   constructor( 
//     public dialogRef: MatDialogRef<dialogbox>,
//     @Inject(MAT_DIALOG_DATA) public data: DialogData,
//     private fb: FormBuilder,
//      public service:UsersService,
//      private classCall:HomeComponent

//     ) 
//     { 

//  this.editabledata = data['dataPassed']
//  console.log("55555",this.editabledata);
//     }

//     onSubmit(): void {
    
// let obj={
// "id":this.editabledata['_id'],
// "firstName":this.editabledata['firstName'],
// "lastName":this.editabledata['lastName'],
// "username":this.editabledata['username']
// }
//   this.service.putdatabyid(obj).then((data)=>{
//   })
//     this.dialogRef.close(); 
//     this.classCall.getallusersdata(); 
//   }
 
  
// }
