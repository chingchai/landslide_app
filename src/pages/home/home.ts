import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController, Modal, AlertController } from 'ionic-angular';
import * as L from 'leaflet';
import 'leaflet.gridlayer.googlemutant';
import { Geolocation } from '@ionic-native/geolocation';
import { ReportPage } from '../report/report';
import { ReportProvider } from '../../providers/report/report';
import { LayerPage } from '../layer/layer';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public map: L.map;
  public marker: L.marker;
  public pos: number[];
  private lat: number = 0;
  private lon: number = 0;

  //lyrGroup
  private lyrGroup: any;
  private lyrBase: any;

  //lyrs
  private ud_prov: any;
  private ud_amp: any;
  private ud_tam: any;
  private radar_phs: any;
  private radar_cri: any;
  private radar_kkn: any;
  private radar_omk: any;
  private tmdrainfall: any;
  private ud_vill: any;
  private gs_tmd: any;
  private gdem: any;
  private flowacc: any;
  private lsrisk_mod1: any;
  private longlin_parcel_centroid: any;
  private rainfall7day: any;
  private ud_rain: any;
  private ud_hp: any;
  private roads: any;
  private satellite: any;
  private hybrid: any;
  private terrain: any;

  constructor(
    public navCtrl: NavController,
    private geolocation: Geolocation,
    public loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private reportProvider: ReportProvider,
    private alertCtrl: AlertController
  ) {

  }

  ionViewDidLoad() {
    this.loadMap();
    this.showLocation()
  }

  loadMap() {
    this.map = L.map('map', {
      center: [18.00, 100.50],
      zoom: 8,
      zoomControl: false,
      attributionControl: false,
    })

    this.roads = L.tileLayer('http://{s}.google.com/vt/lyrs=r&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });

    this.satellite = L.tileLayer('http://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });

    this.hybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=y,m&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });

    this.terrain = L.tileLayer('http://{s}.google.com/vt/lyrs=t,m&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });

    // overlay
    // Radar From TMD&NECTEC
    const imageUrl = 'http://rain.tvis.in.th/output/';
    this.radar_cri = L.imageOverlay(imageUrl + 'CRI.png', [[22.305437, 102.143387], [17.596297, 97.611690]]);
    this.radar_kkn = L.imageOverlay(imageUrl + 'KKN.png', [[18.793550, 105.026265], [14.116192, 100.541459]]);
    this.radar_phs = L.imageOverlay(imageUrl + 'PHS.png', [[19.094393, 102.475537], [14.411350, 97.983591]]);
    this.radar_omk = L.imageOverlay(imageUrl + 'OMK.png', [[19.904425, 100.770048], [15.630408, 96.114592]]);


    // Rain WPS GISTNU
    this.tmdrainfall = L.tileLayer.wms("http://www3.cgistln.nu.ac.th/geoserver/ows?", {
      layers: 'tmdservices:tmdrainfall',
      format: 'image/png',
      transparent: true,
      //CQL_FILTER: 'prov_code=53',
      zIndex: 5
    });

    this.rainfall7day = L.tileLayer.wms("http://map.nu.ac.th/gs-alr2/ows?", {
      layers: 'alrmap:rainsplinegrid',
      format: 'image/png',
      transparent: true,
      //CQL_FILTER: 'prov_code=53',
      zIndex: 5
    });

    this.gdem = L.tileLayer.wms("http://www3.cgistln.nu.ac.th/geoserver/ows?", {
      layers: 'lsnanbasin:gdem',
      format: 'image/png',
      transparent: true,
      //CQL_FILTER: 'prov_code=53',
      zIndex: 5
    });

    this.lsrisk_mod1 = L.tileLayer.wms("http://www3.cgistln.nu.ac.th/geoserver/ows?", {
      layers: 'lsnanbasin:mod1',
      format: 'image/png',
      transparent: true,
      opacity: 0.7,
      //CQL_FILTER: 'prov_code=53',
      zIndex: 5
    });

    this.flowacc = L.tileLayer.wms("http://www3.cgistln.nu.ac.th/geoserver/ows?", {
      layers: 'lsnanbasin:flowaccm',
      format: 'image/png',
      transparent: true,
      opacity: 0.5,
      //CQL_FILTER: 'prov_code=53',
      zIndex: 5
    });

    this.gs_tmd = L.tileLayer.wms("http://www3.cgistln.nu.ac.th/geoserver/ows?", {
      layers: 'lsnanbasin:tmdnectec',
      format: 'image/png',
      transparent: true,
      //opacity: 0.5,
      //CQL_FILTER: 'prov_code=53',
      zIndex: 5
    });

    this.ud_prov = L.tileLayer.wms("http://www3.cgistln.nu.ac.th/geoserver/ows?", {
      layers: 'gistdata:province',
      format: 'image/png',
      transparent: true,
      //CQL_FILTER: 'prov_code=53',
      zIndex: 5
    });

    this.ud_amp = L.tileLayer.wms("http://www3.cgistln.nu.ac.th/geoserver/ows?", {
      layers: 'gistdata:amphoe',
      format: 'image/png',
      transparent: true,
      //CQL_FILTER: 'prov_code=53',
      zIndex: 4
    });

    this.ud_tam = L.tileLayer.wms("http://www3.cgistln.nu.ac.th/geoserver/ows?", {
      layers: 'gistdata:tambon',
      format: 'image/png',
      transparent: true,
      //CQL_FILTER: 'prov_code=53',
      zIndex: 3
    });

    this.ud_vill = L.tileLayer.wms("http://www3.cgistln.nu.ac.th/geoserver/ows?", {
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
    }

    // L.control.layers(baseLayers, overlay, { position: 'topright' }).addTo(this.map);

  }

  showLocation() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.geolocation.getCurrentPosition().then((res) => {
      this.pos = [res.coords.latitude, res.coords.longitude];
      this.lat = res.coords.latitude;
      this.lon = res.coords.longitude;

      this.reportProvider.setLocation(this.lat, this.lon);

      this.map.setView(this.pos, 16);
      this.marker = L.marker(this.pos, { draggable: false }).addTo(this.map);

      loading.dismiss();
      this.marker.on("dragend", function (e) {
        this.pos = [e.target._latlng.lat, e.target._latlng.lng];
      });

    }).catch((error) => {
      console.log('Error getting location', error);
    });

    let watch = this.geolocation.watchPosition();
    watch.subscribe((res) => {
      this.pos = [res.coords.latitude, res.coords.longitude];
      this.lat = res.coords.latitude;
      this.lon = res.coords.longitude;
      this.reportProvider.setLocation(this.lat, this.lon);
    });
  }

  gotoReport() {
    if (this.lat === 0 || this.lon === 0) {
      const alert = this.alertCtrl.create({
        title: 'ระบุตำแหน่งของท่าน',
        subTitle: 'ไม่พบตำแหน่งของท่าน โปรดกลับไประบุตำแหน่งของท่านก่อนรายงานสถานการณ์',
        buttons: ['ตกลง']
      })

      alert.present()

    } else {
      this.navCtrl.push(ReportPage, {
        pos: this.pos
      })
    }
  }

  selectLayers() {
    const modal: Modal = this.modalCtrl.create(LayerPage, this.lyrGroup);
    modal.present();
    modal.onDidDismiss((res) => {
      this.lyrGroup.lyr = res
      console.log(res)
      this.lyrFn(res)
    });
  }

  lyrFn(lyrs: any) {
    for (let i of lyrs) {
      if (i.isChecked) {
        this.map.addLayer(i.wms);
      } else {
        this.map.removeLayer(i.wms);
      }
    }
  }


}
