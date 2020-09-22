import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
import { BasicService } from "../basic.service";
import { Message } from "@angular/compiler/src/i18n/i18n_ast";
import { UsersService } from "../users.service";
import { Config } from "../config";
import { ImageCroppedEvent } from "ngx-image-cropper";

@Component({ templateUrl: "registration.component.html" })
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  registrationData: boolean;
  message: string;
  test;
  imageChangedEvent: any = "";
  croppedImage: any = "";
  userRegistration: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private basicservice: BasicService,
    private userservice: UsersService,
    private config: Config
  ) {
    //    this.function();
  }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    
  }

  loadImageFailed() {

  }

  send() {
    const file = this.croppedImage;
    alert("succesfully upload");

    this.router.navigate(["/Dashboard"]);
  }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      Name: ["", Validators.required],
      DateofBirth: ["", Validators.required],
      Gender: ["", Validators.required],
      MobileNumber: ["", Validators.required],
      Email: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });

    this.basicservice.telicast.subscribe((data) => {
      this.message = data;
    });

  }
  editData() {
    this.basicservice.edit(this.test);
    
    this.router.navigate(["/registration"]);
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;

    if (this.registerForm.invalid) {
      this.loading = false;
      return;
    }
   
    this.userRegistration = this.registerForm.value;
    if (this.croppedImage) {
      this.userRegistration["imagePath"] = this.croppedImage;
    } else {
      this.userRegistration["imagePath"] = "imagePath";
    }

    this.registration(this.userRegistration);

    //

    //   this.router.navigate(['/login'])
  }
  registration(userRegistration) {
    this.loading = false;
    this.userservice.registration(userRegistration).subscribe((data) => {
      if (data["message"] == "Registration SuccessFull") {
        this.config.openSnackBar("Registration Successfully", true);
        this.router.navigate(["login"]);
      }
    });
  }
  //
}
