import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CustomerModule {

	customerId: number;
	name: string;
  	email: string;
	
	constructor() {
		this.customerId = 0;
        this.name = '';
        this.email = '';
    }
 }