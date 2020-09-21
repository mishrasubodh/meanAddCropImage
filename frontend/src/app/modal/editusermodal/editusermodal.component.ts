import { Component, OnInit ,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Edituserdata} from '../../interfaces/edituserdata'
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {UsersService} from '../../users.service'
import { error } from '@angular/compiler/src/util';
//import {HomeComponent} from '../../home/home.component'
@Component({
  selector: 'editusermodal',
  templateUrl: './editusermodal.component.html',
  styleUrls: ['./editusermodal.component.scss']
})
export class EditusermodalComponent implements OnInit {
  editabledata: any;
  loginForm = this.fb.group({
    id:[null],
    firstname:[null],
    lastname:[null],
    username: [null],
  });

  constructor(
    public dialogRef: MatDialogRef<EditusermodalComponent>,
    @Inject(MAT_DIALOG_DATA)
     public data: Edituserdata,
     private fb: FormBuilder,
     public service:UsersService,
    // private classCall:HomeComponent
     ) 
     {
       console.log('data on edit page',data)
      this.editabledata = data['dataPassed']
      console.log("55555",this.editabledata);
       console.log('a gtya')
     }
     onSubmit(): void {
    
      let obj={
      "id":this.editabledata['_id'],
      "firstName":this.editabledata['firstName'],
      "lastName":this.editabledata['lastName'],
      "username":this.editabledata['username']
      }
        this.service.putdatabyid(obj).then((data)=>{
          console.log("obj",obj)
if(data!==undefined || data!==null){
  console.log('data on edit page',data)
  this.dialogRef.close(data); 
}
        });
       
         // this.classCall.getallusersdata(); 
        }
       

  ngOnInit() {
  }

}
