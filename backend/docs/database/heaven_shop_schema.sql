-- -----------------------------------------------------
-- Schema heavenshopdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `heavenshoptestdb`
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
USE `heavenshoptestdb`;

-- -----------------------------------------------------
-- Table `roles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `id_role` INT NOT NULL AUTO_INCREMENT,
  `name_role` VARCHAR(50) NOT NULL UNIQUE,
  `description_role` VARCHAR(150) NULL,
  PRIMARY KEY (`id_role`)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id_user` INT NOT NULL AUTO_INCREMENT,
  `name_user` VARCHAR(150) NOT NULL,
  `email_user` VARCHAR(150) NOT NULL UNIQUE,
  `password_user` VARCHAR(255) NOT NULL,
  `status_user` ENUM('active','inactive') DEFAULT 'active',
  `id_role` INT NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_user`),
  CONSTRAINT `fk_users_roles`
    FOREIGN KEY (`id_role`)
    REFERENCES `roles` (`id_role`)
    ON UPDATE CASCADE
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `refresh_tokens`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `refresh_tokens`;
CREATE TABLE `refresh_tokens` (
  `id_token` INT NOT NULL AUTO_INCREMENT,
  `id_user` INT NOT NULL,
  `token` VARCHAR(255) NOT NULL,
  `expires_at` DATETIME NOT NULL,
  PRIMARY KEY (`id_token`),
  INDEX `fk_refresh_user` (`id_user` ASC),
  CONSTRAINT `fk_refresh_user`
    FOREIGN KEY (`id_user`)
    REFERENCES `users` (`id_user`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `categories`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id_category` INT NOT NULL AUTO_INCREMENT,
  `name_category` VARCHAR(100) NOT NULL,
  `description_category` TEXT NULL,
  PRIMARY KEY (`id_category`)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `products`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id_product` INT NOT NULL AUTO_INCREMENT,
  `name_product` VARCHAR(150) NOT NULL,
  `description_product` TEXT NULL,
  `price_product` DECIMAL(10,2) NOT NULL,
  `status_product` ENUM('active', 'inactive') DEFAULT 'active',
  `image_product` VARCHAR(255) NULL,
  `id_category` INT NULL,
  PRIMARY KEY (`id_product`),
  INDEX `fk_products_categories` (`id_category` ASC),
  CONSTRAINT `fk_products_categories`
    FOREIGN KEY (`id_category`)
    REFERENCES `categories` (`id_category`)
    ON UPDATE CASCADE
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `variants`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `variants`;
CREATE TABLE `variants` (
  `id_variant` INT NOT NULL AUTO_INCREMENT,
  `id_product` INT NOT NULL,
  `color_variant` VARCHAR(50) NULL,
  `size_variant` VARCHAR(50) NULL,
  `sku_variant` VARCHAR(100) UNIQUE,
  `price_variant` DECIMAL(10,2) NULL,
  `status_variant` ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  PRIMARY KEY (`id_variant`),
  INDEX `fk_variant_product` (`id_product` ASC),
  CONSTRAINT `fk_variant_product`
    FOREIGN KEY (`id_product`)
    REFERENCES `products` (`id_product`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `stocks`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `stocks`;
CREATE TABLE `stocks` (
  `id_stock` INT NOT NULL AUTO_INCREMENT,
  `id_variant` INT NOT NULL,
  `quantity_stock` INT NOT NULL DEFAULT 0,
  `expiration_stock` DATE NULL,
  `lot_code_stock` VARCHAR(100) NULL,
  PRIMARY KEY (`id_stock`),
  INDEX `fk_stock_variant` (`id_variant` ASC),
  CONSTRAINT `fk_stock_variant`
    FOREIGN KEY (`id_variant`)
    REFERENCES `variants` (`id_variant`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `inventory_history`;
CREATE TABLE `inventory_history` (
  `id_history` INT NOT NULL AUTO_INCREMENT,
  `id_variant` INT NOT NULL,
  `quantity` INT NOT NULL,
  `value` DECIMAL(10, 2) NOT NULL,
  `type` ENUM('in', 'out') DEFAULT 'in',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(`id_history`),

  CONSTRAINT `fk_history_variant`
    FOREIGN KEY (`id_variant`)
    REFERENCES `variants` (`id_variant`)
    ON DELETE CASCADE
)
