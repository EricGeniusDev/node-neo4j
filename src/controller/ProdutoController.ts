import { Request, Response } from "express";
import { ProdutoRepository } from "../repository/ProdutoRepository";

const produtoRepository = new ProdutoRepository()

export class ProdutoController {

    async find(req: Request, res: Response) {
        const response = await produtoRepository.findAll()
        return res.json(response);
    }

    async findById(req: Request, res: Response) {
        const { id } = req.params
        const response = await produtoRepository.findById(id);
        return res.json(response);
    }

    async create(req: Request, res: Response) {
        await produtoRepository.save(req.body)
        res.status(201).json({
            status: "created"
        })
    }

    async update(req: Request, res: Response) {
        const { id } = req.params
        await produtoRepository.update(id, req.body)
        res.status(204).end()
    }

    async remove(req: Request, res: Response) {
        const { id } = req.params
        await produtoRepository.delete(id)
        res.status(200).end()
    }
}