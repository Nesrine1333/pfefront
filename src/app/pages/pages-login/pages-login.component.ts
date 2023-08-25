import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import {HttpClient} from '@angular/common/http';
import {FormBuilder , FormControl, FormGroup, Validators} from '@angular/forms'
import * as alertify from 'alertifyjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserDataService } from 'src/app/service/user-data.service';
import { Admin } from '../../model/admin'
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-pages-login',
  templateUrl: './pages-login.component.html',
  styleUrls: ['./pages-login.component.css']
})
export class PagesLoginComponent implements OnInit {

  constructor(private admiservice:LoginService, private http:HttpClient 
    ,private formBuilder : FormBuilder , private route:Router,private userDataService: UserDataService,private authService: AuthService) { }


  public loginForm !:FormGroup;

  hide = true;

  ngOnInit(): void {
    this.loginForm=  new FormGroup({
      email:new FormControl('',[Validators.required, Validators.email]),
      password:new FormControl('',Validators.required)
      
    })

}

  

getErrorMessage(){ if (this.loginForm.hasError('required')) {
  return 'You must enter a value';
}

return this.loginForm.hasError('email') ? 'Not a valid email' : '';


  }
  loggedInAdmin: Admin | null = null;
  loginAdmin(){
    this.admiservice.getAllAdmin().subscribe(res=>{
     const user=res.find((a:any)=>{
       return a.email ==this.loginForm.value.email &&
       a.password == this.loginForm.value.password 
     });
     if(user && user.roleNames == "Responsable formation"){
       alertify.set('notifier', 'position', 'top-right');
       alertify.notify('login sucess', 'success', 10);
       this.admiservice.getadminById(user.id).subscribe(admin => {
        this.authService.setLoggedInAdmin(user);
        this.userDataService.setLoggedInAdmin(user); // Set the logged-in admin in the service
         const _page = this.route.navigate(['dashboard']);
       });
       this.loginForm.reset();
     }
     else if(user && user.roleNames == "eb_user,Responsable formation,SuperAdmin,AdminCi,inspecteur,EB_PRODUIT_FB_CONSULT,EB_PRODUIT_FB_EDIT,GS_MVT_OF_RESERVATION_CONSULT,GS_MVT_OF_RESERVATION_EDIT,GS_MVT_OF_RESERVATION_DELETE" ){
      alertify.set('notifier', 'position', 'top-right');
       alertify.notify('login sucess', 'success', 10);
       this.admiservice.getadminById(user.id).subscribe(admin => {
        this.authService.setLoggedInAdmin(user);
        this.userDataService.setLoggedInAdmin(user); // Set the logged-in admin in the service
         const _page = this.route.navigate(['dashboard']);
       });
       this.loginForm.reset();

     }  else if (user && user.roleNames !== "Responsable formation"){

       Swal.fire({
         icon: 'error',
         title: 'Oops...',
         text: "Il semble que vous n''ayez pas accès.",
       })
       /*   alertify.alert("You don't have access" ,function(){
            
          }).set('modal', true).set('closable', false).setHeader('Access Denied !!');

          var alertElement = document.getElementsByClassName('ajs-modal')[0] as HTMLElement;;
          var okButtonElement = document.getElementsByClassName('ajs-button ajs-ok')[0] as HTMLElement;;
          var alertContainerElement = document.getElementsByClassName('ajs-modal')[0].parentElement as HTMLElement;

         // alertElement.style.backgroundColor = '#e4dcef';  // Change the background color of the alert
          okButtonElement.style.backgroundColor = '#a56877';  // Change the background color of the OK button
          okButtonElement.style.color = 'white';  // Change the text color of the OK button
          okButtonElement.style.border = '2px solid #551227';
          okButtonElement.style.borderRadius = '5px';

          alertContainerElement.style.display = 'flex';
          alertContainerElement.style.justifyContent = 'center';
          alertContainerElement.style.alignItems = 'center';
         // alertContainerElement.style.backgroundColor ='#d3bfc6';

          var messageElement = document.getElementsByClassName('ajs-content')[0] as HTMLElement;
          messageElement.style.color = '#1a1259';
          messageElement.style.fontFamily = 'Arial';
          messageElement.style.fontSize = '20px';
          messageElement.style.display = 'flex';
          messageElement.style.alignItems='center';
          messageElement.style.justifyContent = 'center';
       
          var boxContainerElement = document.getElementsByClassName('ajs-modal')[0] as HTMLElement;
          boxContainerElement.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.5)';
          var headerElement = document.getElementsByClassName('ajs-header')[0] as HTMLElement;
          headerElement.style.fontSize = '24px';
          headerElement.style.fontWeight = 'bold';
        */
        }    
        else  {
          alertify.warning("user not found");
        }
       })
  }

}
