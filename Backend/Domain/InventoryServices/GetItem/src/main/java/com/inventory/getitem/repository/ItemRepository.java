package com.inventory.getitem.repository;

import com.inventory.getitem.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long> {
}
