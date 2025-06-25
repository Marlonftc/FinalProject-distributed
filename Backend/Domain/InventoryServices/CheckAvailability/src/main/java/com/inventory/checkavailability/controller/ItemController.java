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

    // ✅ Primero: ruta fija para verificar el estado del microservicio
    @GetMapping("/check")
    public Map<String, String> checkService() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "check-availability-service is running");
        return response;
    }

    // ✅ Segundo: ruta dinámica que se ejecuta solo si se envía un número
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
