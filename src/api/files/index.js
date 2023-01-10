import express from "express";
import multer from "multer";
import { extname } from "path";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { getProduct, writeProduct, saveImages } from "../../lib/fs-tools.js";

const cloudinaryUploader = multer({
  storage: new CloudinaryStorage({
    cloudinary, // this searches in your process.env for something called CLOUDINARY_URL which contains your cloudinary api key and secret
    params: {
      folder: "phone/products",
    },
  }),
}).single("image");

const filesRouter = express.Router();

filesRouter.post(
  "/:id/upload",
  multer().single("image"),
  cloudinaryUploader,
  async (req, res, next) => {
    try {
      // const originalFileExtension = extname(req.file.originalname);
      // const fileName = req.params.productId + originalFileExtension;
      // console.log("this is filename", fileName);
      // await saveImages(fileName, req.file.buffer);
      // //   url to use for the mew image
      // const url = `http://localhost:3001/img/product/${fileName}`;
      console.log(req.file);
      const url = req.file.path;
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
