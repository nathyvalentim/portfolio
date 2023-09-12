import { Request, Response } from "express";
import { AddItemService } from "../../services/order/AddItemService";

class AddItemController{
    async handle(req: Request, res:Response){

        //preciso receber dentro do corpo da requisicao quais sao os itens (estao la no service)
        //post: req.body
        const { order_id, product_id, amount } = req.body;

        const addItemService = new AddItemService();
        const order = await addItemService.execute({
            order_id,
            product_id,
            amount,
        });
        return res.json(order)
    }


}

export {AddItemController}