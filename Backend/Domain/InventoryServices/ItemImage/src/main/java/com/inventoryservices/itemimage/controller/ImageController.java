package com.inventoryservices.itemimage.controller;

import com.inventoryservices.itemimage.model.ImageDocument;
import com.inventoryservices.itemimage.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;

@RestController
@RequestMapping("/api/item-images")
@CrossOrigin(origins = "*")
public class ImageController {

    @Autowired
    private ImageRepository imageRepository;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadImage(@RequestParam("itemId") String itemId,
                                         @RequestParam("file") MultipartFile file) {
        try {
            ImageDocument image = new ImageDocument();
            image.setItemId(itemId);
            image.setFilename(file.getOriginalFilename());
            image.setData(Base64.getEncoder().encodeToString(file.getBytes()));
            imageRepository.save(image);
            return ResponseEntity.ok("Imagen subida exitosamente.");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error al subir la imagen.");
        }
    }

    @GetMapping("/{itemId}")
    public List<ImageDocument> getImagesByItemId(@PathVariable String itemId) {
        return imageRepository.findByItemId(itemId);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteImage(@PathVariable String id) {
        imageRepository.deleteById(id);
        return ResponseEntity.ok("Imagen eliminada correctamente.");
    }
}
