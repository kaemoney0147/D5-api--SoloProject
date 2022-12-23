import { checkSchema, validationResult } from "express-validator";
import createHttpError from "http-errors";

const bookSchema = {
  comment: {
    in: ["body"],
    require: {
      errorMessage: "Required",
    },
  },
  rate: {
    in: ["body"],
    require: {
      errorMessage: "Required",
    },
  },
  category: {
    in: ["body"],
    require: {
      errorMessage: "Required",
    },
  },
  description: {
    in: ["body"],
    require: {
      errorMessage: "Required",
    },
  },
  name: {
    in: ["body"],
    require: {
      errorMessage: "Required",
    },
  },
  brand: {
    in: ["body"],
    require: {
      errorMessage: "Required",
    },
  },
};

export const checkProduct = checkSchema(bookSchema);

export const triggerBadRequest = (req, res, next) => {
  const errors = validationResult(req);

  console.log(errors.array());

  if (!errors.isEmpty()) {
    next(
      createHttpError(400, "Errors during prouct validation", {
        errorsList: errors.array(),
      })
    );
  } else {
    next();
  }
};
