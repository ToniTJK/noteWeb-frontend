import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

/* SERVICES */
import { UserService } from './../../services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [UserService],
})
export class HeaderComponent implements OnInit, DoCheck {
  public identity;
  public token;

  constructor(private _userService: UserService, private _router: Router) {}

  ngOnInit() {
    this.identity = this._userService.getIdentity();
  }

  ngDoCheck() {
    this.identity = this._userService.getIdentity();
  }

  logout() {
    var r = confirm('Are you sure you want to exit?');
    if (r == true) {
      localStorage.clear();
      this.identity = null;
      this._router.navigate(['/']);
    } 
  }
}
