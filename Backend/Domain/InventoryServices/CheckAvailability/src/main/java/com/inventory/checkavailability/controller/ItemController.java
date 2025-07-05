package com.inventory.checkavailability.controller;

import com.inventory.checkavailability.model.Item;
import com.inventory.checkavailability.repository.ItemRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/availability")
@CrossOrigin(origins = "*")
@Tag(name = "Availability", description = "API for checking item availability")
public class ItemController {

    @Autowired
    private ItemRepository itemRepository;

    @Operation(summary = "Check service status", description = "Returns a simple status to verify the microservice is running.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Service is running")
    })
    @GetMapping("/check")
    public Map<String, String> checkService() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "check-availability-service is running");
        return response;
    }

    @Operation(summary = "Check item availability", description = "Returns availability info of a given item by its ID.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Availability response"),
        @ApiResponse(responseCode = "404", description = "Item not found")
    })
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
