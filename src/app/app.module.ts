import { BrowserModule } from '@angular/platform-browser';
import {HttpModule, Http, BrowserXhr} from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgProgressCustomBrowserXhr } from 'ngx-progressbar';
import { ResourceModule } from 'ngx-resource';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { NgProgressModule } from "ngx-progressbar/progress.module";
import  { ToastrModule } from "ngx-toastr";

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [Http]
            }
        }),
        NgProgressModule,
        ResourceModule.forRoot(),
        ToastrModule.forRoot()
    ],
    providers: [AuthGuard, { provide: BrowserXhr, useClass: NgProgressCustomBrowserXhr }],
    bootstrap: [AppComponent]
})
export class AppModule { }
