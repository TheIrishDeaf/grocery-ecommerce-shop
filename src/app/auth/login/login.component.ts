import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { DatabaseUser } from 'src/app/shared/models/users.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(public authService: AuthService, // public to allow auth.user$
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', { validators: [Validators.required]})
    });
  }

  onSubmit() {
    this.authService.loginWithEmail({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle();
  }

}

