import { Injectable } from '@angular/core';
import { myResource } from "../myResource";
import { Resource, ResourceParams, ResourceAction } from 'ngx-resource';
import { ResourceMethod } from 'ngx-resource/src/Interfaces';
import { RequestMethod } from '@angular/http';
import { Setting } from "../../constant/setting";


@Injectable()
@ResourceParams({
    url: Setting.API_ENDPOINT
})
export class authService extends myResource{

    @ResourceAction({
        method: RequestMethod.Post,
        path: '/login',
        noAuth: true
    })
    login : ResourceMethod<{username: string, password: string}, any>;
}
