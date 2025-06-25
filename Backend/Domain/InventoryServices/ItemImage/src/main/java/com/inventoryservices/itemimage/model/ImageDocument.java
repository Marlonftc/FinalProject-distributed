package com.inventoryservices.itemimage.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "images")
public class ImageDocument {

    @Id
    private String id;

    private String itemId;
    private String filename;
    private String data;

    // Getters y Setters
    public String getId() { return id; }

    public void setId(String id) { this.id = id; }

    public String getItemId() { return itemId; }

    public void setItemId(String itemId) { this.itemId = itemId; }

    public String getFilename() { return filename; }

    public void setFilename(String filename) { this.filename = filename; }

    public String getData() { return data; }

    public void setData(String data) { this.data = data; }
}
