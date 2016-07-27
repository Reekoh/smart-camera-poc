import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {Router} from "@angular/router";
import {Page} from "ui/page";

@Component({
    selector: "splash",
    templateUrl: "pages/splash/splash.html"
})
export class SplashPage implements OnInit {
    constructor(private _router: Router, private page: Page) { }

    ngOnInit() {
        this.page.actionBarHidden = true;
        this.page.backgroundImage = 'res://splash';
        setTimeout(() => {
            console.log('Navigating splashscreen');
            this._router.navigate(["/face-detect"]);
        }, 3000);
    }
}
