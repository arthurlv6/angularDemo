import { Component, OnInit } from '@angular/core';
import { SettingsService } from './settings.service';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ICompany } from '../Models/ICompany';
import { HttpError } from '../Models/http-error';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  constructor(
    private _settingService:SettingsService,
    private _formBuilder:FormBuilder,
  ) { }
  companyForm:FormGroup;
  message:string;
  errorMessage:string;
  ngOnInit() {
    this._settingService.getCompany().subscribe(
      data => {
        data= data as ICompany;
        console.info(data.id);
        console.info(data.name)
        this.companyForm=this._formBuilder.group(
          {
            id: data.id,
            name: [data.name,Validators.required],
            tradingName: data.tradingName,
            industry: data.industry,
            organisationType: data.organisationType,
            gst: data.gst,
            website: data.website,
            timezone: data.timezone,
            logo: data.logo,
            address: data.address,
            suburb: data.suburb,
            city: data.city,
            state: data.state,
            country: data.country,
            postCode: data.postCode,
            firstName: data.firstName,
            lastName: data.lastName,
            officePhone: data.officePhone,
            mobileNumber: data.mobileNumber,
            email: data.email,
            note: data.note,
            validDate: data.validDate,
            initialized: data.initialized,
          })
      }, 
      err => this.errorMessage = err.errorMessage
    );
  }
  saveCompany() {
    let formValues=this.companyForm.value;
    let company:ICompany = {
      id: formValues.id,
      name: formValues.name,
      tradingName: formValues.tradingName,
      industry: formValues.industry,
      organisationType: formValues.organisationType,
      gst: formValues.gst,
      website: formValues.website,
      timezone: formValues.timezone,
      logo: formValues.logo,
      address: formValues.address,
      suburb: formValues.suburb,
      city: formValues.city,
      state: formValues.state,
      country: formValues.country,
      postCode: formValues.postCode,
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      officePhone: formValues.officePhone,
      mobileNumber: formValues.mobileNumber,
      email: formValues.email,
      note: formValues.note,
      validDate: formValues.validDate,
      initialized: formValues.initialized,
    }
      this._settingService.updateCompany(company).subscribe(
        ()=>{
          this.message="Succeed";
        },
        (e:HttpError)=>{
          this.message=e.message;
        }
      )
  }
}
