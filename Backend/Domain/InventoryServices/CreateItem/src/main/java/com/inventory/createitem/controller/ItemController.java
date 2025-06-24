package com.inventory.createitem.controller;

import com.inventory.createitem.model.Item;
import com.inventory.createitem.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/items")

@CrossOrigin(origins = "*")
public class ItemController {

    @Autowired
    private ItemRepository itemRepository;

    @PostMapping
    public Item createItem(@RequestBody Item item) {
        return itemRepository.save(item);
    }

    @GetMapping("/{id}")
    public Item getItemById(@PathVariable Long id) {
        return itemRepository.findById(id).orElse(null);
    }

    @GetMapping
    public Iterable<Item> getAllItems() {
        return itemRepository.findAll();
    }
}
