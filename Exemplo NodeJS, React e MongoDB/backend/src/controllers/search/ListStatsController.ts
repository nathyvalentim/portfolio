import { Request, Response } from "express";
import { ListStatsService } from "../../services/search/ListStatsService";
import { ListRocketsService } from "../../services/search/ListRocketsService";

class ListStatsController {
    async handle(req: Request, res: Response) {

        const listStatsService = new ListStatsService();
        const listRocketsService = new ListRocketsService();

        const launchesTrue = await listStatsService.execute(true);

        const launchesFalse = await listStatsService.execute(false);

        const groupName = await listStatsService.executeGroupBy();

        const cores = await listStatsService.executeReused();

        const years = await listStatsService.executeGroupByYear();

        for (let i = 0; i < groupName.length; i++) {
            let value = groupName[i];
            let name = await listRocketsService.execute(value.rocket);
            value.rocket = name[0].name;
            groupName[i] = value;
        }

        let coresReused = 0;
        let coresNotReused = 0;

        for (let i = 0; i < cores.length; i++) {
            let value = cores[i];
            let coresArray = value['cores'];

            for (let j = 0; j < coresArray.length; j++) {
                let core = coresArray[j];
                if (core['reused']) {
                    coresReused++;
                }
                else {
                    coresNotReused++;
                }
            }
        }


        let result = {
            totalSuccess: launchesTrue.length,
            totalFailed: launchesFalse.length,
            groupRockets: groupName,
            coresReused: coresReused,
            coresNotReused: coresNotReused,
            years: years
        }

        return res.json(result);

    }
}

export { ListStatsController }