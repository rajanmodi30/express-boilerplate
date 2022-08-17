import { Request, Response, NextFunction } from "express";
import { AnyObjectSchema } from "yup";

/**
 * Validate that a resource being POSTed or PUT
 * has a valid shape, else return 400 Bad Request
 * @param {*} resourceSchema is a yup schema
 */
const RequestValidator =
  (resourceSchema: AnyObjectSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    // throws an error if not valid
    try {
      const value = await resourceSchema.validateSync(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });
      req.body.validatedData = value;
      next();
    } catch (error: any) {
      const response = {
        status: false,
        message: `Errors: ${error.errors}`,
      };
      res.status(400).json(response);
    }
  };

export default RequestValidator;
