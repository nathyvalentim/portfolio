import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import path from 'path';
import { router } from './routes';

const app = express();
app.use(express.json());

//Liberando para qualquer IP
app.use(cors());

//informando que as rotas da aplicacao estao em 'router'
app.use(router);

//Acessar e expor a foto do produto
app.use(
    '/files',
    express.static(path.resolve(__dirname, '..', 'tmp'))
)

app.use((err: Error, req: Request, res: Response, next: NextFunction)=>{
    if(err instanceof Error){
        //Se for uma instancia do tipo error
        return res.status(400).json({
            error: err.message
        })
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error'
    })
})


app.listen(3333, 
            () => console.log("Servidor Online.")
            )