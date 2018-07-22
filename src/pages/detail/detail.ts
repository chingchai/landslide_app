import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as L from 'leaflet';
import 'leaflet.gridlayer.googlemutant';
import { ReportProvider } from '../../providers/report/report';

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  private dat: any;
  public map: L.map;
  public marker: L.marker;
  public pos: number[];

  public vill10Km: any;

  //lyrGroup
  private lyrGroup: any;

  //lyrs
  private ud_vill: any;
  private roads: any;
  private satellite: any;
  private hybrid: any;
  private terrain: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private reportProvider: ReportProvider
  ) {
    this.dat = this.navParams.get('data')
  }

  ionViewDidLoad() {
    // console.log(this.dat);
    this.loadMap();
  }

  loadMap() {
    this.map = L.map('map2', {
      center: [18.00, 100.50],
      zoom: 8,
      zoomControl: false,
      attributionControl: false,
    })
    // base map
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
    const r = 30000;
    this.ud_vill = L.tileLayer.wms("http://www3.cgistln.nu.ac.th/geoserver/ows?", {
      layers: 'lsnanbasin:village_detect_final',
      format: 'image/png',
      transparent: true,
      CQL_FILTER: 'DWITHIN(geom,Point(' + this.dat[1] + ' ' + this.dat[0] + '),' + r + ',meters)',
      zIndex: 5
    });

    this.pos = [this.dat[0], this.dat[1]];
    this.map.setView(this.pos, 16);
    this.marker = L.marker(this.pos, { draggable: false }).addTo(this.map);

    this.lyrGroup = {
      lyr: [
        { name: 'หมู่บ้าน', lyr: 'ud_vill', wms: this.ud_vill.addTo(this.map), type: 'overlay', 'isChecked': false },
        { name: 'แผนที่ถนน', lyr: 'roads', wms: this.roads, type: 'base', 'isChecked': false },
        { name: 'แผนที่ภาพดาวเทียม', lyr: 'satellite', wms: this.satellite, type: 'base', 'isChecked': false },
        { name: 'แผนที่ผสม', lyr: 'hybrid', wms: this.hybrid, type: 'base', 'isChecked': false },
        { name: 'แผนที่ภูมิประเทศ', lyr: 'terrain', wms: this.terrain.addTo(this.map), type: 'base', 'isChecked': true },
      ]
    }
    // L.control.layers(baseLayers, overlay, { position: 'topright' }).addTo(this.map);
    this.loadVill(this.dat[1], this.dat[0], r);
  }


  loadVill(lon: number, lat: number, r: number) {
    this.reportProvider.getVill10Km(lon, lat, r).then((res: any) => {
      this.vill10Km = res.features;
      console.log(this.vill10Km)
    })
  }

}


