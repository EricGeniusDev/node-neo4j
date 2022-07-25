import { Request, Response } from "express";
import { ComercioRepository } from "../repository/ComercioRepository";

const comercioRepository = new ComercioRepository()

export class ComercioController {

    async comprar(req: Request, res: Response) {
        const response = await comercioRepository.savePurchase(req.body)
        res.status(201).end()
    }

    async vender(req: Request, res: Response) {
        const response = await comercioRepository.saveSale(req.body);
        res.status(201).end()
    }
}