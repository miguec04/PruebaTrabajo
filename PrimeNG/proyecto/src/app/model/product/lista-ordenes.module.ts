import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductModule } from './../../model/product/product.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ListaOrdenesModule { 

	creationDate: string;
	orderId: number;
	customerId: number;
	productId: number;
	productDescription: string;
  	total: number;
  	cantidad: number;
	deliveryAddress: string;
	products: string;
	producto: ProductModule;
	
	constructor() {
		this.creationDate			= '';
        this.orderId 				= 0;
        this.customerId 			= 0;
        this.productId 				= 0;
        this.productDescription 	= '';
        this.cantidad 				= 0;
        this.total 					= 0;
        this.deliveryAddress 		= '';
        this.products 				= '';
        this.producto 				= new ProductModule();
    }
}
