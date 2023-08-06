import {Response, Request } from "express";
import { PizzariaUsers } from "../models/pizzaria";

export const home = async (req: Request, res: Response) => {
    res.status(200).send("Welcome to Pizzaria")
}