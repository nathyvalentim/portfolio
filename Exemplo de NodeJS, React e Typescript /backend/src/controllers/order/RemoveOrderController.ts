import { Request, Response } from "express";
import { RemoveOrderService } from "../../services/order/RemoveOrderService";

class RemoveOrderController{
    async handle(req: Request, res: Response){

        //delete com parametro: req.query
        //req.query contém os parâmetros de consulta da solicitação.
        const order_id = req.query.order_id as string; 

        const removeOrderService = new RemoveOrderService();

        const order = await removeOrderService.execute({
            order_id
        })

        return res.json(order);

    }
}

export {RemoveOrderController}