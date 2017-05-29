import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  } from '../shared';
import {authService} from "../shared/services/Auth/authService";
import {Login} from "./classes/login";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    constructor(public router: Router, private auth: authService) { }
    public errorLoggedIn = false;
    public message = null;
    ngOnInit() {
    }

     login: Login = new Login();
     onLoggedin(form) {
        let response = this.auth.login({username:form.value.username, password:form.value.password});
        response.$observable.toPromise().then((res:any) => {
            if(res.access_token){
                localStorage.setItem('access_token', res.access_token);
                localStorage.setItem('user', JSON.stringify(res.user));
                localStorage.setItem('isLoggedin', 'true');
                this.router.navigate(['/dashboard']);
            }else if(res.error){

                this.errorLoggedIn = true;
                this.message = res.message;
                this.router.navigate(['/login']);
            }
        },
            (error:any) => {
                this.errorLoggedIn = true;
            }
        );

    }

}
