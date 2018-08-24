import { Component, OnInit, TemplateRef, Injector } from '@angular/core';
import { SuppliersService } from './suppliers.service';
import { ISupplier } from '../Models/isupplier';
import { BsModalRef } from 'ngx-bootstrap';
import { SupplierAddEditComponent } from './supplier-add-edit.component';
import { HttpError } from '../Models/http-error';
import { Store, select } from '@ngrx/store';
import * as fromCommonState  from '../Shared/state/common.reducer';
import * as fromCommonActions from '../Shared/state/common.actions';
import { BaseComponent } from '../Shared/base-component';
@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent extends BaseComponent implements OnInit {
  constructor(
    private _supplierService: SuppliersService,
    private _store:Store<fromCommonState.CommonState>, 
    private injector: Injector,
    
    ) {
    super(injector);
  }
  ngOnInit() {
    this._appCommonServie.supplierChanged.subscribe(
      s => {
        if (s.modifiedDate == null) {
          //insert to top
          this.suppliers.unshift(s);
        } else {
          Object.assign(this.supplier, s);
        }
      }
    );
    this._store.pipe(select(fromCommonState.getSupplierSelector)).subscribe(
      state=>{
        
        if(state){
          this.searchContent=state.searchWords;
          if(state.sortByField){
            if(state.sortByField.ascending){
              this.sort=state.sortByField.name;
            }else{
              this.sort=state.sortByField.name+"Desc";
            }
          }
          this.currentPage=state.pageNumber==0?1:state.pageNumber;
        }
        this.refreshSuppliersList();
      }
    );
  }

  suppliers: ISupplier[];
  errorMessage: string;
  total: number;
  currentPage: number = 1;
  searchContent: string = null;
  pageSize: number = 15;
  message:string;
  //modal
  modalRef: BsModalRef;
  supplier: ISupplier;
  sort: string = "";

  private refreshSuppliersList() {
    this._spinner.show();
    this._supplierService.getSuppliers(this.searchContent, this.sort, this.pageSize, this.currentPage)
      .subscribe(
        data => {
          this.suppliers = data;
          console.info(data);
        }, 
        err => this.errorMessage = err.errorMessage,
        ()=>{
          this._spinner.hide();
        }
      );
    this._supplierService.getTotal(this.searchContent)
    .subscribe(t => {
      this.total = t;
    }, err => {
      err => this.errorMessage = err.errorMessage;
    });
  }
  onKeydown(supplier:ISupplier,validField?:string){
    if(validField==="name"){
      if(supplier.name.length>40 || supplier.name.length<=3){
        this._notifierService.notify('error', "No changed, because the supplier name length is between 3 and 10 characters.");
        return;
      }
    }
    this._supplierService.updateSupplier(supplier).subscribe(
      ()=>{
        this._notifierService.notify('success', 'The change was saved!');
      },
      (e:HttpError)=>{
        this.message=e.message;
        this._notifierService.notify('error', e.message);
      }
    )
  }
  sortby(field: string) {
    
    let ascending:boolean=true;

    if (field == this.sort) {
      this.sort = field + "Desc";
      ascending=false;
    }else{
      this.sort = field;
    }
    
    this.refreshSuppliersList();

    this._store.dispatch( new fromCommonActions.SortAction({name:field,ascending:ascending}));
  }

  pageChanged(event: any): void {
    this.currentPage=event.page;

    this.refreshSuppliersList();

    this._store.dispatch( new fromCommonActions.PageAction(this.currentPage));
  }
  filterSupplers() {
    return this.suppliers.filter(d => d.deleted != true);
  }
  onSearchKeydown(event) {
    this.search();
  }
  search() {
    this._store.dispatch( new fromCommonActions.SearchAction(this.searchContent));
    this.sort=null;
    this.currentPage=1;
    this.refreshSuppliersList();
  }
  //#region modal
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
    this._modalService.show(SupplierAddEditComponent, { initialState, class: "modal-lg" })
  }
  openModal(template: TemplateRef<any>, supplier: ISupplier, isDelete: boolean) {
    this.supplier = supplier;
    let css = 'modal-sm';
    if (!isDelete)
      css = 'modal-lg';
    this.errorMessage=undefined;
    this.modalRef = this._modalService.show(template, { class: css });
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
  //#endregion
}
