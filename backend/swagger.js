import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { serverUrl } from "./src/constant.js";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Notes API",
      version: "1.0.0",
      description: "API documentation for Notes App with Authentication",
    },
    servers: [{ url: `${serverUrl}` }],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "token", 
        },
      },
    },
  },
  apis: ["./src/route/*.js"], 
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };
