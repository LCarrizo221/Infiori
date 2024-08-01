const fs = require("fs/promises");
const path = require("path");

const datasource = {
    filePath: path.join(__dirname, "../models/products.json"),

    async load() {
        try {
            const jsonProducts = await fs.readFile(this.filePath, "utf8");
            const products = JSON.parse(jsonProducts);
            return products;
        } catch (error) {
            console.error("Error al cargar el archivo de productos:", error);
            throw error; // Re-lanzar el error para manejarlo en el controlador
        }
    },

    async save(data) {
        try {
            const jsonData = JSON.stringify(data, null, 2);
            await fs.writeFile(this.filePath, jsonData, "utf8");
        } catch (error) {
            console.error("Error al guardar el archivo de productos:", error);
            throw error; // Re-lanzar el error para manejarlo en el controlador
        }
    }
};

console.log("Ruta del archivo de productos:", datasource.filePath);

module.exports = datasource;
