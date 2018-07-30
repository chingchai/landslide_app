webpackJsonp([4],{

/***/ 102:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_leaflet__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_leaflet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_leaflet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_leaflet_gridlayer_googlemutant__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_leaflet_gridlayer_googlemutant___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_leaflet_gridlayer_googlemutant__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_report_report__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var DetailPage = /** @class */ (function () {
    function DetailPage(navCtrl, navParams, reportProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.reportProvider = reportProvider;
        this.dat = this.navParams.get('data');
    }
    DetailPage.prototype.ionViewDidLoad = function () {
        // console.log(this.dat);
        this.loadMap();
    };
    DetailPage.prototype.loadMap = function () {
        this.map = __WEBPACK_IMPORTED_MODULE_2_leaflet__["map"]('map2', {
            center: [18.00, 100.50],
            zoom: 8,
            zoomControl: false,
            attributionControl: false,
        });
        // base map
        this.roads = __WEBPACK_IMPORTED_MODULE_2_leaflet__["tileLayer"]('http://{s}.google.com/vt/lyrs=r&x={x}&y={y}&z={z}', {
            maxZoom: 20,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
        });
        this.satellite = __WEBPACK_IMPORTED_MODULE_2_leaflet__["tileLayer"]('http://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
            maxZoom: 20,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
        });
        this.hybrid = __WEBPACK_IMPORTED_MODULE_2_leaflet__["tileLayer"]('http://{s}.google.com/vt/lyrs=y,m&x={x}&y={y}&z={z}', {
            maxZoom: 20,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
        });
        this.terrain = __WEBPACK_IMPORTED_MODULE_2_leaflet__["tileLayer"]('http://{s}.google.com/vt/lyrs=t,m&x={x}&y={y}&z={z}', {
            maxZoom: 20,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
        });
        // overlay
        var r = 30000;
        this.ud_vill = __WEBPACK_IMPORTED_MODULE_2_leaflet__["tileLayer"].wms("http://www3.cgistln.nu.ac.th/geoserver/ows?", {
            layers: 'lsnanbasin:village_detect_final',
            format: 'image/png',
            transparent: true,
            CQL_FILTER: 'DWITHIN(geom,Point(' + this.dat[1] + ' ' + this.dat[0] + '),' + r + ',meters)',
            zIndex: 5
        });
        this.pos = [this.dat[0], this.dat[1]];
        this.map.setView(this.pos, 16);
        this.marker = __WEBPACK_IMPORTED_MODULE_2_leaflet__["marker"](this.pos, { draggable: false }).addTo(this.map);
        this.lyrGroup = {
            lyr: [
                { name: 'หมู่บ้าน', lyr: 'ud_vill', wms: this.ud_vill.addTo(this.map), type: 'overlay', 'isChecked': false },
                { name: 'แผนที่ถนน', lyr: 'roads', wms: this.roads, type: 'base', 'isChecked': false },
                { name: 'แผนที่ภาพดาวเทียม', lyr: 'satellite', wms: this.satellite, type: 'base', 'isChecked': false },
                { name: 'แผนที่ผสม', lyr: 'hybrid', wms: this.hybrid, type: 'base', 'isChecked': false },
                { name: 'แผนที่ภูมิประเทศ', lyr: 'terrain', wms: this.terrain.addTo(this.map), type: 'base', 'isChecked': true },
            ]
        };
        // L.control.layers(baseLayers, overlay, { position: 'topright' }).addTo(this.map);
        this.loadVill(this.dat[1], this.dat[0], r);
    };
    DetailPage.prototype.loadVill = function (lon, lat, r) {
        var _this = this;
        this.reportProvider.getVill10Km(lon, lat, r).then(function (res) {
            _this.vill10Km = res.features;
            console.log(_this.vill10Km);
        });
    };
    DetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-detail',template:/*ion-inline-start:"C:\_dev_prod\landslide_app\src\pages\detail\detail.html"*/'<ion-header class="kanit">\n\n\n\n  <ion-navbar color="primary">\n\n    <ion-title>หมู่บ้านในรัศมี 10 กิโลเมตร</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding class="kanit">\n\n\n\n  <div id="map2" class="map2"></div>\n\n  <p></p>\n\n  <ion-list>\n\n    <ion-list-header>\n\n      <h1>หมู่บ้านในรัศมี 10 กิโลเมตร</h1>\n\n    </ion-list-header>\n\n    <ion-item *ngFor="let v of vill10Km">{{v.properties.vill_nam_t}}</ion-item>\n\n  </ion-list>\n\n\n\n</ion-content>'/*ion-inline-end:"C:\_dev_prod\landslide_app\src\pages\detail\detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__providers_report_report__["a" /* ReportProvider */]])
    ], DetailPage);
    return DetailPage;
}());

//# sourceMappingURL=detail.js.map

