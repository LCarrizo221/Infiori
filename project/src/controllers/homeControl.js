
const articles = [
    {
        id: 1,
        titulo: "Chaleco Quimia",
        descripcion: "En eco-cuero forrado con corderito, de tipo pesado.",
        imagen: "/img/image7.jpg"
    },
    {
        id: 2,
        titulo: "Campera Rougue",
        descripcion: "En jean, corte oversize.",
        imagen: "/img/image22.jpg"
    },
    {
        id: 3,
        titulo: "Campera The Grinch",
        descripcion: "Puffer, impermeable con plumas de ganzo.",
        imagen: "/img/image8.jpg"
    },
    {
        id: 4,
        titulo: "Campera Moura",
        descripcion: "En eco-cuero forrada.",
        imagen: "/img/image15.jpg"
    },
    {
        id: 5,
        titulo: "Conjunto spice",
        descripcion: "En morley frizado.",
        imagen: "/img/image20.jpg"
    },
    {
        id: 6,
        titulo: "Vestido azeb",
        descripcion: "En lycra y algodón, super cómodo.",
        imagen: "/img/image21.jpg"
    },
    {
        id: 7,
        titulo: "Puffer Blacky",
        descripcion: "Chaleco Puffer super abrigado.",
        imagen: "/img/image11.jpg"
    },
    {
        id: 8,
        titulo: "Buzo tejigo",
        descripcion: "Tejido estampado.",
        imagen: "/img/image14.jpg"
    }
];





const homeController = {
    main: (req, res) => {
        res.render("home", {articles});
    }
};

module.exports = homeController;