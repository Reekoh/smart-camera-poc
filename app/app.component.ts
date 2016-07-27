import 'reflect-metadata';
import {Page} from 'ui/page';
import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {NS_ROUTER_DIRECTIVES, NS_ROUTER_PROVIDERS} from "nativescript-angular/router";
import {FaceDetect} from './shared/face-detect/face-detect.service';

@Component({
  selector: "main",
  directives: [NS_ROUTER_DIRECTIVES],
  providers: [FaceDetect],
  template: "<page-router-outlet></page-router-outlet>"
})
export class AppComponent {}