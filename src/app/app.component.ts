import { Component ,ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'admindashboard';
  constructor(private elementRef: ElementRef,  public  _router: Router,private authService:AuthService) { }

  ngOnInit() {
    this.isLoggedIn();
    //
  }

  isLoggedIn(): boolean {
    // Implement your authentication logic here
    const loggedInAdmin = this.authService.getLoggedInAdmin();
    return loggedInAdmin !== null && loggedInAdmin !== undefined;
  }
}