/***/ }),

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LayerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LayerPage = /** @class */ (function () {
    function LayerPage(navCtrl, navParams, viewCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.lyrOver = [];
        this.lyrBase = [];
        this.lyrs = navParams.get('lyr');
        this.lyrs.forEach(function (l) {
            if (l.type === 'overlay') {
                _this.lyrOver.push(l);
            }
            else {
                _this.lyrBase.push(l);
            }
        });
    }
    LayerPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LayerPage');
    };
    LayerPage.prototype.onCheckWms = function (lyr, isChecked) {
        if (isChecked) {
            for (var i in this.lyrs) {
                if (this.lyrs[i].lyr === lyr) {
                    this.lyrs[i].isChecked = true;
                }
            }
        }
        else {
            for (var i in this.lyrs) {
                if (this.lyrs[i].lyr === lyr) {
                    this.lyrs[i].isChecked = false;
                }
            }
        }
    };
    LayerPage.prototype.onSelect = function (lyr) {
        for (var i in this.lyrs) {
            if (this.lyrs[i].type === 'base') {
                if (this.lyrs[i].lyr === lyr) {
                    this.lyrs[i].isChecked = true;
                }
                else {
                    this.lyrs[i].isChecked = false;
                }
            }
        }
    };
    LayerPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss(this.lyrs);
    };
    LayerPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-layer',template:/*ion-inline-start:"C:\_dev_prod\landslide_app\src\pages\layer\layer.html"*/'<ion-header class="kanit">\n\n  <ion-toolbar>\n\n    <ion-title>\n\n      ชั้นข้อมูล\n\n    </ion-title>\n\n    <ion-buttons start>\n\n      <button ion-button (click)="dismiss()">\n\n        <span ion-text color="primary" showWhen="ios">Cancel</span>\n\n        <ion-icon name="md-close" showWhen="android,windows"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-toolbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content padding class="kanit">\n\n  <ion-list>\n\n    <ion-list-header>\n\n      เลือกชั้นข้อมูล\n\n    </ion-list-header>\n\n    <ion-item *ngFor="let o of lyrOver; let i = index">\n\n      <ion-label>{{o.name}}</ion-label>\n\n      <ion-checkbox [(ngModel)]="o.isChecked" (ionChange)="onCheckWms(o.lyr,$event.checked)"></ion-checkbox>\n\n    </ion-item>\n\n  </ion-list>\n\n  <p></p>\n\n  <p></p>\n\n  <ion-list radio-group (ionChange)="onSelect($event)">\n\n    <ion-list-header>\n\n      เลือกแผนที่ฐาน\n\n    </ion-list-header>\n\n\n\n    <ion-item *ngFor="let lyr of lyrBase; let i = index">\n\n      <ion-label>{{lyr.name}}</ion-label>\n\n      <ion-radio [value]="lyr.lyr" [checked]="lyr.isChecked"></ion-radio>\n\n    </ion-item>\n\n  </ion-list>\n\n</ion-content>'/*ion-inline-end:"C:\_dev_prod\landslide_app\src\pages\layer\layer.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ViewController */]])
    ], LayerPage);
    return LayerPage;
}());

//# sourceMappingURL=layer.js.map

/***/ }),

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_report_report__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__detail_detail__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





var ListPage = /** @class */ (function () {
    function ListPage(navCtrl, navParams, ref, loadingCtrl, reportProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.ref = ref;
        this.loadingCtrl = loadingCtrl;
        this.reportProvider = reportProvider;
        this.pos = this.reportProvider.getLocation();
    }
    ListPage.prototype.ionViewDidLoad = function () {
        this.loadRain(this.pos.lat, this.pos.lon);
        // this.loadVill10Km()
    };
    ListPage.prototype.loadRain = function (lat, lon) {
        var _this = this;
        // console.log(this.pos.lat, this.pos.lon)
        this.reportProvider.getRain(lat, lon).then(function (res) {
            var wk = 'wk' + __WEBPACK_IMPORTED_MODULE_4_moment__().weeks();
            // console.log(res.features[0].properties)
            _this.reports = res.features[0].properties;
            _this.rainnow = _this.reports.raincur;
            _this.rain7day = _this.reports.rain7day;
            _this.rain2018 = _this.reports.rain2018;
            _this.ls_risk = _this.reports.ls_risk;
            _this.rainAVWeek = _this.reports[wk];
            if (_this.rainnow > 100 && _this.ls_risk == 3) {
                _this.warning = 'อพยพ';
            }
            else if (_this.rainnow > 100 && _this.ls_risk <= 2) {
                _this.warning = 'เตือนภัย';
            }
            else if (_this.rainnow <= 100 && _this.ls_risk == 3) {
                _this.warning = 'เฝ้าระวัง';
            }
            else {
                _this.warning = 'เฝ้าระวัง';
            }
        }, function (error) {
            console.log(error);
        });
    };
    // loadVill10Km() {
    //   this.reportProvider.getVill10Km().then((res: any) => {
    //     this.vill10Km = res.features[0].properties.vill_nam_t;
    //     console.log(this.vill10Km)
    //   })
    // }
    ListPage.prototype.loadReport = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var loader;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        loader = this.loadingCtrl.create({
                            spinner: 'dots',
                            content: 'Loading...',
                        });
                        loader.present();
                        return [4 /*yield*/, this.reportProvider.getReportList().then(function (res) {
                                console.log(res);
                                _this.reports = res;
                                loader.dismiss();
                            }, function (error) {
                                loader.dismiss();
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ListPage.prototype.viewReportDetail = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__detail_detail__["a" /* DetailPage */], { data: [this.pos.lat, this.pos.lon] });
        // console.log(r)
    };
    ListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-list',template:/*ion-inline-start:"C:\_dev_prod\landslide_app\src\pages\list\list.html"*/'<ion-header class="kanit">\n\n\n\n  <ion-navbar color="primary">\n\n    <ion-title>แจ้งเตือน</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding class="kanit">\n\n\n\n  <ion-card class="bg">\n\n    <ion-card-header>\n\n      สถานการณ์เตือนภัย\n\n    </ion-card-header>\n\n    <ion-card-content>\n\n      <ion-item class="bg">\n\n        <ion-avatar item-start>\n\n          <img src="./assets/icon/drop3.png">\n\n        </ion-avatar>\n\n        <h1>{{ warning }}</h1>\n\n        <p>gfdhgghgdjsdsgsgsdgsdgsgsgsgsgsgsf</p>\n\n      </ion-item>\n\n      <ion-row>\n\n        <ion-col>\n\n        </ion-col>\n\n        <ion-col>\n\n        </ion-col>\n\n        <ion-col>\n\n          <button ion-button icon-start clear (click)="viewReportDetail()">\n\n            <ion-icon name="text"></ion-icon>\n\n            <div>หมู่บ้านในรัศมี 10 กม.</div>\n\n          </button>\n\n        </ion-col>\n\n      </ion-row>\n\n\n\n    </ion-card-content>\n\n  </ion-card>\n\n\n\n  <!-- \n\n  <ion-card class="bg">\n\n    <ion-card-header>\n\n      หมู่บ้านในรัศมี 10 กม.\n\n    </ion-card-header>\n\n    <ion-card-content>\n\n    </ion-card-content>\n\n  </ion-card> -->\n\n\n\n\n\n  <ion-card class="bg">\n\n    <ion-card-header>\n\n      ปริมาณน้ำฝนปัจจุบัน (24 ชม)\n\n    </ion-card-header>\n\n    <ion-card-content>\n\n      <ion-item class="bg">\n\n        <ion-avatar item-start>\n\n          <img src="./assets/icon/drop3.png">\n\n        </ion-avatar>\n\n        <h1> {{ rainnow | number : \'1.2-2\' }} มม. </h1>\n\n        <p>gfdhgghgdjf</p>\n\n      </ion-item>\n\n    </ion-card-content>\n\n  </ion-card>\n\n\n\n  <ion-card class="bg">\n\n    <ion-card-header>\n\n      ปริมาณน้ำฝนสะสม 7 วันที่ผ่านมา\n\n    </ion-card-header>\n\n    <ion-card-content>\n\n      <ion-item class="bg">\n\n        <ion-avatar item-start>\n\n          <img src="./assets/icon/drop5.png">\n\n        </ion-avatar>\n\n        <h1>{{ rain7day | number : \'1.2-2\' }} มม.</h1>\n\n        <p>gfdhgghgdjf</p>\n\n      </ion-item>\n\n    </ion-card-content>\n\n  </ion-card>\n\n\n\n  <ion-card class="bg">\n\n    <ion-card-header>\n\n      ปริมาณน้ำฝนสะสม (1 ม.ค. ถึงปัจจุบัน)\n\n    </ion-card-header>\n\n    <ion-card-content>\n\n      <ion-item class="bg">\n\n        <ion-avatar item-start>\n\n          <img src="./assets/icon/rain2.png">\n\n        </ion-avatar>\n\n        <h1> {{ rain2018 | number : \'1.2-2\' }} มม.</h1>\n\n        <p>gfdhgghgdjf</p>\n\n      </ion-item>\n\n    </ion-card-content>\n\n  </ion-card>\n\n\n\n  <ion-card class="bg">\n\n    <ion-card-header>\n\n      ปริมาณน้ำฝนเฉลี่ย 30 ปี ของสัปดาห์ปัจจุบัน\n\n    </ion-card-header>\n\n    <ion-card-content>\n\n      <ion-item class="bg">\n\n        <ion-avatar item-start>\n\n          <img src="./assets/icon/water.png">\n\n        </ion-avatar>\n\n        <h1>{{ rainAVWeek | number : \'1.2-2\' }} มม.</h1>\n\n        <p>gfdhgghgdjf</p>\n\n      </ion-item>\n\n    </ion-card-content>\n\n  </ion-card>\n\n\n\n\n\n\n\n</ion-content>'/*ion-inline-end:"C:\_dev_prod\landslide_app\src\pages\list\list.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_report_report__["a" /* ReportProvider */]])
    ], ListPage);
    return ListPage;
}());

