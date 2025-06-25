package com.inventory.checkavailability.repository;

import com.inventory.checkavailability.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long> {
}
