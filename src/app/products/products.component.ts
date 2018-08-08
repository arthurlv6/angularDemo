import { Component, OnInit, TemplateRef } from '@angular/core';
import { ProductsService } from './products.service';
import { Product } from '../Models/Product';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { AppCommonService } from '../Shared/app-common.service';
import { HttpError } from '../Models/http-error';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers:[ProductsService],
})
export class ProductsComponent implements OnInit {

  constructor(
    private _productService: ProductsService,
    private modalService: BsModalService,
    private _appCommonService:AppCommonService,
    private router : Router,
  ) { }
  products:Product[];
  ngOnInit() {
    this._appCommonService.setupTitle("Products");
    

    this._productService.getProducts().subscribe(
      (data:Product[]) => {
        this.products=data;
      },
      (err:HttpError) => {
        this.router.navigate(["login"]);
      }
      );
  }

  //modal
  modalRef: BsModalRef;
  product:Product;
  openModal(template: TemplateRef<any>,product:Product,isDelete:boolean) {
    this.product=product;
    let css='modal-sm';
    if(!isDelete)
    css='modal-lg';
    this.modalRef = this.modalService.show(template, {class: css});
  }

  showDetail(product:Product){
    product.hidden=!product.hidden;
  }
  confirm(): void {
    this.product.hidden=true;
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }
}
