package com.inventory.checkavailability.controller;

import com.inventory.checkavailability.model.Item;
import com.inventory.checkavailability.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/availability")
@CrossOrigin(origins = "*")
public class ItemController {

    @Autowired
    private ItemRepository itemRepository;

   // First: fixed route to check the status of the microservice
    @GetMapping("/check")
    public Map<String, String> checkService() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "check-availability-service is running");
        return response;
    }

    // Second: dynamic route that runs only if a number is sent
    @GetMapping("/{id}")
    public String checkAvailability(@PathVariable("id") Long id) {
        Optional<Item> item = itemRepository.findById(id);
        if (item.isPresent()) {
            int cantidad = item.get().getQuantity();
            return cantidad > 0 ? "Disponible: " + cantidad + " unidad(es)" : "No disponible";
        } else {
            return "Item no encontrado";
        }
    }
}
