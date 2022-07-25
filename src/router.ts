import { Request, Response, Router } from "express";

const router: Router = Router();

router.get("/status", (req: Request, res: Response) => {
    res.json({
        status: "On-line"
    });
})

export { router };

