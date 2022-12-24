import { checkSchema, validationResult } from "express-validator";
const commentSchema = {
  comment: {
    in: ["body"],
    isString: {
      errorMessage: "kindly include the product name!",
    },
  },
  rate: {
    in: ["body"],
    isNumeric: {
      errorMessage: "please rating out of 5!",
    },
  },
};

export const checkCommentSchema = checkSchema(commentSchema);

export const triggerCommentBadRequest = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors.array());

  if (!errors.isEmpty()) {
    next(
      createHttpError(
        400,
        "Error during product validation, please check you have entered data correctly",
        {
          errorsList: errors.array(),
        }
      )
    );
  } else {
    next();
  }
};
