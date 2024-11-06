const { where } = require('sequelize');
const { product } = require('../database/models'); //MODELO PRINCIPAL DE PRODUCT
const { validationResult } = require("express-validator");
const db = require('../database/models');
const sequelize = db.sequelize;

module.exports = {
  // 1. Ver productos

  renderCart: async (req,res)=>{
    res.render("carrito-compra")
  },
  getAllProducts: async (req, res) => {
    try {
      const products = await db.product.findAll(); //SE DEFINE PRODUCTS
      res.json(products); // Responde en JSON para la API
    } catch (error) {
      res.status(500).json({ error: "Error al cargar productos" });
    }
  },
  
  renderHomePage: async (req, res) => { //render para la pagina principal
    try {
      const products = await db.product.findAll();
      res.render('home', { products }); // Renderiza la vista para la página principal
    } catch (error) {
      console.error("Error al cargar productos para la vista de inicio:", error);
      res.status(500).send("Error al cargar la página principal.");
    }
  },

  // 2. ver products por id


  getProductById: async (req, res)=>{
    try {
      const product = await ProductPrueba.findByPk(req.params.id);
      if (!product) {
        return res.status(404).json({error: "producto no encontrado"})
      }

      res.json(product); //responde con el producto encontrado por id

    } catch (error) {
      res.status(500).json({error: "Error al cargar productos", error})
    }
  },
  renderViewDetail: async (req,res)=>{
    try {
      const product = await ProductPrueba.findByPk(req.params.id);
      if (!product){
        return res.status(404).json({error: "producto no encontrado"})
      }
      return res.render("detailExam", {product}); 
    } catch (error) {
      res.status(404).json({error: "Error en ver la vista", error})
    }
  },
  // OBTENER PRODUCTOS POR CATEGORIA
  getProductsByCategory : async (req, res) => {
    try {
      const products = await ProductPrueba.findAll({
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
  createNewProduct: async (req,res)=>{
    const {title, description, category, price, img_url } = req.body

    try {
      
      const newProduct = await ProductPrueba.create({
        title,
        description,
        category,
        price,
        img_url
      });

      //ver si se creo el nuevo producto
      res.status(500).json(newProduct) //el que definimos recien
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
  viewAllProducts: (req,res) =>{
    db.Product.findAll({
      include: [ 
        {
          model: db.pictures_products,
          include:[
            {
              model: db.Picture
              
            },
          ],
        },
      ],
    }). then(products =>  //res.send(products));
     res.render("homeforDB", {products}));

  },

}