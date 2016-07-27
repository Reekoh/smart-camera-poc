"use strict";
var core_1 = require('@angular/core');
var rxjs_1 = require('rxjs');
require('nativescript-websockets');
var FaceDetect = (function () {
    function FaceDetect() {
        this.subject = new rxjs_1.Subject();
        this.faceDetectResults = JSON.parse(localStorage.getItem('faceDetectResults') || '[]');
        this.initSocket();
        this.senderId = 'SMART_DETECT_' + Math.round(Math.random() * (Math.random() * 10000));
    }
    FaceDetect.prototype.updateStore = function () {
        localStorage.setItem('faceDetectResults', JSON.stringify(this.faceDetectResults));
    };
    FaceDetect.prototype.add = function (faceDetectResult) {
        faceDetectResult.age = Math.round(faceDetectResult.age);
        this.faceDetectResults.push(faceDetectResult);
        this.updateStore();
        this.subject.next(faceDetectResult);
    };
    FaceDetect.prototype.reconnect = function (evt) {
        var _this = this;
        console.log("The Socket was Closed:", evt.code, evt.reason);
        console.log('Reconnecting in 5 seconds');
        setTimeout(function () {
            _this.initSocket();
        }, 5000);
    };
    FaceDetect.prototype.initSocket = function () {
        var _this = this;
        var mySocket = new WebSocket('ws://demo1.reekoh.com:8055');
        mySocket.addEventListener('open', function (evt) { console.log('We are Open'); });
        mySocket.addEventListener('message', function (evt) {
            var data = JSON.parse(evt.data);
            if (data && _this.senderId === data.sender_id) {
                _this.add(data);
            }
        });
        mySocket.addEventListener('close', function (evt) { _this.reconnect(evt); });
        mySocket.addEventListener('error', function (evt) { console.log('The socket had an error', evt.error); });
    };
    FaceDetect.prototype.getFaceDetectResult = function () {
        return this.subject.asObservable();
    };
    FaceDetect.prototype.getLastCapture = function () {
        return {
            age: 0,
            gender: 'male',
            emotion: 'happiness'
        };
    };
    FaceDetect = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], FaceDetect);
    return FaceDetect;
}());
exports.FaceDetect = FaceDetect;
//# sourceMappingURL=face-detect.service.js.map