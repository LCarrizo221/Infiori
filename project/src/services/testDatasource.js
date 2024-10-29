// testDatasource.js
const datasource = require('./datasource'); // Ajusta la ruta según donde esté tu datasource.js

const testDatasource = async () => {
    try {
        console.log("Cargando productos...");
        const products = await datasource.load();
        
        // Mostrar los productos en la consola
        console.log("Productos cargados:", JSON.stringify(products, null, 2));
    } catch (error) {
        console.error("Error al cargar productos:", error);
    }
};

testDatasource();
