-- MySQL Script generated by MySQL Workbench
-- Sun Sep 29 14:54:46 2024
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema infiori
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema infiori
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `infiori` DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci ;
USE `infiori` ;

-- -----------------------------------------------------
-- Table `infiori`.`CATEGORY`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `infiori`.`CATEGORY` (
  `id_category` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_category`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `infiori`.`PRODUCTS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `infiori`.`PRODUCTS` (
  `id_products` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `description` VARCHAR(200) NULL,
  `price` VARCHAR(45) NULL,
  `id_category` INT NOT NULL, CONSTRAINT `fk_PRODUCTS_CATEGORY` FOREIGN KEY (`id_category`) REFERENCES `infiori`.`CATEGORY` (`id_category`),
  PRIMARY KEY (`id_products`))ENGINE = InnoDB;




-- -----------------------------------------------------
-- Table `infiori`.`PICTURES`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `infiori`.`PICTURES` (
  `id_picture` INT NOT NULL AUTO_INCREMENT,
  `url` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_picture`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `infiori`.`CATEGORIES`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `infiori`.`CATEGORIES` (
  `id_categories` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id_categories`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `infiori`.`USERS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `infiori`.`USERS` (
  `id_user` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NULL,
  `firstname` VARCHAR(200) NULL,
  `mail` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `id_categories` INT NOT NULL, CONSTRAINT `fk_USERS_CATEGORIES` FOREIGN KEY (`id_categories`) REFERENCES `infiori`.`CATEGORIES` (`id_categories`))ENGINE = InnoDB;




-- -----------------------------------------------------
-- Table `infiori`.`PICTURE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `infiori`.`PICTURE` (
  `id_picture` INT NOT NULL AUTO_INCREMENT,
  `url` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_picture`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `infiori`.`USERS_PICTURE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `infiori`.`USERS_PICTURE` (
  `USERS_id_user` INT NOT NULL,
  `PICTURE_id_picture` INT  NOT NULL,
  CONSTRAINT `fk_USERS_has_PICTURE_USERS` FOREIGN KEY (`USERS_id_user`) REFERENCES `infiori`.`USERS` (`id_user`),
  CONSTRAINT `fk_USERS_has_PICTURE_PICTURE` FOREIGN KEY (`PICTURE_id_picture`) REFERENCES `infiori`.`PICTURE` (`id_picture`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `infiori`.`TALLA`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `infiori`.`TALLA` (
  `id_talla`  INT NOT NULL AUTO_INCREMENT,
  `descrption` VARCHAR(45) NOT NULL,
  `id_category` INT NOT NULL,
  PRIMARY KEY (`id_talla`),
  CONSTRAINT `fk_TALLA_CATEGORY` FOREIGN KEY (`id_category`) REFERENCES `infiori`.`CATEGORY` (`id_category`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `infiori`.`PRODUCTS_TALLA`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PRODUCTS_TALLA` (
  `id_products_talla` INT NOT NULL AUTO_INCREMENT,
  `id_products` INT NOT NULL,
  `id_talla` INT NOT NULL,
  `stock` INT NOT NULL,
  
  PRIMARY KEY (`id_products_talla`),
  UNIQUE KEY `unique_product_talla` (`id_products`, `id_talla`),  -- Asegúrate de que haya un índice único
  
  CONSTRAINT `fk_PRODUCTS_has_TALLA_PRODUCTS` FOREIGN KEY (`id_products`) 
    REFERENCES `PRODUCTS` (`id_products`) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION,
  
  CONSTRAINT `fk_PRODUCTS_has_TALLA_TALLA` FOREIGN KEY (`id_talla`) 
    REFERENCES `TALLA` (`id_talla`) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;


-- -----------------------------------------------------
-- Table `infiori`.`SHOPPING`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `infiori`.`SHOPPING` (
  `id_shopping` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `date_info` DATE NOT NULL,
  `id_user` INT NOT NULL,
  CONSTRAINT `fk_SHOPPING_USERS` FOREIGN KEY (`id_user`) 
    REFERENCES `infiori`.`USERS` (`id_user`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- Table `infiori`.`PRODUCTS_SHOPPING`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PRODUCTS_SHOPPING` (
  `id_products_shopping` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `PRODUCTS_TALLA_PRODUCTS_id_products` INT NOT NULL,
  `PRODUCTS_TALLA_TALLA_id_talla` INT NOT NULL,
  `SHOPPING_id_shopping` INT NOT NULL,
  `quantity` INT NOT NULL,

  -- Clave foránea que referencia a la tabla PRODUCTS_TALLA
  CONSTRAINT `fk_PRODUCTS_TALLA_has_SHOPPING_PRODUCTS_TALLA` 
    FOREIGN KEY (
      `PRODUCTS_TALLA_PRODUCTS_id_products`, 
      `PRODUCTS_TALLA_TALLA_id_talla`
    ) 
    REFERENCES `PRODUCTS_TALLA` (
      `id_products`, 
      `id_talla`
    )
    ON DELETE CASCADE
    ON UPDATE CASCADE,

  -- Clave foránea que referencia a la tabla SHOPPING
  CONSTRAINT `fk_PRODUCTS_TALLA_has_SHOPPING_SHOPPING` 
    FOREIGN KEY (`SHOPPING_id_shopping`)  
    REFERENCES `shopping` (`id_shopping`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB;
-- -----------------------------------------------------
-- Table `infiori`.`PICTURES_PRODUCTS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `infiori`.`PICTURES_PRODUCTS` (
  `PICTURES_id_picture` INT NOT NULL,
  `PRODUCTS_id_products` INT NOT NULL,
  PRIMARY KEY (`PICTURES_id_picture`, `PRODUCTS_id_products`),
CONSTRAINT `fk_PICTURES_has_PRODUCTS_PICTURES` FOREIGN KEY (`PICTURES_id_picture`) REFERENCES `infiori`.`PICTURES` (`id_picture`),
CONSTRAINT `fk_PICTURES_has_PRODUCTS_PRODUCTS` FOREIGN KEY (`PRODUCTS_id_products`)REFERENCES `infiori`.`PRODUCTS` (`id_products`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;



