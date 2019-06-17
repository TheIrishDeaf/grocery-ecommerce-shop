import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { auth } from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'grocery-ecommerce-shop';

  constructor(
    private authService: AuthService,
    router: Router
  ) {
    authService.user$.subscribe(user => {

      // Immediately returns is no user
      if (!user) { return; }

      // Immediately returns if no returenUrl saved
      let returnUrl = localStorage.getItem('returnUrl');
      if (!returnUrl) { return; }

      // If neither condition is true, then it hits here
      localStorage.removeItem('returnUrl');
      router.navigateByUrl(returnUrl);

    });
  }

  ngOnInit() {
    // this.authService.initAuthListener();
  }

}

