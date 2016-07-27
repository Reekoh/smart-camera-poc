"use strict";
require('reflect-metadata');
var core_1 = require('@angular/core');
var router_1 = require("nativescript-angular/router");
var face_detect_service_1 = require('./shared/face-detect/face-detect.service');
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: "main",
            directives: [router_1.NS_ROUTER_DIRECTIVES],
            providers: [face_detect_service_1.FaceDetect],
            template: "<page-router-outlet></page-router-outlet>"
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map