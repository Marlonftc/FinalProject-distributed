package com.inventory.createitem.controller;

import com.inventory.createitem.model.Item;
import com.inventory.createitem.repository.ItemRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Parameter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = "*")
@Tag(name = "Items", description = "Operations related to items")
public class ItemController {

    @Autowired
    private ItemRepository itemRepository;

    @Operation(summary = "Create a new item", description = "Creates a new inventory item in the system")
    @PostMapping
    public Item createItem(@RequestBody Item item) {
        return itemRepository.save(item);
    }

    @Operation(summary = "Get item by ID", description = "Retrieves an item by its unique ID")
    @GetMapping("/{id}")
    public Item getItemById(
            @Parameter(description = "ID of the item to retrieve", required = true)
            @PathVariable Long id) {
        return itemRepository.findById(id).orElse(null);
    }

    @Operation(summary = "Get all items", description = "Returns a list of all inventory items")
    @GetMapping
    public Iterable<Item> getAllItems() {
        return itemRepository.findAll();
    }
}
