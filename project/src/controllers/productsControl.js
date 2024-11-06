const db = require('../database/models');
const pictures = require('../database/models/pictures');
const sequelize = db.sequelize;
const datasource = require("../services/datasource");
const { validationResult } = require("express-validator");

const productController = {
  products: null,

  cart: (req, res) => {
    res.render("carrito-compra");
  },

  viewDetail: (req,res) => { //Config para mostrar 1 solo art.
    const idProd = req.params.id
    db.Product.findByPk(idProd,{
      include: [{
        model: db.Picture, // Asegúrate de que 'Picture' esté correctamente definido y exportado
        as: 'Pictures'  // Este debe coincidir con el alias utilizado en Product.associate
    }]
})
    .then(products =>  //res.send(products));
     res.render("detailExam",{ products }));

  },
  
  viewAllProducts: (req,res) =>{
    db.Product.findAll({
      include: [{
        model: db.Picture,
       // as: 'pictures', // Debe coincidir con el alias definido en el modelo Product
      }],
    }). then(products =>  //res.send(products));
   res.render("home", {products}));

  },


  edit: async (req, res) => {
    let id = req.params.id;
    let products = await datasource.load();
		let product = products.find((prod)=> prod.id == id);
		res.render('formProdEdit',{product});

  },

  createProd: (req, res) => {
    res.render("formUpload");
  },



  
  create: async (req, res, next) => {
   /* let resultValidation = validationResult(req); //Validar validaciones

    if(resultValidation.errors.length > 0){
        res.render('formUpload',{
            errors: resultValidation.mapped(),
            old: req.body,
        });
    }else{
      res.send("Se pasaron las pruebas");
    } */
      try {
        // Cargar productos desde el datasource
        
        //let id = 15;
  
        // Crear producto
        let Newarticle ={
          id : 15,
          titulo : req.body.titulo,
          descripcion : req.body.descripcion,
          imagen : "/img/products/" + req.file.filename,
          tipo : req.body.tipo,
          precio : req.body.precio,
          category: req.body.category,
          
        };
  
        
          // Guardar producto nuevo
      this.products = await datasource.load();
      this.products.push(Newarticle);
      await datasource.save(this.products);
         res.send(this.products);
      } catch (error) {
        console.error("Error al subir la imagen:", error);
        res.status(500).send("Error al procesar la solicitud");
      }

  },
  delete: async (req, res) => {
    this.products = await datasource.load();
    let id = req.params.id;
    let artDel = this.products.filter((article) => article.id != id);
    datasource.save(artDel);
    res.redirect("/");
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

  //CRUD con BASE DE DATOS
  createNewProduct: async (req,res)=>{
    const {title, description, category, price, stock,talla, imagen } = req.body

    try {
      
      const newProduct = await db.products.create({
        title,
        description,
        category,
        price,
        //img_url
        stock,
        talla
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
  }



};

module.exports = productController;
