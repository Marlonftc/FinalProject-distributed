package com.inventory.updateitem.controller;

import com.inventory.updateitem.model.Item;
import com.inventory.updateitem.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = "*")

public class ItemController {

    @Autowired
    private ItemRepository itemRepository;

    @PutMapping("/{id}")
    public ResponseEntity<?> updateItem(@PathVariable Long id, @RequestBody Item itemDetails) {
        Optional<Item> optionalItem = itemRepository.findById(id);
        if (optionalItem.isPresent()) {
            Item item = optionalItem.get();
            item.setName(itemDetails.getName());
            item.setDescription(itemDetails.getDescription());
            item.setQuantity(itemDetails.getQuantity());
            item.setPrice(itemDetails.getPrice());
            item.setType(itemDetails.getType());
            itemRepository.save(item);
            return ResponseEntity.ok(item);
        } else {
            return ResponseEntity.status(404).body("Item not found with id: " + id);
        }
    }
}
