package com.example.demo.services;

import com.example.demo.dtos.ListaOrdenesDto;
import com.example.demo.dtos.ProductsDto;
import java.util.List;

import com.example.demo.entities.Customer;
import com.example.demo.entities.Order;
import com.example.demo.repositories.CustomerRepository;
import com.example.demo.repositories.OrderRepository;
import java.util.ArrayList;
import java.util.Date;
import javax.persistence.EntityManager;
import javax.persistence.Persistence;
import javax.persistence.PersistenceContext;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {

    @PersistenceContext
    private EntityManager em;
    private final CustomerRepository customerRepository;
    //private final OrderRepository orderRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
        //, OrderRepository orderRepository
        //this.orderRepository = orderRepository;
    }

    public List<Customer> getAll() {
        return this.customerRepository.findAll();
    }
    
    public List<ProductsDto> getProductos(Integer customer) {
        List<ProductsDto> lista = new ArrayList<>();
        StringBuilder sql = new StringBuilder();
        sql.append(" select p.product_id,p.price,p.product_description,p.name ");
        sql.append(" from customer_product o ");
        sql.append(" inner JOIN product p on ");
        sql.append(" p.product_id = o.product_id ");
        
        sql.append(" where o.customer_id = ").append(customer);
        sql.append(" group by o.product_id ");
        
         List<Object[]> listaT = this.em.createNativeQuery(sql.toString()).getResultList();
        for(Object[] obj: listaT) {
            ProductsDto dto = new ProductsDto();
            dto.setProductId((Integer) obj[0]);
            dto.setPrice((Double) obj[1]);
            dto.setProductDescription((String) obj[2]);
            dto.setName((String) obj[3]);
            lista.add(dto);
        }
        
        return lista;
    }
    
    public List<ListaOrdenesDto> getListaOrdenes(int tercero, String mesActual, String year) {
        List<ListaOrdenesDto> lista = new ArrayList<ListaOrdenesDto>();
        StringBuilder sql = new StringBuilder();
        sql.append(" select o.creation_date as creationDate, o.order_id as orderId, o.total, o.delivery_address as deliveryAddress, group_concat(' ',p.name) as products ");
        sql.append(" from `order` o ");
        sql.append(" inner JOIN order_detail od on ");
        sql.append(" od.order_id = o.order_id ");
        sql.append(" inner join product p on ");
        sql.append(" p.product_id = od.product_id ");
        sql.append(" where o.customer_id = ").append(tercero);
        sql.append(" AND MONTH(o.creation_date) = ").append(mesActual);
        sql.append(" AND YEAR(o.creation_date) = ").append(year);
        sql.append(" group by o.order_id ");

        List<Object[]> listaT = this.em.createNativeQuery(sql.toString()).getResultList();
        for(Object[] obj: listaT) {
            ListaOrdenesDto dto = new ListaOrdenesDto();
            dto.setCreationDate(obj[0].toString());
            dto.setOrderId((Integer) obj[1]);
            dto.setTotal((Double) obj[2]);
            dto.setDeliveryAddress((String) obj[3]);
            dto.setProducts((String) obj[4]);
            lista.add(dto);
        }
        //this.em.clear();
        return lista;
    }
}
