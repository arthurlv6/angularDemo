import { Component, OnInit, Input } from '@angular/core';
import { ISupplier } from '../Models/isupplier';

@Component({
  selector: 'app-supplier-detail',
  templateUrl: './supplier-detail.component.html',
  styles: ["form-group>label:blod"]
})
export class SupplierDetailComponent implements OnInit {
  constructor() { }
  ngOnInit() {
    
  }
  //supplierVariable:Supplier;
  @Input() supplier:ISupplier;
}
