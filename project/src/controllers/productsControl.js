
const datasource = require("../services/datasource");
const { validationResult } = require("express-validator");

const productController = {
  products: null,

  cart: (req, res) => {
    res.render("carrito-compra");
  },

  detail: async (req, res) => {
    try {
      // Cargar productos desde el datasource
      let products = await datasource.load();
      // Buscar el producto con el ID especificado
      let product = products.find((product) => product.id == req.params.id);
      if (product) {
        res.render("detail", { product });
      } else {
        res.status(404).send("Producto no encontrado");
      }
    } catch (error) {
      console.error("Error al cargar el detalle del producto:", error);
      res.status(500).send("Error al procesar la solicitud");
    }
  },

  edit: (req, res) => {
    res.render("formEdit");
  },

  upLoad: (req, res) => {
    res.render("formUpload");
  },
  create: async (req, res, next) => {
    let resultValidation = validationResult(req); //Validar validaciones

    
    if(resultValidation.errors.length > 0){
        return res.render('formUpload',{
            errors: resultValidation.mapped(),
            old: req.body,
        });
    }

    /*
    if (!errors.isEmpty() || req.file) {
      this.products = await datasource.load();
      try {
        let id = this.products.length + 1;
       // if (req.file) { //Validacion de la imagen
          const article = {
            id: id,
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,
            imagen: "/img/products/" + req.file.filename,
            tipo: req.body.tipo,
            precio: req.body.precio,
          };
          this.products.push(article);
          await datasource.save(this.products);
          res.redirect("/");
       // } else {
       //   const error = new Error("No se subio la imagen");
        //  error.httpStatusCode = 400;
       //  return next(error);
        //}
      } catch {
        res.render('formUpload',{
            errors: errors.array(),
            old: req.body

        });
      }

    }else{
        res.render('formUpload',{errors: errors.array(), old: req.body});
    }
        */
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
          article.imagen = "/img/" + req.file.filename;
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

  showAllProducts: async (req, res) => {
    try {
      this.products = await datasource.load();
      res.render("allProducts", { products: this.products });
    } catch (error) {
      console.error("Error al cargar todos los productos:", error);
      res.status(500).send("Error al procesar la solicitud");
    }
  },
};

module.exports = productController;
