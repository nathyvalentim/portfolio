import { canSSRAuth } from "../../utils/canSSRAuth"
import Head from "next/head"
import { Header }  from "../../components/Header"
import styles from "./styles.module.scss";
import { FiRefreshCcw } from "react-icons/fi";
import { setupAPIClient } from "../../services/api";
import { useState } from "react";
import Modal from 'react-modal';
import { ModalOrder } from "../../components/ModalOrder";


type OrdemProps = {
    id: string;
    table: string | number;
    status: boolean;
    draft: boolean;
    name: string | null;
}
interface HomeProps{
    orders: OrdemProps[];
}

export type OrderItemProps = {
    id: string;
	amount: number;
    order_id: string;
    product_id: string;
    products:{
        id: string;
        name: string;
        description: string;
        price: string;
        banner: string;
    }
    orders:{
        id: string;
        table: string | number;
        status: string;
        name: string | null;
        }
}


export default function Dashboard({orders}: HomeProps) {

    const [orderList, setOrderList] = useState(orders || [])
    const [modalItem, setModalItem] = useState<OrderItemProps[]>();
    const [modalVisible, setModalVisible] = useState(false);

    //Fechar o Modal
    function closeModal(){
        setModalVisible(false);
    }




    //Mostrar os detalhes doe um atendimento no Modal
    async function handleModal(id: string){
        const apiClient = new setupAPIClient();
        const response = await apiClient.get('/order/detail', {
            param:{
                order_id: id
            }
        })
        setModalItem(response.data);
        setModalVisible(true);
    }




    //Concluir o atendimento na tela, atualizando os dados do dashboard:
    async function handleFinishItem(id: string){
        const apiClient = setupAPIClient();
        await apiClient.put('/order/finish', {
            order_id: id,
        })
        const response = await apiClient.get('/orders');
        setOrderList(response.data);
        setModalVisible(false);
    }

    //Refresh no Dashboard
    async function handleRefreshOrders(){
        const apiClient = setupAPIClient();
        const response = await apiClient.get('/orders')
        setOrderList(response.data);

    }

    //Vindo do react-modal
    Modal.setAppElement('#__next')

    return (
        <>
        <Head>
            <title>Atendimento</title>
        </Head>

        <div>
            <Header/>
            <main className={styles.container}>
                <div className={styles.containerHeader}>
                    <h1> Atendimentos </h1>
                    <button onClick={handleRefreshOrders} className={styles.button}><FiRefreshCcw size={25} color="red"/></button>
                </div>

                <article className={styles.listOrders}>

                    {orderList.length  === 0 && (
                        <span className={styles.emptyList}>Nenhum atendimento em aberto.</span>
                    )}


                        {orderList.map(item => (
                            <section key={item.id} className={styles.orderItem}>
                                <button onClick={()=> handleModal(item.id)}className={styles.button}>
                                    <div className={styles.tag}></div>
                                    <span>
                                        Pessoa {item.table}
                                    </span>
                                </button>
                            </section>
                    ))}

                </article>
            </main>

            {modalVisible && (
                <ModalOrder
                    isOpen={modalVisible}
                    onRequestClose={closeModal}
                    orders={modalItem}
                    handleFinishOrder={handleFinishItem}/>
            )}
        </div>

        </>

    )
}

export const getServerSideProps = canSSRAuth(async (context) => {
    const apiClient = setupAPIClient(context);
    const response = await apiClient.get('/orders');

    console.log(response.data)
    return {
        props: {
            orders: response.data
        }
    }
})