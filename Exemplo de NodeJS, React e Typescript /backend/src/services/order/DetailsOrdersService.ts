import prismaClient from "../../prisma";

interface DetailRequest{
    order_id: string;
}

class DetailsOrdersService{
    async execute({order_id}: DetailRequest){

        const orders = await prismaClient.item.findMany({
            where:{
                order_id: order_id
            },
            include:{
                products: true,
                orders: true
            }
        })
        return orders;
    }
}

export {DetailsOrdersService}