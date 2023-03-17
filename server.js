const express = require("express");
const swaggerJsdoc = require("swagger-jsdoc");

// const express = require("express");
// const bodyParser = require("body-parser");
// const swaggerJsdoc = require("swagger-jsdoc");
// const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Drinks DB Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Rash",
        url: "https://wa.me/+237670118208",
        email: "orashusedmund@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = specs;