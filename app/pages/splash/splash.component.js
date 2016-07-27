"use strict";
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var page_1 = require("ui/page");
var SplashPage = (function () {
    function SplashPage(_router, page) {
        this._router = _router;
        this.page = page;
    }
    SplashPage.prototype.ngOnInit = function () {
        var _this = this;
        this.page.actionBarHidden = true;
        this.page.backgroundImage = 'res://splash';
        setTimeout(function () {
            console.log('Navigating splashscreen');
            _this._router.navigate(["/face-detect"]);
        }, 3000);
    };
    SplashPage = __decorate([
        core_1.Component({
            selector: "splash",
            templateUrl: "pages/splash/splash.html"
        }), 
        __metadata('design:paramtypes', [router_1.Router, page_1.Page])
    ], SplashPage);
    return SplashPage;
}());
exports.SplashPage = SplashPage;
//# sourceMappingURL=splash.component.js.map