//# sourceMappingURL=list.js.map

/***/ }),

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReportPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_report_report__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ReportPage = /** @class */ (function () {
    // private userProfile: any;
    // private lat: number;
    // private lon: number;
    // private pos: Array<number>;
    function ReportPage(navCtrl, navParams, toastCtrl, camera, 
        // private http: HttpClient,
        loadingCtrl, reportProvider
        // private facebook: FacebookServiceProvider
    ) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.camera = camera;
        this.loadingCtrl = loadingCtrl;
        this.reportProvider = reportProvider;
        this.parking = null;
        this.parking = { id: 0, pname: '', available: 1 };
        // this.facebook.getProfile().subscribe((res) => {
        //   this.parking.id_user = res.id;
        // }, (error) => { console.log(error); });
    }
    ReportPage.prototype.ionViewDidLoad = function () {
        this.showLocation();
    };
    ReportPage.prototype.showLocation = function () {
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        // loading.present();
        var pos = this.reportProvider.getLocation();
        this.parking.lat = pos.lat;
        this.parking.lon = pos.lon;
        // this.reportProvider.getLocation().then((res) => {
        //   console.log(res)
        //   this.parking.lat = res.lat
        //   this.parking.lon = res.lon
        //   loading.dismiss();
        // })
    };
    ReportPage.prototype.save = function () {
        var _this = this;
        var toast = this.toastCtrl.create({
            message: 'เพิ่มข้อมูลสำเร็จ',
            duration: 3000,
            position: 'bottom',
        });
        toast.onDidDismiss(function () {
            _this.navCtrl.pop();
            console.log('Dismissed toast');
        });
        console.log(this.parking);
        // this.http.post("http://cgi.uru.ac.th/service/udsafe_mobile_report.php", this.parking)
        //   .subscribe(res => {
        //     toast.present();
        //   }, (err) => {
        //     console.log('can not add this data')
        //   })
        this.reportProvider.postMobileReport(this.parking).then(function (res) {
            toast.present();
        }, function (error) {
            console.log(error);
        });
        console.log('save ParkingAddPage');
    };
    ReportPage.prototype.takePicture = function () {
        var _this = this;
        var options = {
            quality: 40,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this.camera.getPicture(options).then(function (imageData) {
            var base64Image = 'data:image/jpeg;base64,' + imageData;
            _this.parking.photo = base64Image;
        }, function (error) {
            console.log('Camera error!', error);
        });
    };
    ReportPage.prototype.browsePicture = function () {
        var _this = this;
        var options = {
            destinationType: 0,
            sourceType: 0,
            allowEdit: true
        };
        this.camera.getPicture(options).then(function (imageData) {
            var base64Image = 'data:image/jpeg;base64,' + imageData;
            _this.parking.photo = base64Image;
        }, function (error) {
            console.log('Browse picture error!', error);
        });
        console.log('browsePicture ParkingAddPage');
    };
    ReportPage.prototype.removePicture = function () {
        this.parking.photo = null;
        console.log('removePicture ParkingAddPage');
    };
    ReportPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-report',template:/*ion-inline-start:"C:\_dev_prod\landslide_app\src\pages\report\report.html"*/'<ion-header class="kanit">\n\n  <ion-navbar color="pk-gold">\n\n    <ion-title>เพิ่มรายงาน</ion-title>\n\n    <ion-buttons end>\n\n      <button ion-button color="primary" icon-left (click)="save()" [disabled]="name.errors && (name.dirty || name.touched)">\n\n        <ion-icon name="create"></ion-icon>\n\n        SAVE\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content class="kanit">\n\n  <ion-item-group>\n\n    <ion-item-divider color="light">รายละเอียดสถานที่</ion-item-divider>\n\n    <ion-item>\n\n      <ion-label stacked>สถานที่</ion-label>\n\n      <ion-input type="text" [(ngModel)]="parking.pname" id="name" #name="ngModel" placeholder="ชื่อสถานที่" required></ion-input>\n\n    </ion-item>\n\n    <div padding class="error-border" *ngIf="name.errors && (name.dirty || name.touched)">กรุณากรอกข้อมูลสถานที่</div>\n\n    <ion-item>\n\n      <ion-label stacked>รายละเอียด</ion-label>\n\n      <ion-textarea [(ngModel)]="parking.pdesc" placeholder="เพิ่มรายละเอียดข้อมูลสถานที่ "></ion-textarea>\n\n    </ion-item>\n\n    <p padding>lat: {{parking.lat | number}} lon: {{parking.lon | number}}</p>\n\n  </ion-item-group>\n\n  <ion-item-group>\n\n    <ion-item-divider color="light">รูปสถานที่</ion-item-divider>\n\n    <ion-card>\n\n      <ion-item>\n\n        <ion-avatar item-left>\n\n          <img src="./assets/imgs/no-person.jpg">\n\n        </ion-avatar>\n\n        <h2>Take or Browse Picture</h2>\n\n        <p>รูปภาพสถานที่</p>\n\n      </ion-item>\n\n      <img [src]="parking.photo" *ngIf="parking.photo">\n\n      <img src="./assets/imgs/no-image.jpg" *ngIf="!parking.photo" padding>\n\n      <ion-row>\n\n        <ion-col>\n\n          <button ion-button clear small icon-left (click)="takePicture()">\n\n            <ion-icon name="camera"></ion-icon>\n\n            <div>ถ่ายภาพ</div>\n\n          </button>\n\n        </ion-col>\n\n        <ion-col>\n\n          <button ion-button clear small icon-left (click)="browsePicture()">\n\n            <ion-icon name="folder-open"></ion-icon>\n\n            <div>เลือกรูป</div>\n\n          </button>\n\n        </ion-col>\n\n        <ion-col>\n\n          <button ion-button clear small color="danger" icon-left (click)="removePicture()">\n\n            <ion-icon name="trash"></ion-icon>\n\n            <div>ลบรูป</div>\n\n          </button>\n\n        </ion-col>\n\n      </ion-row>\n\n    </ion-card>\n\n  </ion-item-group>\n\n</ion-content>'/*ion-inline-end:"C:\_dev_prod\landslide_app\src\pages\report\report.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_report_report__["a" /* ReportProvider */]
            // private facebook: FacebookServiceProvider
        ])
    ], ReportPage);
    return ReportPage;
}());

