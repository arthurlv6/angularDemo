import { Component, OnInit, TemplateRef } from '@angular/core';
import { SuppliersService } from './suppliers.service';
import { ISupplier } from '../Models/isupplier';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { AppCommonService } from '../Shared/app-common.service';
import { SupplierAddEditComponent } from './supplier-add-edit.component';
import { HttpError } from '../Models/http-error';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {
  constructor(
    private _supplierService: SuppliersService,
    private modalService: BsModalService,
    private _appCommonServie: AppCommonService
  ) { }
  ngOnInit() {
    
    this._appCommonServie.supplierChanged.subscribe(
      s => {
        if (s.id == 0) {
          //insert to top
          this.suppliers.unshift(s);
        } else {
          Object.assign(this.supplier, s);
        }
      }
    );
    this.refreshSuppliersList();
  }

  suppliers: ISupplier[];
  errorMessage: string;
  total: number;
  currentPage: number = 1;
  searchContent: string = null;
  pageSize: number = 15;
  //modal
  modalRef: BsModalRef;
  supplier: ISupplier;
  sort: string = "";

  private refreshSuppliersList() {
    this._supplierService.getSuppliers(this.searchContent, this.sort, this.pageSize, 1)
      .subscribe(
        data => {
          this.suppliers = data;
        }, 
        err => this.errorMessage = err.errorMessage);
    this._supplierService.getTotal(this.searchContent)
    .subscribe(t => {
      this.total = t;
    }, err => {
      err => this.errorMessage = err.errorMessage;
    });
  }

  sortby(field: string) {
    if (field == this.sort) {
      field = field + "Desc";
    }
    this.sort = field;
    this.refreshSuppliersList();
  }
  addOrEdit(supplier?: ISupplier) {
    if (supplier) {
      this.supplier = supplier;
    } else {
      let supplier: ISupplier = {} as any;
      supplier.id = 0;
      this.supplier = supplier;
    }

    const initialState = {
      supplier: this.supplier,
    };
    this.modalService.show(SupplierAddEditComponent, { initialState, class: "modal-lg" })
  }
  pageChanged(event: any): void {
    this._supplierService.getSuppliers(this.searchContent, this.sort, this.pageSize, event.page).subscribe(
      data => {
        this.suppliers = data;
        this.currentPage=event.page;
      },
      err => this.errorMessage = err.errorMessage
    );
  }
  filterSupplers() {
    return this.suppliers.filter(d => d.deleted != true);
  }
  onSearchKeydown(event) {
    this.search();
  }
  search() {
    this._supplierService.getSuppliers(this.searchContent, undefined, this.pageSize, 1).subscribe(
      data => {
        this.suppliers = data;
        this.sort="";
      },
      err => this.errorMessage = err.errorMessage
    );

    this._supplierService.getTotal(this.searchContent).subscribe(
      t => {
        this.total = t;
      },
      err => this.errorMessage = err.errorMessage
    );
  }
  openModal(template: TemplateRef<any>, supplier: ISupplier, isDelete: boolean) {
    this.supplier = supplier;
    let css = 'modal-sm';
    if (!isDelete)
      css = 'modal-lg';
    this.errorMessage=undefined;
    this.modalRef = this.modalService.show(template, { class: css });
  }
  showDetail(supplier: ISupplier) {
    supplier.hidden = !supplier.hidden;
  }
  confirm(): void {
    this._supplierService.deleteSuppler(this.supplier.id).subscribe(
      t => {
        let index:number = this.suppliers.findIndex(s=>s.id===this.supplier.id);
        this.suppliers.splice(index,1);
        this.modalRef.hide();
      },
      (err:HttpError) => {
        this.errorMessage = err.friendlyMessage;
      }
    );
  }
  decline(): void {
    this.modalRef.hide();
  }
}
