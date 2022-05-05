import { Component} from "@angular/core";
import { AuthRequest } from "src/app/models/auth-request";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"],
})
export class LoginPageComponent {
  /**
   * This authentication request object will be updated when the user
   * edits the login form. It will then be sent to the API.
   */
  authRequest: AuthRequest;

  /**
   * If true, it means that the authentication API has return a failed response
   * (probably because the name or password is incorrect).
   */
  loginError: boolean;

  constructor(private auth: AuthService, private router: Router) {
    this.authRequest = new AuthRequest();
    this.loginError = false;
  }

  /**
   * Called when the login form is submitted.
   */
  onSubmit(form: NgForm) {
    // Only do something if the form is valid
    if (form.valid) {
      // Hide any previous login error.
      this.loginError = false;
      console.log('Ma request',this.authRequest);
      // Perform the authentication request to the API.
      this.auth.login(this.authRequest).subscribe({
        next: () => this.router.navigateByUrl("/"),
        error: (err) => {
          this.loginError = true;
          console.warn(`Authentication failed: ${err.message}`);
        },
      });
    }
  }
}