import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, LoadingController } from 'ionic-angular';
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
  public rainnow: any;
  public rain7day: any;
  public rain2018: any;
  public rainAVWeek: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ref: ChangeDetectorRef,
    private loadingCtrl: LoadingController,
    private reportProvider: ReportProvider
  ) {
  }


  ionViewDidLoad() {
    // this.loadReport();
    // this.content.enableScrollListener();
    this.loadRain()
  }

  loadRain() {

    this.reportProvider.getRain().then((res: any) => {
      let wk = 'wk' + moment().weeks()
      // console.log(res.features[0].properties)
      this.reports = res.features[0].properties;
      this.rainnow = this.reports.raincur;
      this.rain7day = this.reports.rain7day;
      this.rain2018 = this.reports.rain2018;

      this.rainAVWeek = this.reports[wk];
      console.log(this.rainAVWeek)
    }, error => {
      console.log(error)
    })
  }

  calWeekNumber() {
    console.log()
  }

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

  viewReportDetail(r: any) {
    this.navCtrl.push(DetailPage, { data: r })
    // console.log(r)
  }


}
