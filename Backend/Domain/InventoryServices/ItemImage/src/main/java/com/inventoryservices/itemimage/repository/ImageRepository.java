package com.inventoryservices.itemimage.repository;

import com.inventoryservices.itemimage.model.ImageDocument;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ImageRepository extends MongoRepository<ImageDocument, String> {
    List<ImageDocument> findByItemId(String itemId);
}
