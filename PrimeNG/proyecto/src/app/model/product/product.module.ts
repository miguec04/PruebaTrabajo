import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ProductModule {

	productId: number;
	name: string;
  	productDescription: string;
	price: number;
	
	constructor() {
		this.productId = 0;
        this.name = '';
        this.productDescription = '';
        this.price = 0;
    }
}
