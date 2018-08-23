import { BsModalService } from "ngx-bootstrap";
import { AppCommonService } from "./app-common.service";
import { Injector } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";

export class BaseComponent {
    _modalService: BsModalService;
    _appCommonServie: AppCommonService
    _spinner: NgxSpinnerService
    constructor(private injectorObj: Injector) 
    { 
        this._modalService=this.injectorObj.get(BsModalService);
        this._appCommonServie=this.injectorObj.get(AppCommonService);
        this._spinner=this.injectorObj.get(NgxSpinnerService);
    }
}
