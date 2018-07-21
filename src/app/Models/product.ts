import { ProductImage } from "./product-image";
import { ProductProperty } from "./product-property";
import { ISupplier } from "./isupplier";

export class Product {
    id: number;
    name: string;
    price: number;
    type?: any;
    unit?: any;
    description: string;
    seriesNumber: string;
    barCode: string;
    profile?: any;
    categoryId: number;
    showOn?: any;
    showOrder: number;
    perPay?: any;
    productCode: string;
    totalValue: number;
    deleted: boolean;
    supplierId: number;
    basicPrice: number;
    rrp: number;
    paypal: string;
    createdDate?: any;
    modifiedDate?: any;
    productCategory?: any;
    supplier: ISupplier;
    productProperties: ProductProperty[];
    productImages: ProductImage[];
    hidden:boolean;
}