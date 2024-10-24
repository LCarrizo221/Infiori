select * from PRODUCTS

SELECT * FROM PICTURES

SELECT * FROM PRODUCTS_TALLA

-- -------------- QUERY PARA MOSTRAR UN / LOS PRODUCTOS

SELECT pro.id_products,pro.title, pro.description, pro.price, pic.url, pt.stock FROM PRODUCTS as pro
INNER JOIN  PICTURES_PRODUCTS as pp on pro.id_products = pp.PRODUCTS_id_products
INNER JOIN PICTURES as pic on pic.id_picture = PICTURES_id_picture
INNER JOIN PRODUCTS_TALLA as pt on pro.id_products = pt.id_products

