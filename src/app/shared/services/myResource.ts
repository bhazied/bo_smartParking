import {Resource, ResourceActionBase, ResourceParams} from "ngx-resource";
import  { Request } from '@angular/http'
import {Observable} from "rxjs/Observable";
import {Subscriber} from "rxjs/Subscriber";
import  { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@ResourceParams({
    add2Provides: false
})
export class myResource extends Resource {

    constructor(protected http: Http, private router: Router, private toaster: ToastrService){
        super(http);
    }

    getHeaders(methodOptions? : any ): any {
        let headers = super.getHeaders();
        if(methodOptions.noAuth){
            let token = localStorage.getItem('access_token');
            if(token){
                let Bearer = 'Bearer '+ token;
                headers['Authorization']= Bearer;
            }
            return headers;
        }
        return headers;
    }

    responseInterceptor(observable: Observable<any>, req: Request, methodOptions?: ResourceActionBase): Observable<any>{
        return Observable.create((subscriber: Subscriber<any>) => {

            observable.subscribe(
                (res: Response) => {
                    subscriber.next((<any>res)._body ? res.json() : null);
                },
                (error: Response) => {
                    if (error.status === 401) {
                      this.toaster.error('you must be authenticated','Error Authentification');
                        localStorage.removeItem('access_token');
                        localStorage.removeItem('user');
                        localStorage.removeItem('isLoggedin');
                        this.router.navigate(['/login']);
                    }
                    if(error.status === 403){
                        this.toaster.error("You don't have this hability","Error hability");
                        this.router.navigate(['/']);
                    }
                    if(error.status === 0){
                        localStorage.removeItem('access_token');
                        localStorage.removeItem('user');
                        localStorage.removeItem('isLoggedin');
                        this.toaster.error('you must be authenticated','Error Authentification');
                        this.router.navigate(['/login']);
                    }
                    subscriber.error(error);
                },
                () => subscriber.complete()
            );

        });
    }


}
