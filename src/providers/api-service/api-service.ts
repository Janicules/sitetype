import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ApiServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiServiceProvider {

  public BASE_URL;
  data: any;

  constructor(public http: Http) {
    this.BASE_URL = "http://film-matou.arredondo-m.ovh/sitetype/function_BDD/";
  }

  //Recover data from DB :
  get(php, params) {

    return new Promise(resolve => {

      var link = this.BASE_URL + php + params;

      this.http.get(link)
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
          console.log(this.data);
        }, error => {
          console.log("erreur API : " + error);
        });
    });
  }
}
