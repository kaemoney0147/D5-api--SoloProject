import express from "express";
import multer from "multer";
import { extname } from "path";
import { getProduct, writeProduct, saveImages } from "../../lib/fs-tools.js";

const filesRouter = express.Router();

filesRouter.post(
  "/:id/upload",
  multer().single("image"),
  async (req, res, next) => {
    try {
      const originalFileExtension = extname(req.file.originalname);
      const fileName = req.params.productId + originalFileExtension;
      console.log("this is filename", fileName);
      await saveImages(fileName, req.file.buffer);
      //   url to use for the mew image
      const url = `http://localhost:3001/img/product/${fileName}`;

      const products = await getProduct();
      const index = products.findIndex(
        (product) => product._id === req.params.id
      );
      //   updating the blog cover
      if (index !== -1) {
        const oldProduct = products[index];
        // const coverUpdate = { ...oldBlog, cover: url }
        const updateProduct = {
          ...oldProduct,
          imageUrl: url,
          updatedAt: new Date(),
        };
        products[index] = updateProduct;
        await writeProduct(products);
      }
      res.send("Cover image updated");
    } catch (error) {
      next(error);
    }
  }
);

export default filesRouter;
