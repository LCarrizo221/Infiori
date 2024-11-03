const fs = require("fs")
const path = require("path")
const { Product, Category, Picture, pictures_products } = require("../database/models");
const { name } = require("ejs");
const { title } = require("process");
const { where } = require("sequelize");

//para leer el JSON
const filePath = path.join(__dirname, "products.json");
const jsonData = fs.readFileSync(filePath)
const products = JSON.parse(jsonData)

const insertData = async () =>{
    try {
        for(const product of products){
            const [category] = await Category.findOrCreate({
                where: { name: product.tipo }
            });
            //insertar producto en la tabla PRODUCTS
            const newProduct = await Category.findOrCreate({
                title: product.titulo,
                description: product.descripcion,
                price: product.precio,
                id_category: category.id_category //relacion con categoria 
            });

            //3 insertar imagenes del producto en la tabla pictures
            const [newPicture] = await Picture.findOrCreate({
                where: { url: product.imagen } //esto es para insertar directamente la url a la tabla PICTURES
            });

            //4 insertar la relacion de product e imagen (PICTURES_PRODUCTS)
            await pictures_products.create({
                PRODUCTS_id_products: newProduct.id_products,
                PICTURES_id_picture: newPicture.id_picture,
            });
             // Imprimir en consola para ver el progreso
      console.log(`Producto "${newProduct.title}" y su imagen han sido insertados.`);
        }
        console.log('Datos insertados correctamente.');
    } catch (error) {
        console.error("Error al insertar los datos")
    }
}

// ejecutar
insertData()