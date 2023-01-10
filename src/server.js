import express from "express";
import listEndpoints from "express-list-endpoints";
import productRouter from "./api/product/index.js";
import reviewRouter from "./api/reviews/index.js";
import { join } from "path";
import filesRouter from "./api/files/index.js";
import {
  unauthorized,
  badRequest,
  notFound,
  genericError,
} from "./errorHandlers.js";

const server = express();
const publicFolderPath = join(process.cwd(), "./public");
server.use(express.static(publicFolderPath));
const port = process.env.PORT;
server.use(express.json());
const Middleware = (req, res, next) => {
  console.log(
    `Request method ${req.method} -- url ${req.url} -- ${new Date()}`
  );
  next();
};

//endpoints for product and reviews
server.use("/products", Middleware, productRouter);
server.use("/products", Middleware, reviewRouter);
server.use("/products", filesRouter);

//eorrrs handles
server.use(unauthorized);
server.use(badRequest);
server.use(notFound);
server.use(genericError);

server.listen(port, () => {
  console.table(listEndpoints(server));
  console.log("running server is on port", port);
});
