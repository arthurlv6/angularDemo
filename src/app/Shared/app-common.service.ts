import { Injectable, Output, EventEmitter } from '@angular/core';
import { ISupplier } from '../Models/isupplier';

@Injectable({
  providedIn: 'root'
})
export class AppCommonService {

  constructor() { }
  setupTitle(titleName:string)
  {
    this.change.emit(titleName);
  }
  @Output() change: EventEmitter<string> = new EventEmitter();

  supllierChanged(supplier:ISupplier)
  {
    this.supplierChanged.emit(supplier);
  }
  @Output() supplierChanged: EventEmitter<ISupplier> = new EventEmitter();
}
