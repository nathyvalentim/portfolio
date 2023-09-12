import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies, destroyCookie} from 'nookies';
import { AuthTokenError } from "../services/errors/AuthTokenError";

//Função para páginas que podem ser acessadas por usuários cadastrados/logados

export function canSSRAuth<P>(fn: GetServerSideProps<P>){
    return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> =>{

        const cookies = parseCookies(context);
        const token = cookies['@atendimento.token']

        if(!token){
            return {
                redirect:{
                    destination: '/',
                    permanent: false,
                }
            }
        }

        try{
            return await fn(context);
            //quando ocorre algum erro, destroi o cookie salvo
        }catch(err){
            if(err instanceof AuthTokenError){
                destroyCookie(context, '@atendimento.token');

                return{
                    redirect:{
                        destination: '/',
                        permanent: false,
                    }
                }
            }
        }

    }

}