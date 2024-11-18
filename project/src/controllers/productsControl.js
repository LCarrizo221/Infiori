//const { where } = require('sequelize');
//const { Product } = require('../database/models'); //MODELO PRINCIPAL DE PRODUCT
const express = require("express");
const path = require("node:path");
const app = express();
const { check, body, validationResult } = require('express-validator');

const db = require('../database/models');
const sequelize = db.sequelize;
const { productDB } = require('../database/models/');

module.exports = {

  getAllProducts: async (req, res) => {
    try {
      const products = await db.productDB.findAll(); //SE DEFINE PRODUCTS
      res.json(products); // Responde en JSON para la API
    } catch (error) {
      res.status(500).json({ error: "Error al cargar productos" });
    }
  },
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

  //render para la pagina principal
  renderHomePage: async (req, res) => { 
    try {
      const products = await db.productDB.findAll();
      res.render('home', { products }); 
    } catch (error) {
      console.error("Error al cargar productos para la vista de inicio:", error);
      res.status(500).send("Error al cargar la página principal.");
    }
  },
  rederbyCategory: async(req,res) => {
    try {
      const products = await db.productDB.findAll({
        where: { category: req.params.category } //ATENCION este es el metodo para buscar por categoria, yo lo puse por req.params pero puede ser cualquier otro metodo 
      });
      

      if (products.length === 0) {
        
         res.send( 'No se encontraron productos en esta categoría') ;
      }

      res.render("home",{products}); // Responder con los productos encontrados
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener productos por categoría' });
    }

  },
  // Render para la vista de un producto
  renderViewDetail: async (req, res) => {
    const idProd = req.params.id
    db.productDB.findByPk(idProd,{
      })
    .then(products => //res.send(products));
      res.render("detailExam",{ products , idProd }));

  },
  // ----------------------------- CRUD DE PRODUCTOS ---------------------------------- 
  // CREATE
  create: (req, res) => {
    res.render("formUpload");
  },
  createNewProduct: async (req, res) => {
   
    const { title, description, category, price, stock } = req.body
    let img_url;
    if (req.file) {
      img_url = "/img/products/" + req.file.filename; // Ruta de la imagen
    }

    try {
      
        const products = await db.productDB.create({
          title,
          description,
          price,
          category,
          img_url: "/img/products/" + req.file.filename,
          stock
  
        });
        res.redirect("/");

    } catch (error) {
      res.status(400).json({ error: "Error al crear producto ", error })
    }
  },


  // Actualizar un producto
  edit: function (req, res) {
    let id = req.params.id;
    db.productDB.findByPk(id).then(product => {
      if (!product) {
        return
      }
      res.render('formProdEdit', { product })
    }

    )
  },
  updateProduct: async (req, res) => {
    const errors = validationResult(req);
    const productId = req.params.id; // Obtén el ID del producto

    const { title, description, price, category, stock } = req.body; // Extrae los datos del cuerpo
    let img_url;
    if (req.file) {
      img_url = "/img/products/" + req.file.filename; // Ruta de la imagen
    }

    console.log('Datos recibidos:', req.body);
    console.log('ID del producto:', productId);
   
    try {
      // Verifica que el producto exista
      const existingProduct = await db.productDB.findOne({ where: { id_products: productId } });

      if (!existingProduct) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }

      // Validaciones 
      if (errors.isEmpty()) {
        const [updatedRows] = await db.productDB.update(
          { title, description, price, category, img_url, stock },
          { where: { id_products: productId } } 
        );
         // Verifica si se actualizó algún registro
      if (updatedRows === 0) {
        return res.status(404).json({ error: 'Producto no actualizado, verifique los datos' });
      }

      // Responde con un mensaje de éxito
      //res.status(200).json({ message: 'Producto actualizado correctamente' });
      res.redirect("/");
      } else {
        res.render('formProdEdit', {
          product: existingProduct,
          errors: errors.mapped(),
          old: req.body,
          locals: { errors: true }
        });
      }
     
    } catch (error) {
      console.error(error); // Para depuración
      res.status(500).json({ error: 'Error al actualizar el producto' });
    }
  },


  // Eliminar un producto
  deleteProduct: async (req, res) => {
    const { id } = req.params; // El ID del producto que viene de la URL

    try {
      // Buscar el producto por su ID
      const product = await db.productDB.findByPk(id);

      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }

      // Eliminar el producto de la base de datos
      await product.destroy();

      res.redirect("/");
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      res.status(500).json({ error: 'Error al eliminar el producto' });
    }
  },

  //Carrito de compra
  renderCart: async (req, res) => {
    res.render("carrito-compra")
  }
}