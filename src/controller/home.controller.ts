import { Request, Response } from "express";
import cr from "../util/cr.util";

export const getHome = (req: Request, res: Response) =>
  res.json(cr.load("ok", { project: "HMS", deadline: "Two weeks" }));
