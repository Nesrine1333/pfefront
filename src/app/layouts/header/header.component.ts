import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'
import { LoginService } from '../../service/login.service'
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/service/user-data.service';
import { FormGroup } from '@angular/forms';
import { Admin } from 'src/app/model/admin';
import { AuthService } from 'src/app/service/auth.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document ,private service:LoginService , private route:Router,private userDataService: UserDataService,
  private authService: AuthService) { }
 
  admin!: Admin;
  loginForm!: FormGroup;
  ngOnInit(): void {
   
   
      this.admin = this.userDataService.getLoggedInAdmin(); // Handle the case when a user is already logged in
   
  }
  sidebarToggle()
  {
    //toggle sidebar function
    this.document.body.classList.toggle('toggle-sidebar');
  }
  getAdmin(): any {
    return this.authService.getLoggedInAdmin();
  }

lougout(){
this.authService.clearLoggedInAdmin();
  this.route.navigate(['']);

}



}
