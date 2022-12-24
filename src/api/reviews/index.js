import express from "express";
import { getReviews, writeReviews } from "../../lib/fs-tools.js";
import {
  checkCommentSchema,
  triggerCommentBadRequest,
} from "../reviews/validator.js";

const reviewRouter = express.Router();

reviewRouter.post(
  "/:productId/reviews",
  checkCommentSchema,
  triggerCommentBadRequest,
  async (req, res, next) => {
    try {
      const newReviews = {
        ...req.body,
        _id: uniqid(),
        createdAt: new Date(),
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
  }
);

reviewRouter.get("/:productId/reviews", async (req, res) => {
  try {
    const arrayOfReviews = await getReviews();
    res.send(arrayOfReviews);
  } catch (error) {}
});

reviewRouter.get("/:productId/reviews/:reviewId", async (req, res, next) => {
  try {
    const arrayOfReviews = await getReviews();
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

reviewRouter.put("/:productId/reviews/:reviewId", async (req, res) => {
  try {
    const arrayOfReviews = await getReviews();
    const index = arrayOfReviews.findIndex(
      (reviews) => reviews._id === req.params.reviewId
    );
    if (index !== -1) {
      const oldReviewDetails = arrayOfReviews[index];
      const arrayOfReviews = { ...oldReviewDetails, updatedAt: new Date() };
      arrayOfReviews[index] = arrayOfReviews;
      res.send(arrayOfReviews);
    } else {
      next(error);
    }
  } catch (error) {}
});

reviewRouter.delete("/productId/reviews/:reviewId", async (req, res) => {
  try {
    const arrayOfReviews = await getReviews();

    const remainingReviews = arrayOfReviews.filter(
      (product) => review._id !== req.params.reviewId
    );

    if (arrayOfReviews.length !== remainingReviews.length) {
      await writeReviews(remainingReviews);
      res.status(204).send();
    } else {
      next(NotFound(`no reviews with id ${req.params.productId} not found!`));
    }
  } catch (error) {
    next(error);
  }
});

export default reviewRouter;
