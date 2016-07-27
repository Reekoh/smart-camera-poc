import {RouterConfig} from "@angular/router";
import {nsProvideRouter} from "nativescript-angular/router"
import {SplashPage} from './pages/splash/splash.component';
import {FaceDetectPage} from './pages/face-detect/face-detect.component';


export const routes: RouterConfig = [
  { path: "", component: SplashPage },
  { path: "face-detect", component: FaceDetectPage }
];

export const APP_ROUTER_PROVIDERS = [
  nsProvideRouter(routes, { enableTracing: false })
];