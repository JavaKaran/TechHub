import { Request, Response } from "../types/express";

const fetchPaypalClientId = (_req: Request, res: Response) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
};

export { fetchPaypalClientId };