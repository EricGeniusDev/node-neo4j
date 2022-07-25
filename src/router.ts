import { Request, Response, Router } from "express";
import { ClienteController } from "./controller/ClienteController";


const router: Router = Router();
const cliente = new ClienteController()

router.get("/status", (req: Request, res: Response) => {
    res.json({
        status: "On-line"
    });
})
router.get("/cliente", cliente.find)
router.get("/cliente/:id", cliente.findById)
router.post("/cliente", cliente.create)
router.put("/cliente/:id", cliente.update)
router.delete("/cliente/:id", cliente.remove)


export { router };

