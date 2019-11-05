import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { DOCUMENT } from '@angular/common';
declare var jQuery: any;
declare var Splide: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
    public userinfo: UserInfo;
    public leaderstream: LeaderStream;
    public loading: boolean = true;
    constructor(private http: HttpClient, private cookieService: CookieService, @Inject(DOCUMENT) private document: Document) {
        this.http.get<UserInfo>("https://msapi.itstep.org/api/v2/settings/user-info", {
            headers: new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': 'Bearer ' + this.cookieService.get("token"),
            })
        }).subscribe(result => this.userinfo = result, error => {
            console.error(error),
                this.document.location.pathname = "Login";
            });

        this.http.get<LeaderStream>("https://msapi.itstep.org/api/v2/dashboard/progress/leader-stream", {
            headers: new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': 'Bearer ' + this.cookieService.get("token"),
            })
        }).subscribe(result => this.leaderstream = result, error => console.error(error));
    }

    ngOnInit() {
        
    }

    public SplideLoad() {
        (function ($) {
            $(document).ready(function () {
                new Splide('.splide', {
                    type: 'loop',
                    autoplay: true,
                }).mount();
            });
        })(jQuery);
    }

    public onLoad() {
        this.loading = false;
        this.SplideLoad();
    }
}

export interface UserInfo {
    groups?: Group[];
    student_id?: number;
    current_group_id?: number;
    full_name?: string;
    achieves_count?: number;
    stream_id?: number;
    stream_name?: string;
    group_name?: string;
    level?: number;
    photo?: string;
    gaming_points?: GamingPoint[];
    spent_gaming_points?: any[];
    visibility?: Visibility;
}

export interface GamingPoint {
    new_gaming_point_types__id?: number;
    points?: number;
}

export interface Group {
    group_status?: number;
    is_primary?: boolean;
    id?: number;
    name?: string;
}

export interface LeaderStream {
    id?: number;
    full_name?: string;
    photo_path?: null | string;
    position?: number;
}


export interface Visibility {
    is_design?: boolean;
    is_vacancy?: boolean;
    is_signal?: boolean;
    is_promo?: boolean;
    is_test?: boolean;
    is_email_verified?: boolean;
    is_quizzes_expired?: boolean;
    is_debtor?: boolean;
}

