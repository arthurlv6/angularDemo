import { Component, OnInit, ViewChild } from '@angular/core';
import { TreeviewItem, TreeviewConfig, DownlineTreeviewItem, TreeviewHelper, TreeviewComponent } from 'ngx-treeview';
import { isNil, remove, reverse } from 'lodash';
import { SettingsService } from '../settings.service';
import { ICategory } from '../../Models/ICategory';
import { IidValue } from '../../Models/IIdValue';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(
    private _settingService:SettingsService,
  ) { }
  
  @ViewChild(TreeviewComponent) treeviewComponent: TreeviewComponent;
  config = TreeviewConfig.create({
    hasAllCheckBox: false,
    hasFilter: false,
    hasCollapseExpand: false,
    decoupleChildFromParent: true,

  });
  items: TreeviewItem[]=[];
  rows: string[];
  categories:ICategory[];
  message:string;
  temporary:TreeviewItem;

  ngOnInit() {
    this.temporary=new TreeviewItem({value:1,text:"temporary"});
    this._settingService.getCategories().subscribe(
      data => {
        this.categories=data as ICategory[];
        this.createTreeviewItems(this.categories);

        console.info(this.categories);
      }, 
      err => this.message = err.friendlyMessage);
  }
  //#region  treeview
  createTreeviewItems(categories:ICategory[]){
    var subCategories=this.categories.filter(d=>d.parentId==null);
    subCategories.forEach(element => {
      var parent = new TreeviewItem({
        text: element.name, value: element.id,
      });
      this.createNodeTreeviewItem(parent);
      this.items.push(parent);
    });
  }


  createNodeTreeviewItem(parent:TreeviewItem):TreeviewItem{
    var subCategories=this.categories.filter(d=>d.parentId==parent.value);
    subCategories.forEach(element => {
      var subparent=new TreeviewItem({
        text:element.name,
        value:element.id,
        //children:[new TreeviewItem({value:1,text:"temporary"})]
      });
      if(parent.children===undefined)
      {
        parent.children=[this.createNodeTreeviewItem(subparent)];
      }else{
        parent.children.push(this.createNodeTreeviewItem(subparent));
      }
    });
    return parent;
  }

  removeItem(item: TreeviewItem) {
    let isRemoved = false;
    for (const tmpItem of this.items) {
      if (tmpItem === item) {
        remove(this.items, item);
      } else {
        isRemoved = TreeviewHelper.removeItem(tmpItem, item);
        if (isRemoved) {
          break;
        }
      }
    }

    if (isRemoved) {
      this.treeviewComponent.raiseSelectedChange();
    }
  }
//#endregion
  
  onKeydown(item:TreeviewItem,event: any){
    let idValue:IidValue={id:item.value,value:event.target.value };

    this._settingService.updateCategory(idValue)
    .subscribe(
      data => {
        this.message="The value was changed.";
      }, 
      err => this.message = err.friendlyMessage);
  }
  resetMessage(){
    this.message="";
  }
}
