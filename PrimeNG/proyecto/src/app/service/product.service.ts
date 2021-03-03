import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ProductModule } from './../model/product/product.module';
import { CustomerModule } from './../model/customer/customer.module';
import { ListaOrdenesModule } from './../model/product/lista-ordenes.module';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable()
export class ProductService {

	private url: string = "http://localhost:8080";

  	constructor(private http: HttpClient) {
  		
  	}

  	getListaProductos(id: number): Observable<any> {
  		var lista1: Observable<any> = this.http.get(this.url+'/productos/?customer='+id);
  		return lista1;
  	}
  	
  	getListaFacturas(id: number): Observable<any> {
  		var f = new Date();
  		console.log(f.getMonth());
	  	var lista1: Observable<any> = this.http.get(this.url+'/ordenes/?customer='+id+'&mesActual='+(f.getMonth() +1)+'&year='+f.getFullYear());
  		return lista1;
  	}
  	
  	getListaCustomers(): Observable<any> {
  		var lista1: Observable<any> = this.http.get(this.url+'/customers');
  		return lista1;
  	}
  	
  	setGuardaOrden(list: ListaOrdenesModule[], cust: ListaOrdenesModule): Observable<any> {
  	
  		var lista1: Observable<any> = new Observable<any>();
  		try {
  			var objeto: Object[]	= [];
  			objeto[0]	= list;
  			objeto[1]	= cust;
	    	lista1 = this.http.post(this.url+'/listasguarda',objeto);
	    	
	  	} catch(e) {
		  console.log(e); 
		}
		return lista1;
	}
  	
  	getCustomerNew(): CustomerModule {
	    return {
	      	customerId: 0,
			name: '',
		  	email: ''
	    };
	}
  	
  	productNew(): ProductModule {
	    return {
	      	productId: 0,
			name: '',
		  	productDescription: '',
			price: 0
	    };
	}
}
