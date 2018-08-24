import { Component, OnInit } from '@angular/core';
import {  FormGroup, Validators,FormBuilder } from '@angular/forms';
import { ISupplier } from '../Models/isupplier';
import { SuppliersService } from './suppliers.service';
import { AppCommonService } from '../Shared/app-common.service';
import { BsModalRef } from 'ngx-bootstrap';
import { HttpError } from '../Models/http-error';

@Component({
  templateUrl: './supplier-add-edit.component.html',
  styleUrls: ['./supplier-add-edit.component.css']
})
export class SupplierAddEditComponent implements OnInit {

  constructor(
    private _supplierService:SuppliersService,
    private _appCommonServie:AppCommonService,
    public bsModalRef: BsModalRef,
    private _formBuilder:FormBuilder,
  ) { }
  supplierForm: FormGroup

  title:string ="supplier"; 
  message:string;
  supplier:ISupplier;

  ngOnInit() {
    this.setupFormIntial(this.supplier);
  }

  private setupFormIntial(supplier: ISupplier) {
      this.supplierForm = this._formBuilder.group(
        {
          id:supplier.id,
          name:[supplier.name,Validators.required],
          gstNumber: supplier.gstNumber,
          note: [supplier.note,Validators.maxLength(4000)],
          taxRate: supplier.taxRate,
          bankName: supplier.bankName,
          bankBranch: supplier.bankBranch,
          paymentTerm: supplier.paymentTerm,
          physicalStreetAddress: supplier.physicalStreetAddress,
          physicalSuburb: supplier.physicalSuburb,
          physicalCity: supplier.physicalCity,
          physicalState: supplier.physicalState,
          physicalCountry: supplier.physicalCountry,
          physicalPostalCode: supplier.physicalPostalCode,
          contactFirstName: supplier.contactFirstName,
          contactLastName: supplier.contactLastName,
          contactEmail: supplier.contactEmail,
          contactOfficePhone: supplier.contactOfficePhone,
          contactWebsite: supplier.contactWebsite,
          contactPhoneNumber: supplier.contactPhoneNumber,
          contactFaxNumber: supplier.contactFaxNumber,
          contactMobileNumber: supplier.contactMobileNumber,
        }
      )
  }

  saveSupplier() {
    let formValues=this.supplierForm.value;
    let supplier:ISupplier = {
      id: formValues.id,
      name: formValues.name,
      gstNumber:formValues.gstNumber,
      note: formValues.note,
      taxRate: formValues.taxRate,
      bankName: formValues.bankName,
      bankBranch: formValues.bankBranch,
      paymentTerm: formValues.paymentTerm,
      physicalStreetAddress: formValues.physicalStreetAddress,
      physicalSuburb: formValues.physicalSuburb,
      physicalCity: formValues.physicalCity,
      physicalState: formValues.physicalState,
      physicalCountry: formValues.physicalCountry,
      physicalPostalCode: formValues.physicalPostalCode,
      contactFirstName: formValues.contactFirstName,
      contactLastName: formValues.contactLastName,
      contactEmail: formValues.contactEmail,
      contactOfficePhone: formValues.contactOfficePhone,
      contactWebsite: formValues.contactWebsite,
      contactPhoneNumber: formValues.contactPhoneNumber,
      contactFaxNumber: formValues.contactFaxNumber,
      contactMobileNumber: formValues.contactMobileNumber,
    }
    if(supplier.id>0){
      this._supplierService.updateSupplier(supplier).subscribe(
        ()=>{
          this._appCommonServie.supllierChanged(supplier);
          this.bsModalRef.hide();
        },
        (e:HttpError)=>{
          this.message=e.message;
        }
      )
    }else{
      this._supplierService.addSupplier(supplier).subscribe(
        s=>{
          let newSupplier=s;
          this._appCommonServie.supllierChanged(newSupplier);
          this.bsModalRef.hide();
        },
        (e:HttpError)=>{
          this.message=e.message;
        }
      )
    }
  }
}
