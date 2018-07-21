import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { Product } from '../Models/Product';
import { ISupplier } from '../Models/isupplier';
import { BsModalService } from 'ngx-bootstrap/modal/bs-modal.service';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { SupplierDetailModalComponent } from '../suppliers/supplier-detail-modal.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styles: []
})
export class ProductDetailComponent implements OnInit {

  constructor(private modalService: BsModalService) { }
  @Input() product:Product;
  ngOnInit() {
  }
  //modal
  modalRef: BsModalRef;
  showDetail(supplier:ISupplier){
    //let aproduct=product;
    const initialState = {
      supplier:supplier,
    };
    this.modalService.show(SupplierDetailModalComponent,{initialState})
  }
  imagePath:string;
  showOrginalImage(template: TemplateRef<any>,image:string){
    this.imagePath=image;
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
  }
}
