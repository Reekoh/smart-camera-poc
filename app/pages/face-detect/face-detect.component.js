"use strict";
var http = require('http');
var cameraModule = require('camera');
var core_1 = require('@angular/core');
var face_detect_service_1 = require('../../shared/face-detect/face-detect.service');
var FaceDetectPage = (function () {
    function FaceDetectPage(_faceDetect, zone) {
        var _this = this;
        this._faceDetect = _faceDetect;
        this.zone = zone;
        this.faceDetectResult = this._faceDetect.getLastCapture();
        this.isBusy = false;
        this._faceDetect.getFaceDetectResult().subscribe(function (_faceDetectResult) {
            _this.zone.run(function () {
                _this.faceDetectResult = _faceDetectResult;
                console.log('New result:', JSON.stringify(_this.faceDetectResult));
                _this.isBusy = false;
            });
        });
    }
    FaceDetectPage.prototype.ngAfterViewInit = function () {
    };
    FaceDetectPage.prototype.ngOnInit = function () {
    };
    FaceDetectPage.prototype.capture = function () {
        var _this = this;
        var imgCapture = this.imgCapture.nativeElement;
        cameraModule.takePicture({ width: 100, height: 100, keepAspectRatio: true }).then(function (picture) {
            _this.isBusy = true;
            imgCapture.src = picture;
            http.request({
                url: 'http://demo1.reekoh.com:8057/reekoh/data',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                content: JSON.stringify({
                    image: picture.toBase64String('UTF-8'),
                    device: 'smart-detect',
                    sender_id: _this._faceDetect.senderId
                })
            }).then(function (response) {
                console.log('Image sent:', response.statusCode);
            }, function (error) {
                console.log('error', error);
            });
        });
    };
    __decorate([
        core_1.ViewChild('imgCapture'), 
        __metadata('design:type', core_1.ElementRef)
    ], FaceDetectPage.prototype, "imgCapture", void 0);
    __decorate([
        core_1.ViewChild('tryAgainBtn'), 
        __metadata('design:type', core_1.ElementRef)
    ], FaceDetectPage.prototype, "tryAginBtn", void 0);
    FaceDetectPage = __decorate([
        core_1.Component({
            selector: "face-detect",
            templateUrl: 'pages/face-detect/face-detect.component.html',
            styleUrls: ['pages/face-detect/face-detect.css']
        }), 
        __metadata('design:paramtypes', [face_detect_service_1.FaceDetect, core_1.NgZone])
    ], FaceDetectPage);
    return FaceDetectPage;
}());
exports.FaceDetectPage = FaceDetectPage;
//# sourceMappingURL=face-detect.component.js.map