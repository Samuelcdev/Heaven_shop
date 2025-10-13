import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Inventory API",
            version: "1.0.0",
            description:
                "API documentation for authentication and user management",
        },
        servers: {
            url: "http://localhost:4000",
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
    },
    security: [
        {
            bearerAuth: [],
        },
    ],
    apis: ["./src/routes/*.js"],
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);

export { swaggerUi, swaggerSpecs };
