import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import { errorResponseMessage } from "../../../types/response/error.response";

/**
 * Validate that a resource being POSTed or PUT
 * has a valid shape, else return 400 Bad Request
 * @param {*} resourceSchema is a joi schema
 */
const RequestValidator =
  (resourceSchema: ObjectSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    // throws an error if not valid
    try {
      const value = await resourceSchema.validateAsync(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });
      req.body.validatedData = value;
      next();
    } catch (error: any) {
      const response: errorResponseMessage = {
        status: false,
        message: `Error: ${error.details
          .map((x: any) => x.message)
          .join(", ")}`,
      };
      res.status(400).json(response);
    }
  };

export default RequestValidator;
