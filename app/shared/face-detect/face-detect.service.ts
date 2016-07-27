import {Injectable} from '@angular/core';
import {Subject, Observable} from 'rxjs';
require('nativescript-websockets');

@Injectable()
export class FaceDetect {
    public faceDetectResults: Array<FaceDetectResult>;
    private subject: Subject<FaceDetectResult> = new Subject<FaceDetectResult>();
    public senderId: String;
    constructor() {
        this.faceDetectResults = JSON.parse(localStorage.getItem('faceDetectResults') || '[]');
        this.initSocket();
        this.senderId = 'SMART_DETECT_' + Math.round(Math.random() * (Math.random() * 10000 ));
    }

    private updateStore() {
        localStorage.setItem('faceDetectResults', JSON.stringify(this.faceDetectResults));
    }

    private add(faceDetectResult: FaceDetectResult) {
        faceDetectResult.age = Math.round(faceDetectResult.age);
        this.faceDetectResults.push(faceDetectResult);
        this.updateStore();
        this.subject.next(faceDetectResult);
    }

    private reconnect(evt) {
        console.log("The Socket was Closed:", evt.code, evt.reason);
        console.log('Reconnecting in 5 seconds');
        setTimeout( () => {
            this.initSocket();
        }, 5000);
    }

    initSocket() {
        let mySocket = new WebSocket('ws://demo1.reekoh.com:8055');
        mySocket.addEventListener('open', (evt) => { console.log('We are Open');});
        mySocket.addEventListener('message', (evt) => {
            let data = JSON.parse(evt.data);
            if (data && this.senderId === data.sender_id) {
                this.add(data);
            } 
        });
        mySocket.addEventListener('close', (evt) => { this.reconnect(evt)  });
        mySocket.addEventListener('error', (evt) => { console.log('The socket had an error', evt.error); });
    }

    getFaceDetectResult(): Observable<FaceDetectResult> {
        return this.subject.asObservable();
    }

    getLastCapture() {
        return {
            age: 0,
            gender: 'male',
            emotion: 'happiness'    
        };
    }
}