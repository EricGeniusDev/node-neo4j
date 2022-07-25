import { Request, Response } from "express";
import { ClientRepository } from "../repository/ClienteRepository";

const clienteRepository = new ClientRepository()

export class ClienteController {

    async find(req: Request, res: Response) {
        const response = await clienteRepository.findAll()
        return res.json(response);
    }

    async findById(req: Request, res: Response) {
        const { id } = req.params
        const response = await clienteRepository.findById(id);
        return res.json(response);
    }

    async create(req: Request, res: Response) {
        await clienteRepository.save(req.body)
        res.status(201).json({
            status: "created"
        })
    }

    async update(req: Request, res: Response) {
        const { id } = req.params
        await clienteRepository.update(id, req.body)
        res.status(204).end()
    }

    async remove(req: Request, res: Response) {
        const { id } = req.params
        await clienteRepository.delete(id)
        res.status(200).end()
    }
}