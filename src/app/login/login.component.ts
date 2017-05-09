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

    ngOnInit() {
    }

     login: Login = new Login();
    onLoggedin(form) {
        let response = this.auth.login({username:form.value.username, password:form.value.password});
        console.log(response);
        response.$observable.toPromise().then((res:any) => {
            if(res.access_token){
                localStorage.setItem('access_token', res.access_token);
                localStorage.setItem('isLoggedin', 'true');
                this.router.navigate(['/dashboard']);
            }else{
                this.router.navigate(['/login']);
            }
        },
            (error:any) => {
                alert('you cant logged in');
            }
        );

    }

}
