import {nativeScriptBootstrap} from "nativescript-angular/application";
import {APP_ROUTER_PROVIDERS} from "./app.routes";
import {AppComponent} from "./app.component";
import * as appSettings from "application-settings";

global.localStorage = {
    getItem(key: string) {
        return appSettings.getString(key);
    },
    setItem(key: string, value: string) {
        return appSettings.setString(key, value); 
    }
}

nativeScriptBootstrap(AppComponent, [
  APP_ROUTER_PROVIDERS
]);