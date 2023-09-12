import prismaClient from "../../prisma";

//quero listar todos os pedidos fechados, entao nao passo parametros (sem interface)
class ListOrderService{
    async execute(){
        const orders = await prismaClient.order.findMany({
            where:{
                draft: false,
                status: false,
            },
            orderBy:{
                created_at: 'desc'
            }
        })
        return orders;
    }

}

export {ListOrderService}