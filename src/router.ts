import { Request, Response, Router } from "express";
import { ClienteController } from "./controller/ClienteController";
import { ComercioController } from "./controller/ComercioController";
import { ProdutoController } from "./controller/ProdutoController";


const router: Router = Router();
const cliente = new ClienteController()
const produto = new ProdutoController()
const comercio = new ComercioController()

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

router.get("/produto", produto.find)
router.get("/produto/:id", produto.findById)
router.post("/produto", produto.create)
router.put("/produto/:id", produto.update)
router.delete("/produto/:id", produto.remove)

router.post("/comprar", comercio.comprar)
router.post("/vender", comercio.vender)

export { router };

