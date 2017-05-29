import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { languageService } from '../../services/index';
import  { Setting } from '../../../shared';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    constructor(private translate: TranslateService, private langService : languageService) { }
    public user;

    public languages;
    ngOnInit() {
        this.user = JSON.parse(localStorage.getItem('user'));
        this.getLanguages();
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('push-right');
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
    }

    changeLang(language: string) {
        this.translate.use(language);
    }

    getLanguages(){
        this.langService.getLanguages().$observable.subscribe(lang =>  {
            if(lang.length > 0){
                this.languages = lang
            }else{
                this.languages = Setting.LANGUAGES;
            }
        },(error:any) => {
            //alert('no data languages found');
        });
    }



}
