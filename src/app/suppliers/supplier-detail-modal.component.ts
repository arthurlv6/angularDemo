import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ISupplier } from '../Models/isupplier';
@Component({
  selector: 'app-supplier-detail-modal',
  templateUrl:'./supplier-detail-modal.component.html',
  styles: []
})
export class SupplierDetailModalComponent implements OnInit {
  supplier:ISupplier;
  title:string="Supplier detail";
  constructor(public bsModalRef: BsModalRef) { }
  ngOnInit() {
  }
}
