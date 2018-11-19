import { Injectable } from '@angular/core';
import domtoimage from 'dom-to-image';

/*
  Generated class for the PrintProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PrintProvider {

  constructor() {
  }

  print(componentName) {
    var node = document.getElementById(componentName);

    domtoimage.toPng(node)
    .then(function (dataUrl) {
        var popup=window.open();
          popup.document.write('<img src=' + dataUrl + '>');
          popup.document.close();
          popup.focus();
          popup.print();
          popup.close();
    })
    .catch(function (error) {
        console.error('oops, something went wrong!', error);
    });
  }
}
