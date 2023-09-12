import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies} from 'nookies';

//Função para páginas que podem ser acessadas por visitantes/nao logados
export function canSSRGuest<P>(fn: GetServerSideProps<P>){
    return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>>=>{

        const cookies = parseCookies(context);

        //Se estiver logado, redirecionar para o Dashboard
        if(cookies['@atendimento.token']){
            return{
                redirect:{
                    destination: '/dashboard',
                    permanent: false,
                }
            }

        }


        return await fn(context);

    }

}