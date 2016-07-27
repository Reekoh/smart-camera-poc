"use strict";
var application_1 = require("nativescript-angular/application");
var app_routes_1 = require("./app.routes");
var app_component_1 = require("./app.component");
var appSettings = require("application-settings");
global.localStorage = {
    getItem: function (key) {
        return appSettings.getString(key);
    },
    setItem: function (key, value) {
        return appSettings.setString(key, value);
    }
};
application_1.nativeScriptBootstrap(app_component_1.AppComponent, [
    app_routes_1.APP_ROUTER_PROVIDERS
]);
//# sourceMappingURL=main.js.map