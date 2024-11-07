-- CARGAR USUARIOS
-- 1 insertar categorias
 INSERT INTO `infiori`.`CATEGORIES` (name) VALUES ('Admin'),('User');

select * from `infiori`.`CATEGORIES`;

-- 2 Cargar usuarios
INSERT INTO `infiori`.`USERS` (name, firstname, mail, password, id_categories) VALUES
('Santiago', 'Zalazar', 'santiago.zalazar@example.com', 'password123', 1),
('Franco', 'Diaz', 'franco.diaz@example.com', 'password123', 1),
('Matias', 'Puyo', 'matias.puyo@example.com', 'password123', 1),
('Lucas', 'Carrizo', 'ana.martinez@example.com', 'password123', 1),
('Carlos', 'López', 'carlos.lopez@example.com', 'password123', 3),
('Laura', 'Díaz', 'laura.diaz@example.com', 'password123', 3),
('Pedro', 'Sánchez', 'pedro.sanchez@example.com', 'password123',2),
('Lucía', 'Ramírez', 'lucia.ramirez@example.com', 'password123', 2),
('Javier', 'Torres', 'javier.torres@example.com', 'password123', 2),
('Sofía', 'Hernández', 'sofia.hernandez@example.com', 'password123', 3);

select * from users;
-- --------------------------------------------------------------------
-- 3 insertar las imagenes para el user
INSERT INTO `infiori`.`PIC_USER` (`url`,`id_user`) VALUES ("img/user/user_Prueba",1);


-- -----------------------------------------------------------------------

-- CARGA PRODUCTOS
-- 4 insertar las categorias de los productos
INSERT INTO CATEGORY (name) VALUES 
('indumentaria'),
('calzado'),
('accesorios');

select * from CATEGORY;
-- ----------------------------------------------------------
-- 5 Insertar tallas
INSERT INTO TALLA (id_talla, descrption, id_category) VALUES 
(1, 'S', 1), (2, 'M', 1), (3, 'L', 1), (4, 'XL', 1), -- Para indumentaria
(5, '36', 2), (6, '37', 2), (7, '38', 2), (8, '39', 2), (9, '40', 2), -- Para calzado
(10, 'Única', 3); -- Para accesorios

select * from TALLA;
-- --------------------
-- 6 Insertar el producto
-- 1. Producto de indumentaria: Vestido floral
INSERT INTO `infiori`.`PRODUCTS`
(`title`,`description`,`price`,`id_category`) VALUES('Vestido Floral Primavera', 'Hermoso vestido con estampado floral, ideal para la temporada primavera-verano.', 24999, 1);

INSERT INTO `PRODUCTS` (`title`, `description`, `price`, `id_category`) VALUES ('Vestido Floral Primavera', 'Hermoso vestido con estampado floral, ideal para la temporada primavera-verano.', 24999, 1);

SELECT * FROM PRODUCTS;


-- 7 Insertar la imagen del producto
INSERT INTO `infiori`.`PICTURES` (`url`) VALUES ('/img/products/vestido-floral-1.jpg');
INSERT INTO `PICTURES` (`url`, `id_producto`) VALUES ('/img/products/vestido-floral-1.jpg', LAST_INSERT_ID());
INSERT INTO `PICTURES` (`url`, `id_producto`) VALUES ('/img/products/vestido-floral-2.jpg', LAST_INSERT_ID());

SELECT * FROM PICTURES;



-- 8 insertar la relacion producto - talla
INSERT INTO `infiori`.`PRODUCTS_TALLA`
(`id_products`,`id_talla`,`stock`)
VALUES 
(1, 1, 10), -- 10 unidades talla S
(1, 2, 15), -- 15 unidades talla M
(1, 3, 12), -- 12 unidades talla L
(1, 4, 8);  -- 8 unidades talla XL

select * from products_talla;

