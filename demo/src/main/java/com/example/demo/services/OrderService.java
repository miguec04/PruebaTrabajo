/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.demo.services;

import com.example.demo.dtos.ListaOrdenesDto;
import com.example.demo.entities.Order;
import com.example.demo.repositories.CustomerRepository;
import com.example.demo.repositories.OrderRepository;
import java.sql.Date;
import java.util.List;
import java.util.Map;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class OrderService {
    
    @PersistenceContext
    private EntityManager em;
    private final OrderRepository orderRepository;
    //private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }
    
    @Transactional
    public void save(Object[] obj) {
        Order orden = new Order();
        Map<String,Object> mapa = (Map<String,Object>) obj[1];
        orden.setCustomerId((Integer) mapa.get("customerId"));
        orden.setDeliveryAddress((String) mapa.get("deliveryAddress"));
        orden.setTotal(Double.parseDouble(mapa.get("total")+""));
        orden.setCreationDate(new Date((new java.util.Date()).getTime()));
        this.orderRepository.save(orden);
        this.orderRepository.flush();
        
        List<Object> lista = (List<Object>) obj[0];
        for(Object l: lista) {
            mapa = (Map<String, Object>) l;
            String sql = "insert into order_detail values (null,"+orden.getOrderId()+","+mapa.get("productId")+",'"+mapa.get("productDescription")+"','"+mapa.get("total")+"','"+mapa.get("cantidad")+"') ";
            this.em.createNativeQuery(sql).executeUpdate();
        }
        this.em.flush();
        

    }
}
