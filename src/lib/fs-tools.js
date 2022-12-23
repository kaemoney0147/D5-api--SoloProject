import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs-extra";

const { readJSON, writeJSON, writeFile } = fs;

const dataFolderpath = join(dirname(fileURLToPath(import.meta.url)), "../data");
const publicFolderPath = join(process.cwd(), "./public/img/product");

const productJsonPath = join(dataFolderpath, "product.json");
const reviewJsonPath = join(dataFolderpath, "reviews.json");

export const getProduct = () => readJSON(productJsonPath);
export const writeProduct = (arrayOfReviews) =>
  writeJSON(productJsonPath, arrayOfReviews);

export const getReviews = () => readJSON(reviewJsonPath);
export const writeReviews = (arrayOfReviews) =>
  writeJSON(reviewJsonPath, arrayOfReviews);

export const saveImages = (fileName, contentAsABuffer) =>
  writeFile(join(publicFolderPath, fileName), contentAsABuffer);
