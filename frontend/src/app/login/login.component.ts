import {
  Component,
  OnInit,
  HostListener,
  OnChanges,
  Output,
  EventEmitter,
  Input,
} from "@angular/core";
import { MeterialModule } from "../meterial/meterial.module";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Config } from "../config";
import { UsersService } from "../users.service";
import { BasicService } from "../basic.service";
import { GlobalService } from "../global.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  logindataforuser = {};
  model: any = {};
  registerForm: FormGroup;
  submitted = false;
  homePassed = "aaa";
  checked: boolean = false;
  show: boolean = true;
  users = { username: "", password: "" };
  showbtn: boolean = true;
  saveddata: any;
  userData: any;
  customer: any;
  name: any;
  customedata: string;
  usernamerdata;
  logeduserdata: any;
  showchecked: any;
  passwordshown: boolean = false;
  // passwordType: string = 'password';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public config: Config,
    private authservice: UsersService,
    private basicservice: BasicService,
    private glservice: GlobalService
  ) {
    // for remember me
    if (JSON.parse(localStorage.getItem("logindata"))) {
      this.logeduserdata = JSON.parse(localStorage.getItem("logindata"));
     
      this.checked = true;
      this.showbtn = true;
   
      this.users.username = this.logeduserdata.username;
      this.users.password = this.logeduserdata.password;
    }
  }

  
  login: FormGroup;
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      Username: ["", [Validators.required, Validators.email]],
      Password: ["", [Validators.required, Validators.minLength(6)]],
    });
    this.basicservice.telicast.subscribe((data) => {
      this.customedata = data;
   
    });
  }
  updatedDataSelection(data) {
    debugger;
    this.basicservice.edit(data);

    this.router.navigate(["/home"]);
  }

  onSubmit(user) {
    this.submitted = true;
    if (this.registerForm.invalid) {
      this.config.openSnackBar("Error", false);
      return;
    }
    this.save(user);
  }
  moveRegistration() {
    this.router.navigate(["/registration"]);
  }
  checkvalidation() {
    return new Promise((resolve, reject) => {
      if (this.users.password == null) {
        this.showbtn = false;
        reject();
      }
      resolve();
    });
  }
  username: any;
  save(user) {
    this.checkvalidation().then(() => {
     

      this.authservice.getLogin(user).subscribe(
        (data) => {
        
          if (data["message"] == "auth successful") {
            this.glservice.getlogindataonglobal(data);
            this.config.openSnackBar("login successful", true);
            if (this.checked == true) {
              localStorage.setItem("logindata", JSON.stringify(this.users));
            } else if (this.checked == false) {
              localStorage.removeItem("logindata");
            }
            this.router.navigate(["user"]);

            setTimeout(() => {
              this.registerForm.reset();
            }, 3000);
          } else if (data["message"] == "user not found") {
            this.config.openSnackBar("user not found", false);
          }
        },
        (error) => {
          this.config.openSnackBar("error", false);
        }
      );
    });
  }
  usernamer(usernamer: any) {
    throw new Error("Method not implemented.");
  }

  onChange(event) {
    this.checked = !this.checked;
    this.showchecked = this.checked;
   
  }
  showpassword() {
    this.show = !this.show;
  }
}
