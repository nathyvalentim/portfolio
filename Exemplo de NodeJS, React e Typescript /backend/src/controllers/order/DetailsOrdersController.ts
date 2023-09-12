import { Request, Response } from "express";
import { DetailsOrdersService} from "../../services/order/DetailsOrdersService";

class DetailsOrdersController{
    async handle(req: Request, res: Response){
        //get com parametros: req.query
        //req.query contém os parâmetros de consulta da solicitação.
        const order_id = req.query.order_id as string;

        const detailsOrdersService = new DetailsOrdersService();

        const orders = await detailsOrdersService.execute({
            order_id
        })
        return res.json(orders)
    }

}

export {DetailsOrdersController}