import prismaClient from "../../prisma";

class ListRocketsService {
    async execute(id) {
        const rockets = await prismaClient.rockets.findMany({
            where: {
                id: id
            },
            select: {
                id: true,
                name: true,

            }
        })
        return rockets;

    }

}
export { ListRocketsService }