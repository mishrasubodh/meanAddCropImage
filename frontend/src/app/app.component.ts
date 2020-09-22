import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {UsersService} from './users.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
   public Name ='amit';
  title = 'Java Script';

  name = 'Angular 5';
  constructor(
    private _http: HttpClient,
    private authservice:UsersService
    ) {
    
  }
}
