package com.example.demo.controllers;

import com.example.demo.dtos.ListaOrdenesDto;
import com.example.demo.dtos.ProductsDto;
import java.util.List;

import com.example.demo.entities.Customer;
import com.example.demo.entities.Order;
import com.example.demo.services.CustomerService;
import com.example.demo.services.OrderService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CustomerController {

    private final CustomerService customerService;
    private final OrderService orderService;
    

    public CustomerController(CustomerService customerService,OrderService orderService) {
        this.customerService = customerService;
        this.orderService = orderService;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/productos")
    public List<ProductsDto> getProductos(@RequestParam Integer customer) {
        return this.customerService.getProductos(customer);
    }
    
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/customers")
    public List<Customer> getAll() {
        return this.customerService.getAll();
    }
    
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/ordenes")
    public List<ListaOrdenesDto> getListaOrdenes(@RequestParam Integer customer, String mesActual, String year) {
        return this.customerService.getListaOrdenes(customer,mesActual, year);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/listasguarda")
    public boolean save(@RequestBody Object[] obj) {
        try {
            
            this.orderService.save(obj);
        } catch (Exception e) {
            System.out.println(e);
            return false;
        }
        return true;
    }

}
