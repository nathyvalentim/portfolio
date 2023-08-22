import prismaClient from "../../prisma";

class ListLaunchesService {
    async execute(skip, take, search) {
        const launches = await prismaClient.launches.findMany({
            where: {   
                OR:[{name: { contains: search } },
                {details: {contains: search}}]                              
                },
            select: {
                id: true,
                name: true,
                details: true

            },
            skip: skip,
            take: take,
        })
        return launches;

    }

    async executeAll(search) {
        const launches = await prismaClient.launches.findMany({
            where: {   
                OR:[{name: { contains: search } },
                {details: {contains: search}}]                              
                },
            select: {
                id: true,
                name: true,
                details: true,
            }
        })
        return launches;

    }
}
 export { ListLaunchesService }