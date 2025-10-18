import sequelize from "../config/database.js";
import Product from "../models/Product.js";

const seedProducts = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connected");

        await sequelize.sync({ alter: true });

        const products = [
            {
                name_product: "Camiseta básica blanca",
                description_product:
                    "Camiseta de algodón 100% suave y transpirable",
                price_product: 35000,
                status_product: "active",
                image_product: "/images/default_image.png",
                id_category: 1,
            },
            {
                name_product: "Pantalón jean azul",
                description_product: "Jean clásico corte recto para hombre",
                price_product: 89000,
                status_product: "active",
                image_product: "/images/default_image.png",
                id_category: 1,
            },
            {
                name_product: "Zapatos deportivos negros",
                description_product:
                    "Zapatillas ligeras ideales para correr o caminar",
                price_product: 120000,
                status_product: "active",
                image_product: "/images/default_image.png",
                id_category: 2,
            },
            {
                name_product: "Chaqueta impermeable",
                description_product:
                    "Chaqueta para lluvia con capucha ajustable",
                price_product: 150000,
                status_product: "active",
                image_product: "/images/default_image.png",
                id_category: 1,
            },
            {
                name_product: "Bolso de cuero sintético",
                description_product: "Bolso elegante con correas ajustables",
                price_product: 95000,
                status_product: "active",
                image_product: "/images/default_image.png",
                id_category: 3,
            },
            {
                name_product: "Reloj digital deportivo",
                description_product:
                    "Reloj resistente al agua con cronómetro y alarma",
                price_product: 80000,
                status_product: "active",
                image_product: "/images/default_image.png",
                id_category: 4,
            },
            {
                name_product: "Audífonos Bluetooth",
                description_product:
                    "Audífonos inalámbricos con cancelación de ruido",
                price_product: 110000,
                status_product: "active",
                image_product: "/images/default_image.png",
                id_category: 5,
            },
            {
                name_product: "Teclado mecánico RGB",
                description_product:
                    "Teclado gamer retroiluminado con switches azules",
                price_product: 180000,
                status_product: "active",
                image_product: "/images/default_image.png",
                id_category: 5,
            },
            {
                name_product: "Mouse inalámbrico ergonómico",
                description_product:
                    "Mouse óptico con sensor de alta precisión",
                price_product: 60000,
                status_product: "active",
                image_product: "/images/default_image.png",
                id_category: 5,
            },
            {
                name_product: "Cargador rápido USB-C",
                description_product:
                    "Cargador de 25W compatible con Android y iPhone",
                price_product: 45000,
                status_product: "active",
                image_product: "/images/default_image.png",
                id_category: 5,
            },
            {
                name_product: "Silla ergonómica de oficina",
                description_product:
                    "Silla con soporte lumbar ajustable y ruedas suaves",
                price_product: 320000,
                status_product: "active",
                image_product: "/images/default_image.png",
                id_category: 6,
            },
            {
                name_product: "Lámpara LED de escritorio",
                description_product:
                    "Lámpara con brazo flexible y tres niveles de brillo",
                price_product: 70000,
                status_product: "active",
                image_product: "/images/default_image.png",
                id_category: 6,
            },
            {
                name_product: "Cojín ortopédico lumbar",
                description_product:
                    "Ideal para mantener la postura al sentarse",
                price_product: 55000,
                status_product: "active",
                image_product: "/images/default_image.png",
                id_category: 6,
            },
            {
                name_product: "Taza térmica acero inoxidable",
                description_product:
                    "Mantiene tus bebidas calientes por más de 6 horas",
                price_product: 40000,
                status_product: "active",
                image_product: "/images/default_image.png",
                id_category: 7,
            },
            {
                name_product: "Botella deportiva 1L",
                description_product: "Botella reutilizable con tapa a presión",
                price_product: 35000,
                status_product: "active",
                image_product: "/images/default_image.png",
                id_category: 7,
            },
            {
                name_product: "Sudadera con capucha gris",
                description_product: "Sudadera cómoda ideal para uso diario",
                price_product: 95000,
                status_product: "active",
                image_product: "/images/default_image.png",
                id_category: 1,
            },
            {
                name_product: "Sandalias de playa unisex",
                description_product: "Ligeras y resistentes al agua",
                price_product: 30000,
                status_product: "active",
                image_product: "/images/default_image.png",
                id_category: 2,
            },
            {
                name_product: "Gorra deportiva ajustable",
                description_product:
                    "Gorra ligera con ajuste trasero y diseño moderno",
                price_product: 25000,
                status_product: "active",
                image_product: "/images/default_image.png",
                id_category: 3,
            },
            {
                name_product: "Cinturón de cuero genuino",
                description_product:
                    "Cinturón negro clásico para vestir o casual",
                price_product: 60000,
                status_product: "active",
                image_product: "/images/default_image.png",
                id_category: 3,
            },
            {
                name_product: "Mochila para portátil 15''",
                description_product:
                    "Mochila resistente con múltiples compartimientos",
                price_product: 120000,
                status_product: "active",
                image_product: "/images/default_image.png",
                id_category: 3,
            },
            {
                name_product: "Monitor 24'' Full HD",
                description_product: "Pantalla LED con resolución 1080p y HDMI",
                price_product: 620000,
                status_product: "active",
                image_product: "/images/default_image.png",
                id_category: 5,
            },
            {
                name_product: "Parlante Bluetooth portátil",
                description_product: "Batería de 10 horas y sonido estéreo",
                price_product: 150000,
                status_product: "active",
                image_product: "/images/default_image.png",
                id_category: 5,
            },
            {
                name_product: "Camiseta polo azul marino",
                description_product: "Camiseta tipo polo con cuello y botones",
                price_product: 55000,
                status_product: "active",
                image_product: "/images/default_image.png",
                id_category: 1,
            },
            {
                name_product: "Pantaloneta deportiva negra",
                description_product:
                    "Pantaloneta ligera para entrenamiento o uso diario",
                price_product: 45000,
                status_product: "active",
                image_product: "/images/default_image.png",
                id_category: 2,
            },
            {
                name_product: "Set de cubiertos de acero inoxidable",
                description_product:
                    "Incluye cuchillos, tenedores, cucharas y postres",
                price_product: 95000,
                status_product: "active",
                image_product: "/images/default_image.png",
                id_category: 7,
            },
            {
                name_product: "Plancha de ropa a vapor",
                description_product: "Potente plancha con sistema anti goteo",
                price_product: 130000,
                status_product: "active",
                image_product: "/images/default_image.png",
                id_category: 7,
            },
            {
                name_product: "Cafetera eléctrica 1.2L",
                description_product: "Cafetera automática para 10 tazas",
                price_product: 180000,
                status_product: "active",
                image_product: "/images/default_image.png",
                id_category: 7,
            },
            {
                name_product: "Toalla de microfibra grande",
                description_product:
                    "Secado rápido, ideal para gimnasio o playa",
                price_product: 25000,
                status_product: "active",
                image_product: "/images/default_image.png",
                id_category: 8,
            },
            {
                name_product: "Sombrilla plegable",
                description_product:
                    "Sombrilla ligera con recubrimiento anti UV",
                price_product: 40000,
                status_product: "active",
                image_product: "/images/default_image.png",
                id_category: 8,
            },
            {
                name_product: "Gafas de sol polarizadas",
                description_product: "Protección UV400 con marco resistente",
                price_product: 85000,
                status_product: "active",
                image_product: "/images/default_image.png",
                id_category: 8,
            },
        ];

        for (const product of products) {
            const existing = await Product.findOne({
                where: { name_product: product.name_product },
            });

            if (existing) {
                console.log(`Product ${product.name_product} already exists`);
            }

            await Product.create(product);
            console.log(`Product ${product.name_product} created`);
        }

        console.log("Products seeded successfully");
    } catch (err) {
        console.log("Error seeding products: ", err);
    } finally {
        await sequelize.close();
    }
};

seedProducts();
