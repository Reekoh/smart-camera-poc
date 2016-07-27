"use strict";
var router_1 = require("nativescript-angular/router");
var splash_component_1 = require('./pages/splash/splash.component');
var face_detect_component_1 = require('./pages/face-detect/face-detect.component');
exports.routes = [
    { path: "", component: splash_component_1.SplashPage },
    { path: "face-detect", component: face_detect_component_1.FaceDetectPage }
];
exports.APP_ROUTER_PROVIDERS = [
    router_1.nsProvideRouter(exports.routes, { enableTracing: false })
];
//# sourceMappingURL=app.routes.js.map