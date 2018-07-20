import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { resolveDefinition } from '@angular/core/src/view/util';


@Injectable()
export class ReportProvider {
  private url: string = 'http://cgi.uru.ac.th/service';
  private www3: string = 'http://www3.cgistln.nu.ac.th/geoserver/lsnanbasin/ows?';
  private pos: any;

  constructor(
    public http: HttpClient
  ) {
  }

  getRain() {
    return new Promise((resolve, reject) => {
      this.http.get(this.www3 + 'service=WFS&version=1.0.0&request=GetFeature&typeName=lsnanbasin:vhex_service&CQL_FILTER=INTERSECTS(geom,POINT(' +
        '100.95304%2019.01781))&outputFormat=application%2Fjson').subscribe((res: any) => {
          resolve(res)
        }, (error) => {
          reject(error)
        })
    })
  }

  getReportList() {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + '/udsafe_show_report.php').subscribe((res: any) => {
        resolve(res)
      }, (error) => {
        reject(error)
      })
    })
  }

  postMobileReport(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.url + '/udsafe_mobile_report.php', data).subscribe((res: any) => {
        resolve(res)
      }, (error) => {
        reject(error)
      })
    })
  }

  setLocation(lat: number, lon: number) {
    this.pos = {
      lat: lat,
      lon: lon
    }
  }

  getLocation() {
    return this.pos
  }



}
