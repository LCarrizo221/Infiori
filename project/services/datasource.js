const fs = require("fs/promises")
const path = require("path")

const datasource = {
    filePath: path.resolve(__dirname,"../models/products.json"),

    async load(){
        const jsonProducts = await fs.readFile(this.filePath, "");
        const products = JSON.parse(jsonProducts);
        return products;
    },
    async save(data) {
        const jsonData = JSON.stringify(data);
        await fs.writeFile(this.filePath, jsonData, "utf-8");
    },
};

module.exports = datasource;