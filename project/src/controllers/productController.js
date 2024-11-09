// controllers/productController.js
const express = require("express");
const router = express.Router();
const db = require('../database/models'); // Importa el módulo donde está tu modelo
const Product = db.productDB; // Accede al modelo Product
const { validationResult } = require("express-validator");
module.exports = {
// Crear un nuevo producto
createNewP: (req, res) => {
  let resultValidation = validationResult(req); //Validar validaciones

    if(resultValidation.errors.length > 0){
        res.render('formUpload',{
            errors: resultValidation.mapped(),
            old: req.body,
        });
      }else{
        res.send("Se pasaron las pruebas");
      } 
 /* try {
    // Asegúrate de que el cuerpo de la solicitud tenga los datos necesarios
    //const { title, description, category, price, img_url, stock } = req.body;

    // Crea un nuevo producto
    const newProduct = db.productDB.create({
      title : req.body.title,
      description : req.body.description,
      category : req.body.category,
      price : req.body.price,
      img_url : "/img/products/" + req.file.filename,
      stock : req.body.stock
    });

    // Devuelve el nuevo producto creado
    res.status(201).json(newProduct); // 201 Created
  } catch (error) {
    console.error('Error al crear el producto:', error);
    res.status(500).json({ error: 'Error al crear el producto' });
  }
*/
}

}