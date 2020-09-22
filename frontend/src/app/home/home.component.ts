import {
  Component,
  OnInit,
  Output,
  ViewChild,
  Inject,
  ChangeDetectorRef,
} from "@angular/core";
import { UsersService } from "../users.service";
import { Config } from "../config";
import {
  MatPaginator,
  MatTableDataSource,
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA,
} from "@angular/material";

import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { BasicService } from "../basic.service";
import { EditusermodalComponent } from "../modal/editusermodal/editusermodal.component";
import { DeleteusermodalComponent } from "../modal/deleteusermodal/deleteusermodal.component";

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
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  p: number = 1;
  myControl: FormControl;
  displayedColumns: string[] = [
    "_id",
    "firstName",
    "lastName",
    "username",
    "button",
    "button1",
  ];
  dataSource;
  id: any;
  onlydata: string;
  LOGO: any;
  showData = false;
  userId: string;
  constructor(
    public service: UsersService,
    public basicservice: BasicService,
    public config: Config,
    private dialog: MatDialog,
    private Router: Router,
    private route: ActivatedRoute
  ) {
    const users = Array.from({ length: 100 });
    this.basicservice.telicast.subscribe((data) => {
      this.onlydata = data;
    });
    let id = this.route.snapshot.paramMap.get("id");
    if (id) {
      localStorage.setItem("getId", id);
    }
    this.userId = localStorage.getItem("getId");
 
    this.getusersdata(this.userId);
  }

  ngOnInit() {}
  changData(obj) {
    this.basicservice.edit(obj);
  }
  getusersdata(id) {
    this.service.getdatabyid(id).subscribe((data) => {

      if (data) {
        this.dataSource = data;
        this.showData = true;
      } else {
        this.showData = false;
      }
    });
  }

  openDialog(id) {

    this.service.getdatabyid(id).subscribe((dataPassed) => {
      const dialogRef = this.dialog.open(EditusermodalComponent, {
        width: "660px",
        height: "490px",
        panelClass: "EditusermodalComponent",
        data: { dataPassed },
        position: {
          top: "50px",
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        this.id = result;
      
        if (this.id !== undefined || this.id !== null) {
          this.getusersdata(id);
          window.location.reload();
        }
          
      });
    });
  }

  deletedata(id) {
   
    const dialogRef = this.dialog.open(DeleteusermodalComponent, {
      width: "410px",
      height: "200px",
      panelClass: "DeleteusermodalComponent",
      data: { id },
      position: {
        top: "130px",
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.id = result;
      if (this.id !== undefined || this.id !== null) {
     this.Router.navigate(["registration"])
      }
    });
  }
  backtologin() {
    this.Router.navigate(["login"]);
  }
  gotoregistration() {
    this.Router.navigate(['registration']);
  }
}

