const userDataSource = {
    async load() {
        try {
            const users = await Usuario.findAll({
                include: [
                    {
                        model: UserCategory,  // Incluye la categoría del usuario
                        as: 'userCategory', 
                        attributes: ['name']
                    },
                    {
                        model: Picture,
                        through: { attributes: [] }
                    },
                    {
                        model: Shopping,
                        attributes: ['total', 'date']
                    }
                ]
            });
            return users;
        } catch (error) {
            console.error("Error al cargar usuarios de la base de datos:", error);
            throw error;
        }
    },

    async save(userData) {
        try {
            const { name, firstname, email, password, userCategory, pictures, shoppings } = userData;

            // Encontrar o crear la categoría de usuario
            const [categoryRecord] = await UserCategory.findOrCreate({
                where: { name: userCategory }
            });

            // Crear el usuario
            const user = await Usuario.create({
                name,
                firstname,
                email,
                password,  // Recuerda encriptar la contraseña antes de guardarla
                id_category: categoryRecord.id_categories
            });

            // Asociar imágenes y compras si existen
            if (pictures && pictures.length) {
                const pictureRecords = await Promise.all(
                    pictures.map(url => Picture.findOrCreate({
                        where: { url }
                    }).then(([picture]) => picture))
                );
                await user.setPictures(pictureRecords);
            }

            if (shoppings && shoppings.length) {
                await Promise.all(
                    shoppings.map(async (shoppingData) => {
                        await Shopping.create({
                            total: shoppingData.total,
                            date: shoppingData.date,
                            id_user: user.id_user
                        });
                    })
                );
            }

            return user;
        } catch (error) {
            console.error("Error al guardar usuario en la base de datos:", error);
            throw error;
        }
    }
};
