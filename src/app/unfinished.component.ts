import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unfinished',
  template: `
    <p>
      unfinished works!
    </p>
    <img src="https://ps.w.org/under-construction-page/assets/screenshot-10.png?rev=1840052">
  `,
  styles: []
})
export class UnfinishedComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
