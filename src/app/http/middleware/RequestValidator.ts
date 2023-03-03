import { Request, Response, NextFunction } from "express";
import { unlinkSync } from "fs";
import { AnyZodObject, object, string, ZodEffects, ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { logger } from "../../providers/logger";

/**
 * Validate that a resource being POSTed or PUT
 * has a valid shape, else return 400 Bad Request
 * @param {*} resourceSchema is a yup schema
 */
export const RequestValidator =
  (resourceSchema: ZodEffects<AnyZodObject> | AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const value = await resourceSchema.parseAsync(req.body);
      req.body.validatedData = value;
      next();
    } catch (error: any) {
      if (req.file) {
        unlinkSync(req.file.path);
      }
      const response = {
        status: false,
        message: errorCleaner(error),
      };
      res.status(400).json(response);
    }
  };

/**
 *
 * Validate that a query string and throw error if it is not valid
 * @param resourceSchema
 * @returns
 */
export const RequestQueryValidator =
  (resourceSchema: ZodEffects<AnyZodObject> | AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    // throws an error if not valid
    try {
      const value = await resourceSchema.parseAsync(req.query);
      req.body.validatedQueryData = value;
      next();
    } catch (error: any) {
      const response = {
        status: false,
        message: errorCleaner(error),
      };
      res.status(400).json(response);
    }
  };

/**
 * Validates query params for sort
 * @param names
 * @returns
 */
export const RequestSortValidator =
  (names: any[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const resourceSchema = object({
        sortBy: string()
          .refine((value) => names.includes(value), "")
          .optional(),
        sortType: string()
          .refine((value) => ["asc", "desc"].includes(value), "")
          .optional(),
      });

      const value = await resourceSchema.parseAsync(req.query);

      if (value.sortType === undefined) {
        value.sortType = "asc";
      }

      req.body.validatedSortData = value;
      next();
    } catch (error: any) {
      const response = {
        status: false,
        message: errorCleaner(error),
      };
      res.status(400).json(response);
    }
  };

const errorCleaner = (errors: any) => {
  logger.error(`zod error in schema ${JSON.stringify(errors.issues)}`);
  let message;
  if (errors instanceof ZodError) {
    message = fromZodError(errors).message;
    // message = errors.errors.map((error) => error.).toString();
  } else {
    message = errors?.message || "OOPS something went wrong";
  }

  console.log("message", JSON.stringify(message));
  return message;
};