//# sourceMappingURL=report.js.map

/***/ }),

/***/ 117:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 117;

/***/ }),

/***/ 159:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/detail/detail.module": [
		413,
		3
	],
	"../pages/layer/layer.module": [
		414,
		2
	],
	"../pages/list/list.module": [
		415,
		1
	],
	"../pages/report/report.module": [
		416,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 159;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 329:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__contact_contact__ = __webpack_require__(330);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(331);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__list_list__ = __webpack_require__(104);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TabsPage = /** @class */ (function () {
    function TabsPage() {
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_3__list_list__["a" /* ListPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_1__contact_contact__["a" /* ContactPage */];
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\_dev_prod\landslide_app\src\pages\tabs\tabs.html"*/'<ion-tabs class="kanit">\n\n  <ion-tab [root]="tab1Root" tabTitle="แผนที่ความเสี่ยง" tabIcon="globe"></ion-tab>\n\n  <ion-tab [root]="tab2Root" tabTitle="แจ้งเตือน" tabIcon="notifications"></ion-tab>\n\n  <ion-tab [root]="tab3Root" tabTitle="เกี่ยวกับเรา" tabIcon="contacts"></ion-tab>\n\n</ion-tabs>'/*ion-inline-end:"C:\_dev_prod\landslide_app\src\pages\tabs\tabs.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 330:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ContactPage = /** @class */ (function () {
    function ContactPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    ContactPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-contact',template:/*ion-inline-start:"C:\_dev_prod\landslide_app\src\pages\contact\contact.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n\n    <ion-title>\n\n      Contact\n\n    </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n\n\n\n\n  <ion-card>\n\n    <ion-card-content>\n\n      <img src="../../assets/logo/logo4.png" />\n\n      <p></p>\n\n      <hr>\n\n      <p>สถานภูมิภาคเทคโนโลยีอวกาศและภูมิสารสนเทศ ภาคเหนือตอนล่าง มหาวิทยาลัยนเรศวร</p>\n\n      <p>Regional Center of Geo-Informatics and Space Technology, Lower Northern Region, Naresuan University</p>\n\n    </ion-card-content>\n\n  </ion-card>\n\n</ion-content>'/*ion-inline-end:"C:\_dev_prod\landslide_app\src\pages\contact\contact.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]])
    ], ContactPage);
    return ContactPage;
}());

//# sourceMappingURL=contact.js.map

/***/ }),

/***/ 331:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_leaflet__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_leaflet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_leaflet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_leaflet_gridlayer_googlemutant__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_leaflet_gridlayer_googlemutant___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_leaflet_gridlayer_googlemutant__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__ = __webpack_require__(332);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__report_report__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_report_report__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__layer_layer__ = __webpack_require__(103);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, geolocation, loadingCtrl, modalCtrl, reportProvider, alertCtrl) {
        this.navCtrl = navCtrl;
        this.geolocation = geolocation;
        this.loadingCtrl = loadingCtrl;
        this.modalCtrl = modalCtrl;
        this.reportProvider = reportProvider;
        this.alertCtrl = alertCtrl;
        this.lat = 0;
        this.lon = 0;
    }
    HomePage.prototype.ionViewDidLoad = function () {
        this.loadMap();
        this.showLocation();
    };
    HomePage.prototype.loadMap = function () {
        this.map = __WEBPACK_IMPORTED_MODULE_2_leaflet__["map"]('map', {
            center: [18.00, 100.50],
            zoom: 8,
            zoomControl: false,
            attributionControl: false,
        });
        this.roads = __WEBPACK_IMPORTED_MODULE_2_leaflet__["tileLayer"]('http://{s}.google.com/vt/lyrs=r&x={x}&y={y}&z={z}', {
            maxZoom: 20,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
        });
        this.satellite = __WEBPACK_IMPORTED_MODULE_2_leaflet__["tileLayer"]('http://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
            maxZoom: 20,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
        });
        this.hybrid = __WEBPACK_IMPORTED_MODULE_2_leaflet__["tileLayer"]('http://{s}.google.com/vt/lyrs=y,m&x={x}&y={y}&z={z}', {
            maxZoom: 20,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
        });
        this.terrain = __WEBPACK_IMPORTED_MODULE_2_leaflet__["tileLayer"]('http://{s}.google.com/vt/lyrs=t,m&x={x}&y={y}&z={z}', {
            maxZoom: 20,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
        });
        // overlay
        // Radar From TMD&NECTEC
        var imageUrl = 'http://rain.tvis.in.th/output/';
        this.radar_cri = __WEBPACK_IMPORTED_MODULE_2_leaflet__["imageOverlay"](imageUrl + 'CRI.png', [[22.305437, 102.143387], [17.596297, 97.611690]]);
        this.radar_kkn = __WEBPACK_IMPORTED_MODULE_2_leaflet__["imageOverlay"](imageUrl + 'KKN.png', [[18.793550, 105.026265], [14.116192, 100.541459]]);
        this.radar_phs = __WEBPACK_IMPORTED_MODULE_2_leaflet__["imageOverlay"](imageUrl + 'PHS.png', [[19.094393, 102.475537], [14.411350, 97.983591]]);
        this.radar_omk = __WEBPACK_IMPORTED_MODULE_2_leaflet__["imageOverlay"](imageUrl + 'OMK.png', [[19.904425, 100.770048], [15.630408, 96.114592]]);
        // Rain WPS GISTNU
        this.tmdrainfall = __WEBPACK_IMPORTED_MODULE_2_leaflet__["tileLayer"].wms("http://www3.cgistln.nu.ac.th/geoserver/ows?", {
            layers: 'tmdservices:tmdrainfall',
            format: 'image/png',
            transparent: true,
            //CQL_FILTER: 'prov_code=53',
            zIndex: 5
        });
        this.rainfall7day = __WEBPACK_IMPORTED_MODULE_2_leaflet__["tileLayer"].wms("http://map.nu.ac.th/gs-alr2/ows?", {
            layers: 'alrmap:rainsplinegrid',
            format: 'image/png',
            transparent: true,
            //CQL_FILTER: 'prov_code=53',
            zIndex: 5
        });
        this.gdem = __WEBPACK_IMPORTED_MODULE_2_leaflet__["tileLayer"].wms("http://www3.cgistln.nu.ac.th/geoserver/ows?", {
            layers: 'lsnanbasin:gdem',
            format: 'image/png',
            transparent: true,
            //CQL_FILTER: 'prov_code=53',
            zIndex: 5
        });
        this.lsrisk_mod1 = __WEBPACK_IMPORTED_MODULE_2_leaflet__["tileLayer"].wms("http://www3.cgistln.nu.ac.th/geoserver/ows?", {
            layers: 'lsnanbasin:mod1',
            format: 'image/png',
            transparent: true,
            opacity: 0.7,
            //CQL_FILTER: 'prov_code=53',
            zIndex: 5
        });
        this.flowacc = __WEBPACK_IMPORTED_MODULE_2_leaflet__["tileLayer"].wms("http://www3.cgistln.nu.ac.th/geoserver/ows?", {
            layers: 'lsnanbasin:flowaccm',
            format: 'image/png',
            transparent: true,
            opacity: 0.5,
            //CQL_FILTER: 'prov_code=53',
            zIndex: 5
        });
        this.gs_tmd = __WEBPACK_IMPORTED_MODULE_2_leaflet__["tileLayer"].wms("http://www3.cgistln.nu.ac.th/geoserver/ows?", {
            layers: 'lsnanbasin:tmdnectec',
            format: 'image/png',
            transparent: true,
            //opacity: 0.5,
            //CQL_FILTER: 'prov_code=53',
            zIndex: 5
        });
        this.ud_prov = __WEBPACK_IMPORTED_MODULE_2_leaflet__["tileLayer"].wms("http://www3.cgistln.nu.ac.th/geoserver/ows?", {
            layers: 'gistdata:province',
            format: 'image/png',
            transparent: true,
            //CQL_FILTER: 'prov_code=53',
            zIndex: 5
        });
        this.ud_amp = __WEBPACK_IMPORTED_MODULE_2_leaflet__["tileLayer"].wms("http://www3.cgistln.nu.ac.th/geoserver/ows?", {
            layers: 'gistdata:amphoe',
            format: 'image/png',
            transparent: true,
            //CQL_FILTER: 'prov_code=53',
            zIndex: 4
        });
        this.ud_tam = __WEBPACK_IMPORTED_MODULE_2_leaflet__["tileLayer"].wms("http://www3.cgistln.nu.ac.th/geoserver/ows?", {
            layers: 'gistdata:tambon',
            format: 'image/png',
            transparent: true,
            //CQL_FILTER: 'prov_code=53',
            zIndex: 3
        });
        this.ud_vill = __WEBPACK_IMPORTED_MODULE_2_leaflet__["tileLayer"].wms("http://www3.cgistln.nu.ac.th/geoserver/ows?", {
            layers: 'gistdata:village',
            format: 'image/png',
            transparent: true,
            CQL_FILTER: 'prov_code=53',
            zIndex: 5
        });
        this.lyrGroup = {
            lyr: [
                { name: 'ขอบเขตอำเภอ', lyr: 'ud_amp', wms: this.ud_amp.addTo(this.map), type: 'overlay', 'isChecked': true },
                { name: 'ขอบเขตตำบล', lyr: 'ud_tam', wms: this.ud_tam.addTo(this.map), type: 'overlay', 'isChecked': true },
                { name: 'ขอบเขตจังหวัด', lyr: 'ud_prov', wms: this.ud_prov.addTo(this.map), type: 'overlay', 'isChecked': true },
                { name: 'ข้อมูลภูมิประเทศ', lyr: 'gdem', wms: this.gdem, type: 'overlay', 'isChecked': false },
                { name: 'ข้อมูลการไหลสะสม', lyr: 'flowacc', wms: this.flowacc, type: 'overlay', 'isChecked': false },
                { name: 'ข้อมูลพื้นที่เสี่ยงดินถล่ม', lyr: 'lsrisk_mod1', wms: this.lsrisk_mod1.addTo(this.map), type: 'overlay', 'isChecked': true },
                { name: 'ข้อมูลฝนจาก Radar: พิษณุโลก', lyr: 'radar_phs', wms: this.radar_phs, type: 'overlay', 'isChecked': false },
                { name: 'ข้อมูลฝนจาก Radar: เชียงราย', lyr: 'radar_cri', wms: this.radar_cri, type: 'overlay', 'isChecked': false },
                { name: 'ข้อมูลฝนจาก Radar: เชียงใหม่', lyr: 'radar_omk', wms: this.radar_omk, type: 'overlay', 'isChecked': false },
                { name: 'ข้อมูลฝนจาก Radar: ขอนแก่น', lyr: 'radar_kkn', wms: this.radar_kkn, type: 'overlay', 'isChecked': false },
                { name: 'ข้อมูลเรดาร์น้ำฝน(ทุกๆ 10นาที)', lyr: 'gs_tmd', wms: this.gs_tmd, type: 'overlay', 'isChecked': false },
                { name: 'ฝนรายชั่วโมง(มิลลิเมตร)', lyr: 'tmdrainfall', wms: this.tmdrainfall.addTo(this.map), type: 'overlay', 'isChecked': true },
                { name: 'ฝนสะสมย้อนหลัง 7 วัน(มิลลิเมตร)', lyr: 'rainfall7day', wms: this.rainfall7day, type: 'overlay', 'isChecked': false },
                { name: 'หมู่บ้าน', lyr: 'ud_vill', wms: this.ud_vill, type: 'overlay', 'isChecked': false },
                { name: 'แผนที่ถนน', lyr: 'roads', wms: this.roads, type: 'base', 'isChecked': false },
                { name: 'แผนที่ภาพดาวเทียม', lyr: 'satellite', wms: this.satellite, type: 'base', 'isChecked': false },
                { name: 'แผนที่ผสม', lyr: 'hybrid', wms: this.hybrid, type: 'base', 'isChecked': false },
                { name: 'แผนที่ภูมิประเทศ', lyr: 'terrain', wms: this.terrain.addTo(this.map), type: 'base', 'isChecked': true },
            ]
        };
        // L.control.layers(baseLayers, overlay, { position: 'topright' }).addTo(this.map);
    };
    HomePage.prototype.showLocation = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.geolocation.getCurrentPosition().then(function (res) {
            _this.pos = [res.coords.latitude, res.coords.longitude];
            _this.lat = res.coords.latitude;
            _this.lon = res.coords.longitude;
            _this.reportProvider.setLocation(_this.lat, _this.lon);
            _this.map.setView(_this.pos, 16);
            _this.marker = __WEBPACK_IMPORTED_MODULE_2_leaflet__["marker"](_this.pos, { draggable: false }).addTo(_this.map);
            loading.dismiss();
            _this.marker.on("dragend", function (e) {
                this.pos = [e.target._latlng.lat, e.target._latlng.lng];
            });
        }).catch(function (error) {
            console.log('Error getting location', error);
        });
        var watch = this.geolocation.watchPosition();
        watch.subscribe(function (res) {
            _this.pos = [res.coords.latitude, res.coords.longitude];
            _this.lat = res.coords.latitude;
            _this.lon = res.coords.longitude;
            _this.reportProvider.setLocation(_this.lat, _this.lon);
        });
    };
    HomePage.prototype.gotoReport = function () {
        if (this.lat === 0 || this.lon === 0) {
            var alert_1 = this.alertCtrl.create({
                title: 'ระบุตำแหน่งของท่าน',
                subTitle: 'ไม่พบตำแหน่งของท่าน โปรดกลับไประบุตำแหน่งของท่านก่อนรายงานสถานการณ์',
                buttons: ['ตกลง']
            });
            alert_1.present();
        }
        else {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__report_report__["a" /* ReportPage */], {
                pos: this.pos
            });
        }
    };
    HomePage.prototype.selectLayers = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_7__layer_layer__["a" /* LayerPage */], this.lyrGroup);
        modal.present();
        modal.onDidDismiss(function (res) {
            _this.lyrGroup.lyr = res;
            console.log(res);
            _this.lyrFn(res);
        });
    };
    HomePage.prototype.lyrFn = function (lyrs) {
        for (var _i = 0, lyrs_1 = lyrs; _i < lyrs_1.length; _i++) {
            var i = lyrs_1[_i];
            if (i.isChecked) {
                this.map.addLayer(i.wms);
            }
            else {
                this.map.removeLayer(i.wms);
            }
        }
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\_dev_prod\landslide_app\src\pages\home\home.html"*/'<!--<ion-header class="kanit">\n\n  <ion-navbar transparent>\n\n    <ion-title> </ion-title>\n\n  </ion-navbar>\n\n</ion-header>-->\n\n\n\n<ion-content class="kanit">\n\n  <div id="map" class="map">\n\n    <div>\n\n\n\n      <button ion-fab color="light" id="feb" (click)="showLocation()" style="bottom: 50%">\n\n        <ion-icon name="locate"></ion-icon>\n\n      </button>\n\n\n\n      <button ion-fab color="light" id="feb" (click)="selectLayers()" style="bottom: 40%">\n\n        <ion-icon name="logo-buffer"></ion-icon>\n\n      </button>\n\n\n\n      <button ion-fab color="light" id="feb" (click)="gotoReport()" style="bottom: 30%">\n\n        <ion-icon name="create"></ion-icon>\n\n      </button>\n\n\n\n    </div>\n\n  </div>\n\n\n\n</ion-content>'/*ion-inline-end:"C:\_dev_prod\landslide_app\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_6__providers_report_report__["a" /* ReportProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 333:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(334);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(354);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 354:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(411);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_about_about__ = __webpack_require__(412);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_contact_contact__ = __webpack_require__(330);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(331);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_tabs_tabs__ = __webpack_require__(329);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_status_bar__ = __webpack_require__(327);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_splash_screen__ = __webpack_require__(328);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_report_report__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_detail_detail__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_list_list__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_report_report__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__angular_common_http__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_geolocation__ = __webpack_require__(332);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_camera__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_layer_layer__ = __webpack_require__(103);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_contact_contact__["a" /* ContactPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_detail_detail__["a" /* DetailPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_report_report__["a" /* ReportPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_layer_layer__["a" /* LayerPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_14__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/detail/detail.module#DetailPageModule', name: 'DetailPage', segment: 'detail', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/layer/layer.module#LayerPageModule', name: 'LayerPage', segment: 'layer', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/list/list.module#ListPageModule', name: 'ListPage', segment: 'list', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/report/report.module#ReportPageModule', name: 'ReportPage', segment: 'report', priority: 'low', defaultHistory: [] }
                    ]
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_contact_contact__["a" /* ContactPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_detail_detail__["a" /* DetailPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_report_report__["a" /* ReportPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_layer_layer__["a" /* LayerPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_15__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_16__ionic_native_camera__["a" /* Camera */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_10__providers_report_report__["a" /* ReportProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 385:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 163,
	"./af.js": 163,
	"./ar": 164,
	"./ar-dz": 165,
	"./ar-dz.js": 165,
	"./ar-kw": 166,
	"./ar-kw.js": 166,
	"./ar-ly": 167,
	"./ar-ly.js": 167,
	"./ar-ma": 168,
	"./ar-ma.js": 168,
	"./ar-sa": 169,
	"./ar-sa.js": 169,
	"./ar-tn": 170,
	"./ar-tn.js": 170,
	"./ar.js": 164,
	"./az": 171,
	"./az.js": 171,
	"./be": 172,
	"./be.js": 172,
	"./bg": 173,
	"./bg.js": 173,
	"./bm": 174,
	"./bm.js": 174,
	"./bn": 175,
	"./bn.js": 175,
	"./bo": 176,
	"./bo.js": 176,
	"./br": 177,
	"./br.js": 177,
	"./bs": 178,
	"./bs.js": 178,
	"./ca": 179,
	"./ca.js": 179,
	"./cs": 180,
	"./cs.js": 180,
	"./cv": 181,
	"./cv.js": 181,
	"./cy": 182,
	"./cy.js": 182,
	"./da": 183,
	"./da.js": 183,
	"./de": 184,
	"./de-at": 185,
	"./de-at.js": 185,
	"./de-ch": 186,
	"./de-ch.js": 186,
	"./de.js": 184,
	"./dv": 187,
	"./dv.js": 187,
	"./el": 188,
	"./el.js": 188,
	"./en-au": 189,
	"./en-au.js": 189,
	"./en-ca": 190,
	"./en-ca.js": 190,
	"./en-gb": 191,
	"./en-gb.js": 191,
	"./en-ie": 192,
	"./en-ie.js": 192,
	"./en-il": 193,
	"./en-il.js": 193,
	"./en-nz": 194,
	"./en-nz.js": 194,
	"./eo": 195,
	"./eo.js": 195,
	"./es": 196,
	"./es-do": 197,
	"./es-do.js": 197,
	"./es-us": 198,
	"./es-us.js": 198,
	"./es.js": 196,
	"./et": 199,
	"./et.js": 199,
	"./eu": 200,
	"./eu.js": 200,
	"./fa": 201,
	"./fa.js": 201,
	"./fi": 202,
	"./fi.js": 202,
	"./fo": 203,
	"./fo.js": 203,
	"./fr": 204,
	"./fr-ca": 205,
	"./fr-ca.js": 205,
	"./fr-ch": 206,
	"./fr-ch.js": 206,
	"./fr.js": 204,
	"./fy": 207,
	"./fy.js": 207,
	"./gd": 208,
	"./gd.js": 208,
	"./gl": 209,
	"./gl.js": 209,
	"./gom-latn": 210,
	"./gom-latn.js": 210,
	"./gu": 211,
	"./gu.js": 211,
	"./he": 212,
	"./he.js": 212,
	"./hi": 213,
	"./hi.js": 213,
	"./hr": 214,
	"./hr.js": 214,
	"./hu": 215,
	"./hu.js": 215,
	"./hy-am": 216,
	"./hy-am.js": 216,
	"./id": 217,
	"./id.js": 217,
	"./is": 218,
	"./is.js": 218,
	"./it": 219,
	"./it.js": 219,
	"./ja": 220,
	"./ja.js": 220,
	"./jv": 221,
	"./jv.js": 221,
	"./ka": 222,
	"./ka.js": 222,
	"./kk": 223,
	"./kk.js": 223,
	"./km": 224,
	"./km.js": 224,
	"./kn": 225,
	"./kn.js": 225,
	"./ko": 226,
	"./ko.js": 226,
	"./ky": 227,
	"./ky.js": 227,
	"./lb": 228,
	"./lb.js": 228,
	"./lo": 229,
	"./lo.js": 229,
	"./lt": 230,
	"./lt.js": 230,
	"./lv": 231,
	"./lv.js": 231,
	"./me": 232,
	"./me.js": 232,
	"./mi": 233,
	"./mi.js": 233,
	"./mk": 234,
	"./mk.js": 234,
	"./ml": 235,
	"./ml.js": 235,
	"./mn": 236,
	"./mn.js": 236,
	"./mr": 237,
	"./mr.js": 237,
	"./ms": 238,
	"./ms-my": 239,
	"./ms-my.js": 239,
	"./ms.js": 238,
	"./mt": 240,
	"./mt.js": 240,
	"./my": 241,
	"./my.js": 241,
	"./nb": 242,
	"./nb.js": 242,
	"./ne": 243,
	"./ne.js": 243,
	"./nl": 244,
	"./nl-be": 245,
	"./nl-be.js": 245,
	"./nl.js": 244,
	"./nn": 246,
	"./nn.js": 246,
	"./pa-in": 247,
	"./pa-in.js": 247,
	"./pl": 248,
	"./pl.js": 248,
	"./pt": 249,
	"./pt-br": 250,
	"./pt-br.js": 250,
	"./pt.js": 249,
	"./ro": 251,
	"./ro.js": 251,
	"./ru": 252,
	"./ru.js": 252,
	"./sd": 253,
	"./sd.js": 253,
	"./se": 254,
	"./se.js": 254,
	"./si": 255,
	"./si.js": 255,
	"./sk": 256,
	"./sk.js": 256,
	"./sl": 257,
	"./sl.js": 257,
	"./sq": 258,
	"./sq.js": 258,
	"./sr": 259,
	"./sr-cyrl": 260,
	"./sr-cyrl.js": 260,
	"./sr.js": 259,
	"./ss": 261,
	"./ss.js": 261,
	"./sv": 262,
	"./sv.js": 262,
	"./sw": 263,
	"./sw.js": 263,
	"./ta": 264,
	"./ta.js": 264,
	"./te": 265,
	"./te.js": 265,
	"./tet": 266,
	"./tet.js": 266,
	"./tg": 267,
	"./tg.js": 267,
	"./th": 268,
	"./th.js": 268,
	"./tl-ph": 269,
	"./tl-ph.js": 269,
	"./tlh": 270,
	"./tlh.js": 270,
	"./tr": 271,
	"./tr.js": 271,
	"./tzl": 272,
	"./tzl.js": 272,
	"./tzm": 273,
	"./tzm-latn": 274,
	"./tzm-latn.js": 274,
	"./tzm.js": 273,
	"./ug-cn": 275,
	"./ug-cn.js": 275,
	"./uk": 276,
	"./uk.js": 276,
	"./ur": 277,
	"./ur.js": 277,
	"./uz": 278,
	"./uz-latn": 279,
	"./uz-latn.js": 279,
	"./uz.js": 278,
	"./vi": 280,
	"./vi.js": 280,
	"./x-pseudo": 281,
	"./x-pseudo.js": 281,
	"./yo": 282,
	"./yo.js": 282,
	"./zh-cn": 283,
	"./zh-cn.js": 283,
	"./zh-hk": 284,
	"./zh-hk.js": 284,
	"./zh-tw": 285,
	"./zh-tw.js": 285
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 385;

/***/ }),

/***/ 411:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(327);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(328);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__ = __webpack_require__(329);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__["a" /* TabsPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\_dev_prod\landslide_app\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n\n'/*ion-inline-end:"C:\_dev_prod\landslide_app\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 412:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AboutPage = /** @class */ (function () {
    function AboutPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    AboutPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-about',template:/*ion-inline-start:"C:\_dev_prod\landslide_app\src\pages\about\about.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>\n\n      About\n\n    </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\_dev_prod\landslide_app\src\pages\about\about.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]])
    ], AboutPage);
    return AboutPage;
}());

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReportProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ReportProvider = /** @class */ (function () {
    function ReportProvider(http) {
        this.http = http;
        this.url = 'http://cgi.uru.ac.th/service';
        this.www3 = 'http://www3.cgistln.nu.ac.th/geoserver/lsnanbasin/ows?';
    }
    ReportProvider.prototype.getRain = function (lat, lon) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.www3 + 'service=WFS&version=1.0.0&request=GetFeature&typeName=lsnanbasin:vhex_service&CQL_FILTER=INTERSECTS(geom,POINT(' +
                lon + '%20' + lat + '))&outputFormat=application%2Fjson').subscribe(function (res) {
                resolve(res);
            }, function (error) {
                reject(error);
            });
        });
    };
    ReportProvider.prototype.getVill10Km = function (lon, lat, r) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.www3 + 'service=WFS&version=1.0.0&request=GetFeature&typeName=lsnanbasin%3Avillage_detect_final&CQL_FILTER=DWITHIN(geom,POINT(' +
                lon + ' ' + lat + '),' + r + ',meters)&outputFormat=application%2Fjson').subscribe(function (res) {
                resolve(res);
            }, function (error) {
                reject(error);
            });
        });
    };
    ReportProvider.prototype.getReportList = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.url + '/udsafe_show_report.php').subscribe(function (res) {
                resolve(res);
            }, function (error) {
                reject(error);
            });
        });
    };
    ReportProvider.prototype.postMobileReport = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.url + '/udsafe_mobile_report.php', data).subscribe(function (res) {
                resolve(res);
            }, function (error) {
                reject(error);
            });
        });
    };
    ReportProvider.prototype.setLocation = function (lat, lon) {
        this.pos = {
            lat: lat,
            lon: lon
        };
    };
    ReportProvider.prototype.getLocation = function () {
        return this.pos;
    };
    ReportProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], ReportProvider);
    return ReportProvider;
}());

//# sourceMappingURL=report.js.map

/***/ })

},[333]);
//# sourceMappingURL=main.js.map