package com.inventory.deleteitem.controller;

import com.inventory.deleteitem.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = "*")
public class ItemController {

    private final ItemService service;

    @Autowired
    public ItemController(ItemService service) {
        this.service = service;
    }

    /**
     * DELETE /api/items/{id}
     * 
     * @param id the ID of the item to delete
     * @return 204 No Content if deleted, or 404 Not Found if not present
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        boolean deleted = service.deleteItem(id);
        if (deleted) {
            // se eliminó correctamente, no devolvemos contenido
            return ResponseEntity.noContent().build();
        } else {
            // no existía ese ID
            return ResponseEntity.notFound().build();
        }
    }
}
