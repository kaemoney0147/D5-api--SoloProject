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
import cors from "cors";

const server = express();
const urlList = [process.env.FE_DEV_URL, process.env.FE_PROD_URL];

const corsOpts = {
  origin: (origin, corsNext) => {
    console.log("CURRENT ORIGIN: ", origin);
    if (!origin || urlList.indexOf(origin) !== -1) {
      // If current origin is in the whitelist you can move on
      corsNext(null, true);
    } else {
      // If it is not --> error
      corsNext(
        createHttpError(400, `Origin ${origin} is not in the whitelist!`)
      );
    }
  },
};

const publicFolderPath = join(process.cwd(), "./public");
server.use(express.static(publicFolderPath));
server.use(cors(corsOpts));

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
