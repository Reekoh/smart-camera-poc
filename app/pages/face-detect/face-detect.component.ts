import http = require('http');
import cameraModule = require('camera');
import imageSource = require('image-source');
import fs = require('file-system');
import {View} from 'ui/core/view';
import {Page} from 'ui/page';
import {topmost} from 'ui/frame';
import {Component, ElementRef, OnInit, ViewChild, AfterViewInit, NgZone} from '@angular/core';
import {FaceDetect} from '../../shared/face-detect/face-detect.service';

@Component({
    selector: "face-detect",
    templateUrl: 'pages/face-detect/face-detect.component.html',
    styleUrls: ['pages/face-detect/face-detect.css']
})
export class FaceDetectPage implements OnInit, AfterViewInit {
    @ViewChild('imgCapture') imgCapture: ElementRef; 
    @ViewChild('tryAgainBtn') tryAginBtn: ElementRef;

    public faceDetectResult: FaceDetectResult;
    public isBusy: Boolean;
    public senderId: String;   
    constructor(private _faceDetect: FaceDetect, private zone: NgZone) {
        this.faceDetectResult = this._faceDetect.getLastCapture();
        this.isBusy = false;
        
        this._faceDetect.getFaceDetectResult().subscribe((_faceDetectResult: FaceDetectResult) => {
            this.zone.run(() => {
                this.faceDetectResult = _faceDetectResult;                
                console.log('New result:', JSON.stringify(this.faceDetectResult));
                this.isBusy = false;
            });
        });
    }

    ngAfterViewInit() {

    }
    
    ngOnInit() {

    }
    
    capture() { 
        let imgCapture = this.imgCapture.nativeElement;        
        cameraModule.takePicture({width: 100, height: 100, keepAspectRatio: true}).then(picture => {
            this.isBusy = true;
            imgCapture.src = picture;
            http.request({
                url: 'http://demo1.reekoh.com:8057/reekoh/data',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                content: JSON.stringify({
                    image: picture.toBase64String('UTF-8'),
                    device: 'smart-detect',
                    sender_id: this._faceDetect.senderId
                })
            }).then( (response) => {
                console.log('Image sent:', response.statusCode);
            }, (error) => {
                console.log('error', error);
            });
        });
    }
}
