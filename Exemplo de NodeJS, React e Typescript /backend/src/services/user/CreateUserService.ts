import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface UserRequest{
    name: string;
    email: string;
    password: string;
}


class CreateUserService{
    async execute({name,email,password}: UserRequest){

        //verificar se enviou o email
        if(!email){
            throw new Error("Email incorreto.")
        }

        //verificar se o email já está cadastrado na plataforma
        const userAlreadyExist = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        if(userAlreadyExist){
            throw new Error("Usuário já existe.")
        }

        //Criptografando a senha
        const passwordHash = await hash(password, 8)

        //Cadastrando o usuário.
        const user = await prismaClient.user.create({
            data:{
                name: name,
                email: email, 
                password: passwordHash,
            },
            select:{
                id: true,
                name: true,
                email: true,
            }
        })
        return user;
    }
}

export { CreateUserService }