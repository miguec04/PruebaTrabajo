import { Component, OnInit } from '@angular/core';
import { ProductModule } from './../../model/product/product.module';
import { CustomerModule } from './../../model/customer/customer.module';
import { ListaOrdenesModule } from './../../model/product/lista-ordenes.module';
import { ProductService	 } from './../../service/product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  private listaProductos: ProductModule[]		= [];
  private objeto: CustomerModule;
  public direccion: string 						= '';
  public total: number							= 0;
  public agregaProducto: number;
  public valorProducto: number					= 0;
  public cantidadProducto: number				= 0;
  
  public lista: ProductModule[]					= [];
  public listaCustomer: CustomerModule[]		= [];
  public listaFacturas: ListaOrdenesModule[]	= [];
  
  public listaOrden: ListaOrdenesModule[]		= [];
  
  public verConsulta: boolean 					= false;
  public verEditor: boolean 					= false;
 
  constructor(private productService: ProductService) {
  
    this.agregaProducto		= 0;
  	this.objeto				= this.productService.getCustomerNew();
  	this.lista				= this.getLista();
  	
  	this.setInicio();
  }
  
  ngOnInit(): void {
    var lista1: Observable<any> = this.productService.getListaCustomers();
    lista1.subscribe( data => {
  		this.listaCustomer = data;
  	});
  }
  
  public getListaProductos(): ProductModule[] {
  	return this.listaProductos;
  }
  
  public setInicio(): void {
  	this.setOcultar();
  	this.verConsulta = true;
  }
  
  public setGuardar(): void {
    var obj: ListaOrdenesModule 	= new ListaOrdenesModule();
    obj.customerId					= this.objeto.customerId;
    obj.deliveryAddress				= this.direccion;
    obj.total						= this.total;
  	this.productService.setGuardaOrden(this.listaOrden, obj).subscribe( data => {
  		if(data) {
  			console.log('todo correcto');
  		}
  	});
  	//this.lista					= this.getLista();
  	//this.listaCustomer			= this.productService.getListaCustomers();
  	this.setInicio();
  }
  
  public setAgregar(): void {
  	var obj: ListaOrdenesModule = new ListaOrdenesModule();
  	console.log(this.agregaProducto);
	for (let i = 0; i < this.listaProductos.length; i++) {
	  if(this.listaProductos[i].productId == this.agregaProducto) {
	  	obj.producto = this.listaProductos[i];
	  	break;
	  }
	}
	
	obj.productId 				= obj.producto.productId;
	obj.productDescription 		= obj.producto.productDescription;
  	
  	obj.total 					= this.valorProducto;
  	obj.cantidad 				= this.cantidadProducto;
  	this.total					+= this.valorProducto*this.cantidadProducto;
  	this.listaOrden.push(obj);
  	
  	this.valorProducto 			= 0;
  	this.cantidadProducto 		= 0;
  }
  
  private setOcultar(): void {
  	this.verConsulta = false;
  	this.verEditor = false;
  }

  setEditar(obj: CustomerModule): void {
    this.setOcultar();
    this.listaOrden			= [];
    this.valorProducto		= 0;
    this.cantidadProducto	= 0;
    this.total				= 0;
    
    this.direccion			= '';
  	//this.listaFacturas		= this.productService.getListaFacturas();
  	var lista1: Observable<any> = this.productService.getListaFacturas(obj.customerId);
    lista1.subscribe( data => {
  		this.listaFacturas = data;
  	});
  	
  	
  	lista1					= this.productService.getListaProductos(obj.customerId);
  	lista1.subscribe( data => {
  		this.listaProductos = data;
  	});
  	
  	
  	this.objeto 			= obj;
  	this.verEditor 			= true;
  }
  
  search() {
    console.log('busqueda');
  }
  
  getLista(): ProductModule[] {
  	return [
  		{
	  		productId: 1,
	        name: 'Producto 1',
	        productDescription: 'Descripcion del producto',
	        price: 20000
        },
        {
	  		productId: 2,
	        name: 'Producto 2',
	        productDescription: 'Descripcion del producto',
	        price: 20000
        }
  	];
  }  

  getObjeto(): CustomerModule {
    return this.objeto;
  }

}
