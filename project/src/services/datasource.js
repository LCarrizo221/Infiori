const { Product, Category, Picture, Talla } = require('../database/models');


const datasource = {
    async load() {
        try {
            const products = await Product.findAll({
                include: [
                    {
                        model: Category,
                        attributes: ['name']
                    },
                    {
                        model: Picture,
                        through: { attributes: [] }
                    },
                    {
                        model: Talla,
                        through: { attributes: ['stock'] }
                    }
                ]
            });
            return products;
        } catch (error) {
            console.error("Error al cargar productos de la base de datos:", error);
            throw error;
        }
    },

    async save(productData) {
        try {
            const { title, description, price, category, pictures, tallas } = productData;
            
            // para crear o encontrar la categoria
            const [category_record] = await Category.findOrCreate({
                where: { name: category }
            });

            // Crear el producto
            const product = await Product.create({
                title,
                description,
                price,
                id_category: category_record.id_category
            });

            // Asociar imágenes si existen
            if (pictures && pictures.length) {
                const pictureRecords = await Promise.all(
                    pictures.map(url => Picture.findOrCreate({
                        where: { url }
                    }).then(([picture]) => picture))
                );
                await product.setPictures(pictureRecords);
            }

            // Asociar tallas si existen
            if (tallas && tallas.length) {
                for (const tallaData of tallas) {
                    const [talla] = await Talla.findOrCreate({
                        where: { 
                            descrption: tallaData.description,
                            id_category: category_record.id_category
                        }
                    });
                    await product.addTalla(talla, { 
                        through: { stock: tallaData.stock }
                    });
                }
            }

            return product;
        } catch (error) {
            console.error("Error al guardar producto en la base de datos:", error);
            throw error;
        }
    }
};
module.exports = datasource;