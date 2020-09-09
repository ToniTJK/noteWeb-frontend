import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/* SERVICE */
import { UserService } from './../../services/user/user.service';

/* MODEL */
import { User } from './../../models/user.model';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
  providers: [UserService],
})
export class LogInComponent implements OnInit {
  public mssg: string;
  public status: string;
  public user: User;
  public identity;
  public token;

  constructor(
    private _userService: UserService,
    private _route: Router
    ) {
    this.user = new User('', '', '', '', '', '');
  }

  ngOnInit(): void {}

  onSubmit(form) {
    this._userService.login(this.user).subscribe(
      (res) => {
        this.identity = res.user;
        if (!this.identity || !this.identity._id) {
          this.status = 'error';
          this.mssg = 'El usuario no se ha logueado correctamente.';
        } else {
          /* Como se ha logueado tenemos que coger el token */
          this.status = 'success';
          this.identity.password = '';
          localStorage.setItem('identity', JSON.stringify(this.identity));
          this.getToken();
        }
      },
      (err) => {
        this.status = 'error';
        this.mssg = err.error.mssg;
      }
    );
  }

  getToken() {
    this._userService.login(this.user, 'true').subscribe(
      (res) => {
        this.token = res.token;

        if (this.token.length <= 0) {
          this.status = 'error';
          this.mssg = 'El token no se ha generado correctamente.';
        } else {
          this.status = 'success';
          this.mssg = 'Sesión iniciada correctamente.';
          localStorage.setItem('token', JSON.stringify(this.token));

          this._route.navigate(['/my-panel']);
        }
      },
      (err) => {
        this.status = 'error';
        this.mssg = err.error.mssg;
      }
    );
  }
}
