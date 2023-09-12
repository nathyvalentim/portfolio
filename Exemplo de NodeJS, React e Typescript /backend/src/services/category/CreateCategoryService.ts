import prismaClient from "../../prisma";

//Quando alguem cadastrar a categoria, recebe o nome dessa categoria
interface CategoryRequest{
    name: string;
}

class CreateCategoryService{
    async execute({name}: CategoryRequest){
        if (name === ''){
            throw new Error("Nome inválido.")
        }
        const category = prismaClient.category.create({
            data:{
                name: name,
            },
            select:{
                id: true,
                name: true
            }
        })
        return category;
    }
}

export {CreateCategoryService};