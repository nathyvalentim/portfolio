import { Request, Response } from "express";
import { ListAllService } from "../../services/search/ListAllService";

class ListAllController{
    async handle(req: Request, res: Response){
        
        const listAllService = new ListAllService();
        
        const launches = await listAllService.execute();
        
        return res.json(launches);

    }
}

export {ListAllController}