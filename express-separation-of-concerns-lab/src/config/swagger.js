import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API Documentation",
      version: "1.0.0",
      description: "Automatic API documentation using Swagger and JSDoc",
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
        description: "Local server",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
});
