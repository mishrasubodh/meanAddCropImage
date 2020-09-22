import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Edituserdata } from "../../interfaces/edituserdata";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { UsersService } from "../../users.service";
import { error } from "@angular/compiler/src/util";
import { ImageCroppedEvent } from "ngx-image-cropper";
//import {HomeComponent} from '../../home/home.component'
@Component({
  selector: "editusermodal",
  templateUrl: "./editusermodal.component.html",
  styleUrls: ["./editusermodal.component.scss"],
})
export class EditusermodalComponent implements OnInit {
  imageChangedEvent: any = "";
  croppedImage: any = "";
  editabledata: any;
  loginForm = this.fb.group({
    id: [null],
    Name: [null],
    DateofBirth: [null],
    Email: [null],
    Gender: [null],
    MobileNumber: [null],
  });

  constructor(
    public dialogRef: MatDialogRef<EditusermodalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: Edituserdata,
    private fb: FormBuilder,
    public service: UsersService
  ) // private classCall:HomeComponent
  {
  
    this.editabledata = data["dataPassed"];
  
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
 
  }

  loadImageFailed() {
 
  }
  onSubmit(): void {
    let obj = {
      id: this.editabledata["_id"],
      Name: this.editabledata["Name"],
      DateofBirth: this.editabledata["DateofBirth"],
      Email: this.editabledata["Email"],
      Gender: this.editabledata["Gender"],
      MobileNumber: this.editabledata["MobileNumber"],
      imagePath: this.croppedImage,
    };

    this.service.putdatabyid(obj).then((data) => {
    
      if (data !== undefined || data !== null) {
    
        this.dialogRef.close(data);
      }
    });

    // this.classCall.getallusersdata();
  }

  ngOnInit() {}
}
