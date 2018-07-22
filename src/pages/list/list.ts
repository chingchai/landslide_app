import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ReportProvider } from '../../providers/report/report';
import { DetailPage } from '../detail/detail';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
  public reports: any;
  public rainnow: number;
  public rain7day: number;
  public rain2018: number;
  public rainAVWeek: any;
  public ls_risk: number;
  public warning: any;
  public vill10Km: any;

  public pos: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ref: ChangeDetectorRef,
    private loadingCtrl: LoadingController,
    private reportProvider: ReportProvider
  ) {
    this.pos = this.reportProvider.getLocation()
  }


  ionViewDidLoad() {
    this.loadRain(this.pos.lat, this.pos.lon)
    // this.loadVill10Km()
  }

  loadRain(lat: number, lon: number) {
    // console.log(this.pos.lat, this.pos.lon)
    this.reportProvider.getRain(lat, lon).then((res: any) => {
      let wk = 'wk' + moment().weeks()
      // console.log(res.features[0].properties)
      this.reports = res.features[0].properties;
      this.rainnow = this.reports.raincur;
      this.rain7day = this.reports.rain7day;
      this.rain2018 = this.reports.rain2018;
      this.ls_risk = this.reports.ls_risk;
      this.rainAVWeek = this.reports[wk];
      if (this.rainnow > 100 && this.ls_risk == 3) {
        this.warning = 'อพยพ'
      } else if (this.rainnow > 100 && this.ls_risk <= 2) {
        this.warning = 'เตือนภัย'
      } else if (this.rainnow <= 100 && this.ls_risk == 3) {
        this.warning = 'เฝ้าระวัง'
      } else {
        this.warning = 'เฝ้าระวัง'
      }
    }, error => {
      console.log(error)
    })
  }

  // loadVill10Km() {
  //   this.reportProvider.getVill10Km().then((res: any) => {

  //     this.vill10Km = res.features[0].properties.vill_nam_t;

  //     console.log(this.vill10Km)
  //   })
  // }

  async loadReport() {
    let loader = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Loading...',
    });

    loader.present()

    await this.reportProvider.getReportList().then((res: any) => {
      console.log(res)
      this.reports = res;
      loader.dismiss();
    }, error => {
      loader.dismiss();
    })
  }

  viewReportDetail() {
    this.navCtrl.push(DetailPage, { data: [this.pos.lat, this.pos.lon] })
    // console.log(r)
  }


}
