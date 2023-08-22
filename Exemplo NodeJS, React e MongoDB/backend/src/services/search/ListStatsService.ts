import prismaClient from "../../prisma";


class ListStatsService{
    async execute(success){

        const stats = await prismaClient.launches.findMany({
            where:{
                success: success
            },
            select:{
                id: true,
                success: true,
                rocket: true,
            }
        
        })

        return stats;

    }


    async executeGroupBy() {

        const stats = await prismaClient.launches.groupBy({
            by: ['rocket'],
            _count: {
                rocket: !null,
            }
        })

        return stats;

    }

    async executeGroupByYear() {

        let results = new Map();

        const stats = await prismaClient.launches.findMany({

            select:{
                id: true,
                success: true,
                rocket: true,
                date_utc: true
            }
        
        });

        for(let i=0;i<stats.length;i++){
            let value = stats[i];
            
            if(!value.date_utc)
                continue;

            let year = value.date_utc.substring(0,4);

            if(results.has(year)){
                results.set(year, results.get(year) + 1)
            }
            else{
                results.set(year, 1);
            }
        }

        let resutsArray = [];

        results.forEach((value, key) => {
            resutsArray.push({year: key, sum: value})
          });

        return resutsArray;

    }

    async executeReused(){

        const stats = await prismaClient.launches.findMany({
            
            select:{
                cores: true
            }
        
        })

        return stats;

    }
}
 export { ListStatsService }