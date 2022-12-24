import { checkSchema, validationResult } from "express-validator";
const productSchema = {
  name: {
    in: ["body"],
    isString: {
      errorMessage: "please include the product name",
    },
  },
  description: {
    in: ["body"],
    isString: {
      errorMessage: "please include the product description",
    },
  },
  brand: {
    in: ["body"],
    isString: {
      errorMessage: "please include the product brand",
    },
  },
  price: {
    in: ["body"],
    errorMessage: "price must be between 1 and 100,000",
    isLength: { options: { min: 1, max: 1000000 } },
  },
};

export const checkProductSchema = checkSchema(productSchema);

export const triggerProductBadRequest = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors.array());

  if (!errors.isEmpty()) {
    next(
      BadRequest("Errors during product validation", {
        errorsList: errors.array(),
      })
    );
  } else {
    next();
  }
};
