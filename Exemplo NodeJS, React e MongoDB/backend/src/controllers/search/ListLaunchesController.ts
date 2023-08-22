import { Request, Response } from "express";
import { ListLaunchesService } from "../../services/search/ListLaunchesService";


class ListLaunchesController{
    async handle(req: Request, res: Response){


        let page = req.query.page && Number(req.query.page) > 0 ? Number(req.query.page) : 1;
        let limit = req.query.limit && Number(req.query.limit) > 0 ? Number(req.query.limit) : 10;
        let skip = limit * (page - 1);  
        let search = req.query.search? req.query.search : '';
        
        const listCategoryService = new ListLaunchesService();
        
        const launches = await listCategoryService.execute(skip,limit,search);

        const launchesAll = await listCategoryService.executeAll(search);

        const totalWithPage = page * limit;

        let result = {results: launches, 
            totalDocs: launchesAll.length,
            page: page,
            totalPages: launchesAll.length == 0 ? 0 : (launchesAll.length <= limit ? 1 : Math.ceil(launchesAll.length / limit)), 
            hasNext: launchesAll.length == 0 ? false : (totalWithPage >= launchesAll.length ? false : true),
            hasPrev: launchesAll.length == 0 ? false : (page > 1 ? true : false),
        }
        
        return res.json(result);

    }
}

export {ListLaunchesController}