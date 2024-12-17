import { Request, Response } from "express";
import { RegisterValidation } from "../validation/register.validation";
export interface RegisterResponse {
  status: number;
  data: any;
}
export const Register = (req: Request, res: Response) => {
  const body = req.body;

  const { error } = RegisterValidation.validate(body);

  if (error) {
    res.status(400).send(error.details);
    return;
  } // Send the validated data
  res.send(body);
  return;
};
