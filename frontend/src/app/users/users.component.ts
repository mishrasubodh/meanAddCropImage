import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { GlobalService } from "../global.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
  userData: any;

  constructor(private glservice: GlobalService, private routes: Router) {
    this.glservice.userlogindata.subscribe((data) => {
      this.userData = data["responce"];

    });
  }
  goToHome(id) {
    this.routes.navigate(["home", id]);
  }
  ngOnInit() {}
  ngOnChanges() {}
}
