import { Component, OnInit ,Inject} from '@angular/core';
import {Deleteuserid} from '../../interfaces/deleteuserid'
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {UsersService } from '../../users.service'
import {Config} from '../../config'
@Component({
  selector: 'app-deleteusermodal',
  templateUrl: './deleteusermodal.component.html',
  styleUrls: ['./deleteusermodal.component.scss']
})
export class DeleteusermodalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteusermodalComponent>,
    @Inject(MAT_DIALOG_DATA)
     private userid:Deleteuserid,
     private service:UsersService,
     private config:Config
  ) {

    console.log('id on deleteuserPage',userid)
   }

  ngOnInit() {
  }
deleteUser(userid){
  this.service.deletedata(userid).subscribe((data)=>{
      console.log("33333",data); 
      if(data['message']=='data successfuly delete') {
        this.config.openSnackBar('user successfuly remove',true)
       // this.getallusersdata();
       // this.cd.markForCheck();
       this.dialogRef.close(userid);
      }
    });
}

cancle(){
  this.dialogRef.close();
}

}
