import express from "express";
import uniqid from "uniqid";
import { getReviews, writeReviews } from "../../lib/fs-tools.js";

const reviewRouter = express.Router();

reviewRouter.post("/:productId/reviews", async (req, res, next) => {
  try {
    const newReviews = {
      ...req.body,
      createdAt: new Date(),
      _id: uniqid(),
      productId: req.params.productId,
    };

    const arrayOfReviews = await getReviews();
    console.log("here i am", arrayOfReviews);

    arrayOfReviews.push(newReviews);

    await writeReviews(arrayOfReviews);

    res
      .status(201)
      .send({ _id: newReviews._id, productId: newReviews.productId });
  } catch (error) {
    next(error);
  }
});

reviewRouter.get("/:productId/reviews", async (req, res) => {
  try {
    const arrayOfReviews = await getReviews();
    res.send(arrayOfReviews);
  } catch (error) {}
});

reviewRouter.get("/:productId", async (req, res, next) => {
  try {
    const arrayOfReviews = await getProduct();
    const product = arrayOfReviews.find(
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

reviewRouter.put("/:productId", async (req, res) => {
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

reviewRouter.delete("/productId", async (req, res) => {
  try {
    const products = await getProduct();

    const remainingProduct = products.filter(
      (product) => product._id !== req.params.productId
    );

    if (products.length !== remainingProduct.length) {
      await writeBooks(remainingProduct);
      res.status(204).send();
    } else {
      next(NotFound(`no reviews with id ${req.params.productId} not found!`));
    }
  } catch (error) {
    next(error);
  }
});

export default reviewRouter;
