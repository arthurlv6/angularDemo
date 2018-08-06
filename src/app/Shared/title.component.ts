import { Component, OnInit } from '@angular/core';
import { AppCommonService } from './app-common.service';

@Component({
  selector: 'app-title',
  template: `
  {{title}}
  `,
  styles: []
})
export class TitleComponent implements OnInit {

  constructor(private _appCommonService: AppCommonService) { }

  ngOnInit() {
    this._appCommonService.change.subscribe(title => {
      this.title=title;
    });
  }
  title :string;
}
