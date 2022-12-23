import express from "express";
import uniqid from "uniqid";
import { getProduct, writeProduct } from "../../lib/fs-tools.js";
import { checkProduct, triggerBadRequest } from "./validator.js";

const productRouter = express.Router();

productRouter.post(
  "/",
  checkProduct,
  triggerBadRequest,
  async (req, res, next) => {
    try {
      const newproduct = {
        ...req.body,
        createdAt: new Date(),
        _id: uniqid(),
      };

      const arrayOfProduct = await getProduct();

      arrayOfProduct.push(newproduct);

      await writeProduct(arrayOfProduct);

      res.status(201).send({ _id: newproduct._id });
    } catch (error) {
      next(error);
    }
  }
);

productRouter.get("/", async (req, res) => {
  try {
    const arrayOfProduct = await getProduct();
    if (req.query && req.query.brand) {
      const filtedProduct = arrayOfProduct.filter(
        (product) => product.brand === req.query.brand
      );
      res.send(filtedProduct);
    } else {
      res.send(arrayOfProduct);
    }
  } catch (error) {}
});

productRouter.get("/:productId", async (req, res, next) => {
  try {
    const arrayOfProduct = await getProduct();
    const product = arrayOfProduct.find(
      (product) => product._id === req.params.productId
    );
    if (product) {
      res.send(product);
    } else {
      next(error);
    }
  } catch (error) {
    next(error);
  }
});

productRouter.put("/:productId", async (req, res) => {
  try {
    const products = await getProduct();
    const index = products.findIndex(
      (product) => product._id === req.params.productId
    );
    if (index !== -1) {
      const oldProduct = products[index];
      const updateProduct = { ...oldProduct, updatedAt: new Date() };
      proudct[index] = updateProduct;
      res.send(updateProduct);
    } else {
      next(error);
    }
  } catch (error) {}
});

productRouter.delete("/:productId", async (req, res) => {
  try {
    const products = await getProduct();

    const remainingProduct = products.filter(
      (product) => product._id !== req.params.productId
    );

    if (products.length !== remainingProduct.length) {
      await writeBooks(remainingProduct);
      res.status(204).send();
    } else {
      next(NotFound(`Book with id ${req.params.productId} not found!`));
    }
  } catch (error) {
    next(error);
  }
});

export default productRouter;
