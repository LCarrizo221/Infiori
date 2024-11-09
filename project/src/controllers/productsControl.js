//const { where } = require('sequelize');
//const { Product } = require('../database/models'); //MODELO PRINCIPAL DE PRODUCT
const express = require("express");
const path = require("node:path");
const app = express();
const { validationResult } = require("express-validator");
const db = require('../database/models');
const sequelize = db.sequelize;
const { productDB } = require('../database/models/');

module.exports = {
  // 1. Ver productos

  renderCart: async (req, res) => {
    res.render("carrito-compra")
  },
  getAllProducts: async (req, res) => {
    try {
      const products = await db.productDB.findAll(); //SE DEFINE PRODUCTS
      res.json(products); // Responde en JSON para la API
    } catch (error) {
      res.status(500).json({ error: "Error al cargar productos" });
    }
  },

  renderHomePage: async (req, res) => { //render para la pagina principal
    try {
      const products = await db.productDB.findAll();
      res.render('home', { products }); // Renderiza la vista para la página principal
    } catch (error) {
      console.error("Error al cargar productos para la vista de inicio:", error);
      res.status(500).send("Error al cargar la página principal.");
    }
  },

  // 2. ver products por id


  getProductById: async (req, res) => {
    try {
      const product = await db.productDB.findByPk(req.params.id);
      if (!product) {
        return res.status(404).json({ error: "producto no encontrado" })
      }

      res.json(product); //responde con el producto encontrado por id

    } catch (error) {
      res.status(500).json({ error: "Error al cargar productos", })
    }
  },
  renderViewDetail: async (req, res) => {
    try {
      const product = await db.productDB.findByPk(req.params.id);
      if (!product){
        return res.status(404).json({error: "producto no encontrado"})
      }
      return res.render("detailExam", { product });
    } catch (error) {
      res.status(404).json({ error: "Error en ver la vista", error })
    }
  },
  // OBTENER PRODUCTOS POR CATEGORIA
  getProductsByCategory: async (req, res) => {
    try {
      const products = await db.productDB.findAll({
        where: { category: req.params.category } //ATENCION este es el metodo para buscar por categoria, yo lo puse por req.params pero puede ser cualquier otro metodo 
      });

      if (products.length === 0) {
        return res.status(404).json({ error: 'No se encontraron productos en esta categoría' });
      }

      res.json(products); // Responder con los productos encontrados
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener productos por categoría' });
    }
  },
  create: (req,res) => {
    res.render("formUpload");
  },

  createNewProduct: async (req,res)=>{
    
    
    const {title, description, category, price, stock } = req.body

    try {
      
      const products = await db.ProductPrueba.create({
        title,
        description,
        price,
        category,
        img_url : "img/products" + req.file.filename,
        stock
        
      });
      //ver si se creo el nuevo producto
   res.status(500).json(products) //el que definimos recien
   } catch (error) {
   res.status(400).json({error: "Error al crear producto ", error})
    }
  },
  // 5. Actualizar un producto
  updateProduct: async (req, res) => {
    const { id } = req.params; // El ID del producto que viene de la URL
    const { title, description, category, price, img_url } = req.body; // Los datos para actualizar

    try {
      // Buscar el producto por su ID
      const product = await ProductPrueba.findByPk(id);

      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }

      // Actualizar los detalles del producto
      product.title = title || product.title;
      product.description = description || product.description;
      product.category = category || product.category;
      product.price = price || product.price;
      product.img_url = img_url || product.img_url;

      await product.save(); // Guardar los cambios en la base de datos

      res.json(product); // Enviar el producto actualizado como respuesta
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      res.status(500).json({ error: 'Error al actualizar el producto' });
    }
  },

  // 6. Eliminar un producto
  deleteProduct: async (req, res) => {
    const { id } = req.params; // El ID del producto que viene de la URL

    try {
      // Buscar el producto por su ID
      const product = await ProductPrueba.findByPk(id);

      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }

      // Eliminar el producto de la base de datos
      await product.destroy();

      res.json({ message: 'Producto eliminado exitosamente' }); // Responder con un mensaje de éxito
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      res.status(500).json({ error: 'Error al eliminar el producto' });
    }
  },
  viewAllProducts: (req, res) => {
    db.ProductPrueba.findAll({
    }).then(products =>  //res.send(products));
      res.render("homeforDB", { products }));

  },

  viewDetail: (req, res) => {
    const idProd = req.params.id
    db.productDB.findByPk(idProd,{
      })
    .then(products => //res.send(products));
      res.render("detailExam",{ products , idProd }));

  },
  upLoadImag: async (req, res) => {
    try {
      let updated = false;
      // Cargar productos desde el datasource
      let products = await datasource.load();
      let id = products.length + 1;

      // Actualizar producto
      let articleUpd = products.map((article) => {
        if (article.id == id) {
          article.titulo = req.body.titulo;
          article.descripcion = req.body.descripcion;
          article.imagen = "/img/products/" + req.file.filename;
          article.tipo = req.body.tipo;
          article.precio = req.body.precio;
          updated = true;
        }
        return article;
      });

      if (updated) {
        // Guardar los productos actualizados
        await datasource.save(articleUpd);
        res.send("Archivo subido correctamente");
      } else {
        res.send("Producto no encontrado");
      }
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      res.status(500).send("Error al procesar la solicitud");
    }
  },
}