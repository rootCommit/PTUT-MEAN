import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit, OnDestroy {
  isLoading = false;
  private authStatusSub: Subscription;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe(authStatus => {
        this.isLoading = false;
      });
  }

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.createUser(form.value.firstname,
                                form.value.lastname,
                                form.value.age,
                                form.value.address,
                                form.value.city,
                                form.value.postalCode,
                                form.value.country,
                                form.value.phoneNumber,
                                form.value.email,
                                form.value.password
    );
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
