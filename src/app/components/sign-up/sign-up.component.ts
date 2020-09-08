import { Component, OnInit } from '@angular/core';

/* SERVICE */
import { UserService } from './../../services/user/user.service';

/* MODEL */
import { User } from './../../models/user.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: [ UserService ]
})
export class SignUpComponent implements OnInit {
  public user: User;
  public mssg: string;
  public status: string;

  constructor(
    private _userService: UserService
  ) { 
    this.user = new User('','','','','','');
  }

  ngOnInit(): void {}

  onSubmit(form){
    this._userService.createUser(this.user).subscribe(
      res => {
        if (res.user && res.user._id) {
          this.user = res.user;
          this.status = "success";
          this.mssg = res.mssg;
          this.user = new User('','','','','','');
        } else {
          this.mssg = "Error en la petición";
          this.status = "error";
          
        }
        form.reset();
      },
      err => {
        this.status = "error";
        this.mssg = err.error.mssg;
      }
    );
  }
}
