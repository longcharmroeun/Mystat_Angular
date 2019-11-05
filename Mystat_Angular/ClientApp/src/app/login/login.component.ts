import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    public usertoken: UserToken;
    constructor(private http: HttpClient, private cookieService: CookieService, @Inject(DOCUMENT) private document: Document) { }
    public onsubmit(formData) {
        let login: Login = {} as any;
        login.application_key = "6a56a5df2667e65aab73ce76d1dd737f7d1faef9c52e8b8c55ac75f565d8e8a6";
        login.id_City = null;
        login.username = formData.username;
        login.password = formData.password;
        this.http.post<UserToken>("https://msapi.itstep.org/api/v2/auth/login", login, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization':'Bearer ',
            })
        }).subscribe(result => { this.usertoken = result }, error => {
            console.error(error),
                alert("Invalid Login!");
        }, () => {
            this.cookieService.set('token', this.usertoken.access_token),
            this.document.location.href = "";
        })
    }

  ngOnInit() {
  }

}

export interface Login {
    application_key?: string;
    id_City?: null;
    password?: string;
    username?: string;
}

export interface UserToken {
    access_token?: string;
    refresh_token?: string;
    expires_in_refresh?: number;
    expires_in_access?: number;
    user_type?: number;
    upload_credentials?: UploadCredentials;
    city_data?: CityData;
}

export interface CityData {
    id_city?: number;
    prefix?: string;
    translate_key?: string;
    timezone_name?: string;
    country_code?: string;
    market_status?: number;
    name?: string;
}

export interface UploadCredentials {
    env?: string;
    upload_token?: string;
    url?: string;
}


