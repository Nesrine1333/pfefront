import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/service/user-data.service';
import { Admin } from 'src/app/model/admin';
import { FormControl, FormGroup, Validators,AbstractControl,ValidatorFn, FormBuilder } from '@angular/forms';
import { LoginService } from 'src/app/service/login.service';
import { AuthService } from 'src/app/service/auth.service';
import * as alertify from 'alertifyjs';
import emailjs from '@emailjs/browser';

 

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.css']
})
export class UsersProfileComponent implements OnInit {

   user! : FormGroup;
  constructor(private userDataService: UserDataService ,private adminUser:LoginService, private authService: AuthService ,private formbuilder:FormBuilder) { 
    this.user = this.formbuilder.group({
      firstName:new FormControl('',Validators.required),
      lastName:new FormControl('',Validators.required),
      email : new FormControl('',[ Validators.email,Validators.required]),
      password: new FormControl('',[Validators.required,Validators.min(8),this.passwordValidator]),
      confpassword: new FormControl('',[Validators.required]),
      currentPassword:new FormControl('',[Validators.min(8),Validators.required,this.currentPasswordValidator(this.getAdmin().password)])
    },{
      validators:this.MustMatch('password','confpassword')
    }
  );
  }


  arePasswordsMatching(): boolean {
    const password = this.user.value.password;
    const confpassword = this.user.value.confpassword;
    return password === confpassword;
  }

  admin!: Admin;
  ngOnInit(): void {
    this.admin = this.userDataService.getLoggedInAdmin();
    
  }

   passwordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const value: string = control.value;
    const hasUppercase = /[A-Z]/.test(value);
    const hasLowercase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const valid = hasUppercase && hasLowercase && hasNumber;
    return valid ? null : { 'passwordRequirements': true };
  }

  currentPasswordValidator(adminPassword: string): any {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const value: string = control.value;
      const valid = value === adminPassword;
      return valid ? null : { 'incorrectPassword': true };
    };
  }


  passwordsDoNotMatch(): any  {
    const password = this.user.value.password;
    const confpassword = this.user.value.confpassword;
    const valid = password === confpassword;
    return valid ?  null  : { 'incorrectPassword': true };
  }

 passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const password = control.get('password')?.value;
      const confpassword = control.get('confpassword')?.value;
      return password === confpassword ? null : { 'passwordMismatch': true };
    };
  }

  get f(){
    return this.user.controls;
  }

  MustMatch(password:any , confpassword:any){
    return(user:FormGroup)=>{
      const control = user.controls[password];
      const matchinf = user.controls[confpassword];
      if(matchinf.errors && !matchinf.errors['MustMatch']){
        return;
      }

      if(control.value !== matchinf.value){
        matchinf.setErrors({MustMatch: true});
      }else{
        matchinf.setErrors(null);
      }
    }
   
  }




  userr = new FormGroup({
    firstName:this.formbuilder.control(this.getAdmin().firstName,Validators.required),
    lastName:this.formbuilder.control(this.getAdmin().lastName,Validators.required),
    email : this.formbuilder.control(this.getAdmin().email,[ Validators.email,Validators.required])})

  getAdmin(): any {
    return this.authService.getLoggedInAdmin();
  }

saveUser(){
  if (this.userr.valid) {
    const adminData = {
      ...this.getAdmin(),
      firstName: this.userr.value.firstName,
      lastName: this.userr.value.lastName,
      email: this.userr.value.email    };

    this.adminUser.updateadmin(adminData).subscribe(response => {
      alertify.set('notifier', 'position', 'top-right');
      alertify.notify('Updated successfully', 'success', 5);
      // Update the logged-in admin with the updated values
      this.authService.setLoggedInAdmin(adminData);
    });
  }
}

savepassword(){
  if (this.user.valid) {
    const adminData = {
      ...this.getAdmin(),
      password: this.user.value.password
      };

    this.adminUser.updateadmin(adminData).subscribe(response => {
      alertify.set('notifier', 'position', 'top-right');
      alertify.notify('Updated successfully', 'success', 5);
      // Update the logged-in admin with the updated values
      
     
      const templateParams = {
        name: 'James',
        notes: 'Check this out!'
    };
    emailjs.init('0txDHlaB98LJfgp0K');
    emailjs.send("service_j49kid8","template_584mzt2",{
      to_name: "nesrine",
      from_name: "Forc",
      message: "Votre mot de passe a été modifié",
      });
        this.authService.setLoggedInAdmin(adminData);
    });
  }
}



}