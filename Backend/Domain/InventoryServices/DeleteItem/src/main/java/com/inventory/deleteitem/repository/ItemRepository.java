package com.inventory.deleteitem.repository;

import com.inventory.deleteitem.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long> {}
